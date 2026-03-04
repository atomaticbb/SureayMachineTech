import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

const router = Router();

// 登录暴力破解防护：15 分钟内最多 10 次尝试
const loginLimiter = rateLimit({
  windowMs:        15 * 60 * 1000,
  max:             10,
  standardHeaders: true,
  legacyHeaders:   false,
  message:         { success: false, message: '尝试次数过多，请 15 分钟后重试' },
});

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 8 * 60 * 60 * 1000, // 8 hours
  path: '/',
};

// POST /api/auth/login
router.post('/login', loginLimiter, async (req: Request, res: Response) => {
  const { username, password } = req.body as { username?: string; password?: string };

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password required' });
  }

  const adminUsername    = process.env.ADMIN_USERNAME;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  const jwtSecret        = process.env.JWT_SECRET;

  if (!adminUsername || !adminPasswordHash || !jwtSecret) {
    console.error('Admin auth env vars not configured (ADMIN_USERNAME / ADMIN_PASSWORD_HASH / JWT_SECRET)');
    return res.status(503).json({ success: false, message: 'Admin auth not configured on server' });
  }

  if (username !== adminUsername) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const passwordMatch = await bcrypt.compare(password, adminPasswordHash);
  if (!passwordMatch) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, jwtSecret, { expiresIn: '8h' });
  res.cookie('admin_token', token, COOKIE_OPTIONS);

  return res.json({ success: true });
});

// POST /api/auth/logout
router.post('/logout', (_req: Request, res: Response) => {
  res.clearCookie('admin_token', { path: '/' });
  return res.json({ success: true });
});

// GET /api/auth/me — used by ProtectedRoute to check session validity
router.get('/me', (req: Request, res: Response) => {
  const token  = req.cookies?.admin_token as string | undefined;
  const secret = process.env.JWT_SECRET;

  if (!token || !secret) {
    return res.json({ authenticated: false });
  }

  try {
    jwt.verify(token, secret);
    return res.json({ authenticated: true });
  } catch {
    return res.json({ authenticated: false });
  }
});

export default router;
