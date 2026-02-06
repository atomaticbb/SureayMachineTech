import { Request, Response, NextFunction } from 'express';
import { prisma } from '../db/client.js';

// 获取所有联系人提交记录
export const getContacts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = '1', limit = '20', status, search } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // 构建查询条件
    const where: any = {};

    if (status && status !== 'all') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string } },
        { email: { contains: search as string } },
        { company: { contains: search as string } },
        { message: { contains: search as string } },
      ];
    }

    // 获取总数和记录
    const [total, contacts] = await Promise.all([
      prisma.contact.count({ where }),
      prisma.contact.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
      }),
    ]);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    console.error('Error in getContacts:', error);
    next(error);
  }
};

// 更新联系人状态
export const updateContactStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'replied', 'closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
      });
    }

    const contact = await prisma.contact.update({
      where: { id },
      data: { status },
    });

    res.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error('Error in updateContactStatus:', error);
    next(error);
  }
};

// 获取访问记录统计
export const getAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { startDate, endDate, eventType, page = '1', limit = '50' } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // 构建查询条件
    const where: any = {};

    if (eventType && eventType !== 'all') {
      where.eventType = eventType;
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate as string);
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate as string);
      }
    }

    // 获取总数和记录
    const [total, analytics] = await Promise.all([
      prisma.analytics.count({ where }),
      prisma.analytics.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
      }),
    ]);

    res.json({
      success: true,
      data: {
        analytics,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    console.error('Error in getAnalytics:', error);
    next(error);
  }
};

// 获取统计概览
export const getStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { days = '7' } = req.query;
    const daysNum = parseInt(days as string);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysNum);

    // 并行查询多个统计数据
    const [
      totalContacts,
      pendingContacts,
      totalPageViews,
      uniqueVisitors,
      popularPages,
    ] = await Promise.all([
      // 总联系人数
      prisma.contact.count(),

      // 待处理联系人数
      prisma.contact.count({
        where: { status: 'pending' },
      }),

      // 总页面浏览量（指定时间段）
      prisma.analytics.count({
        where: {
          eventType: 'page_view',
          createdAt: { gte: startDate },
        },
      }),

      // 独立访客数（基于sessionId）
      prisma.analytics.groupBy({
        by: ['sessionId'],
        where: {
          eventType: 'page_view',
          createdAt: { gte: startDate },
        },
      }).then(results => results.length),

      // 最受欢迎的页面
      prisma.analytics.groupBy({
        by: ['page'],
        where: {
          eventType: 'page_view',
          createdAt: { gte: startDate },
        },
        _count: {
          page: true,
        },
        orderBy: {
          _count: {
            page: 'desc',
          },
        },
        take: 10,
      }),
    ]);

    res.json({
      success: true,
      data: {
        contacts: {
          total: totalContacts,
          pending: pendingContacts,
        },
        analytics: {
          pageViews: totalPageViews,
          uniqueVisitors,
        },
        popularPages: popularPages.map((p: any) => ({
          page: p.page,
          views: p._count.page,
        })),
        period: {
          days: daysNum,
          startDate: startDate.toISOString(),
          endDate: new Date().toISOString(),
        },
      },
    });
  } catch (error) {
    console.error('Error in getStatistics:', error);
    next(error);
  }
};
