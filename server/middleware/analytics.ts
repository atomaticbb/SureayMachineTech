import { Request, Response, NextFunction } from 'express';
import { prisma } from '../db/client.js';
import crypto from 'crypto';

// 生成或获取会话ID（从cookie或创建新的）
function getSessionId(req: Request, res: Response): string {
  let sessionId = req.cookies?.sessionId;

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    res.cookie('sessionId', sessionId, {
      maxAge: 30 * 60 * 1000, // 30分钟
      httpOnly: true,
      sameSite: 'lax',
    });
  }

  return sessionId;
}

// 分析追踪中间件
export const analyticsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 只追踪GET请求和非API路径
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      const ipAddress = (req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string;
      const userAgent = req.headers['user-agent'] || '';
      const referrer = req.headers['referer'] || req.headers['referrer'] || '';
      const sessionId = getSessionId(req, res);

      // 异步记录，不阻塞响应
      prisma.analytics.create({
        data: {
          eventType: 'page_view',
          page: req.path,
          referrer: referrer || null,
          ipAddress: ipAddress || null,
          userAgent: userAgent || null,
          sessionId,
          metadata: JSON.stringify({
            query: req.query,
            host: req.hostname,
          }),
        },
      }).catch(error => {
        console.error('Failed to log analytics:', error);
      });
    }

    next();
  } catch (error) {
    console.error('Analytics middleware error:', error);
    next(); // 即使失败也继续处理请求
  }
};

// 追踪特定事件的辅助函数
export const trackEvent = async (data: {
  eventType: string;
  page?: string;
  productId?: string;
  sessionId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}) => {
  try {
    await prisma.analytics.create({
      data: {
        eventType: data.eventType,
        page: data.page || null,
        productId: data.productId || null,
        sessionId: data.sessionId || null,
        ipAddress: data.ipAddress || null,
        userAgent: data.userAgent || null,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
      },
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};
