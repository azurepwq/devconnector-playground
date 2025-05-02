import express, { Request, Response } from 'express';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import Users from '../../models/Users';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../../swagger';

const router = express.Router();
// Load User Model
const User = Users;

/**
 * @route   GET api/users/test
 * @desc    Tests users route
 * @access  Public
 */
router.get('/test', (req: Request, res: Response) => res.json({
  msg: 'users'
}));

/**
 * @openapi
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Email already exists
 *       500:
 *         description: Server error
 */
router.post('/register', async (req, res) => {
  try {
    const emailExistsMessage = 'Email already exists.';
    const data = await User.findOne({ email: req.body.email });
    if (data) {
      return res.status(400).json({ email: emailExistsMessage });
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar: gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash((newUser.password ?? ''), salt as string | number, async (err, hash) => {
        if (err || !hash) throw err || new Error('Hashing failed');
        newUser.password = hash;
        try {
          await newUser.save();
          res.status(201).json(newUser);
        } catch (err: any) {
          console.error(err.message);
          res.status(500).send('Server Error');
        }
      });
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ... your other routes and middleware

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  console.log('Swagger docs at http://localhost:3000/api-docs');
});

export default router;