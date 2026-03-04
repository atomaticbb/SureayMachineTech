import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.admin_token as string | undefined;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ success: false, message: 'JWT_SECRET not configured' });
  }

  try {
    jwt.verify(token, secret);
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired session' });
  }
}
