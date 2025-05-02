import express, { Request, Response } from 'express';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import Users from '../../models/Users';

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
 * @route   POST api/users/register
 * @desc    Register user
 * @access  Public
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
      bcrypt.hash(newUser.password, salt, async (err, hash: string) => {
        if (err) throw err;
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

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

export default router;