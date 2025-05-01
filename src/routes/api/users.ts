import express, { Request, Response } from 'express';
const router = express.Router();

// Load User Model
const User = 


// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req: Request, res: Response) => res.json({
  msg: 'users'
}));

router.post('/register', (req, res) => {
  User
})

export default router;