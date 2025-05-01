import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/test', (_: Request, res: Response) => res.json({
  msg: 'posts'
}));

export default router;