import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '../db/client.js';

const VALID_STATUSES = ['pending', 'replied', 'closed'] as const;
const VALID_FOLLOWUP_TYPES = ['Email', 'Call', 'Internal'] as const;
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 100;
const DEFAULT_DAYS = 7;
const MAX_DAYS = 90;
const CUID_PATTERN = /^c[a-z0-9]{24}$/;

function parsePositiveInt(
  value: string | undefined,
  fallback: number,
  max: number
) {
  const parsed = Number.parseInt(value ?? '', 10);

  if (Number.isNaN(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.min(parsed, max);
}

function isValidCuid(id: string) {
  return CUID_PATTERN.test(id);
}

function isPrismaNotFoundError(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2025'
  );
}

// ── Contacts ──────────────────────────────────────────────────────────────────

export const getContacts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page = '1', limit = '50', status, search } = req.query;
    const pageNum = parsePositiveInt(page as string, DEFAULT_PAGE, Number.MAX_SAFE_INTEGER);
    const limitNum = parsePositiveInt(limit as string, DEFAULT_LIMIT, MAX_LIMIT);
    const skip     = (pageNum - 1) * limitNum;

    const where: Record<string, unknown> = {};

    if (status && status !== 'all') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name:    { contains: search as string } },
        { email:   { contains: search as string } },
        { company: { contains: search as string } },
        { message: { contains: search as string } },
      ];
    }

    const [total, contacts] = await Promise.all([
      prisma.contact.count({ where }),
      prisma.contact.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
        include: {
          followUps: { orderBy: { createdAt: 'asc' } },
        },
      }),
    ]);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          page:       pageNum,
          limit:      limitNum,
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

// ── Status patch ──────────────────────────────────────────────────────────────

export const updateContactStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id }     = req.params;
    const { status } = req.body;

    if (!isValidCuid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid contact id' });
    }

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const existingContact = await prisma.contact.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existingContact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    const contact = await prisma.contact.update({
      where: { id },
      data:  { status },
    });

    res.json({ success: true, data: contact });
  } catch (error) {
    if (isPrismaNotFoundError(error)) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    console.error('Error in updateContactStatus:', error);
    next(error);
  }
};

// ── Add follow-up (atomic: create note + optional status update) ──────────────

export const addFollowUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id }              = req.params;
    const { content, type, status } = req.body;

    if (!isValidCuid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid contact id' });
    }

    if (!content || typeof content !== 'string' || !content.trim()) {
      return res.status(400).json({ success: false, message: 'Follow-up content is required' });
    }

    const resolvedType = VALID_FOLLOWUP_TYPES.includes(type) ? type : 'Internal';

    const existingContact = await prisma.contact.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existingContact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    const followUp = await prisma.$transaction(async (tx) => {
      const fu = await tx.followUp.create({
        data: {
          contactId: id,
          content:   content.trim(),
          type:      resolvedType,
        },
      });

      if (status && VALID_STATUSES.includes(status)) {
        await tx.contact.update({
          where: { id },
          data:  { status },
        });
      }

      return fu;
    });

    res.json({ success: true, data: followUp });
  } catch (error) {
    if (isPrismaNotFoundError(error)) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    console.error('Error in addFollowUp:', error);
    next(error);
  }
};

// ── Analytics ─────────────────────────────────────────────────────────────────

export const getAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { startDate, endDate, eventType, page = '1', limit = '50' } = req.query;
    const pageNum = parsePositiveInt(page as string, DEFAULT_PAGE, Number.MAX_SAFE_INTEGER);
    const limitNum = parsePositiveInt(limit as string, DEFAULT_LIMIT, MAX_LIMIT);
    const skip     = (pageNum - 1) * limitNum;

    const where: Record<string, unknown> = {};

    if (eventType && eventType !== 'all') {
      where.eventType = eventType;
    }

    if (startDate || endDate) {
      const createdAt: Record<string, Date> = {};
      if (startDate) createdAt.gte = new Date(startDate as string);
      if (endDate)   createdAt.lte = new Date(endDate   as string);
      where.createdAt = createdAt;
    }

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
          page:       pageNum,
          limit:      limitNum,
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

// ── Statistics ────────────────────────────────────────────────────────────────

export const getStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { days = '7' } = req.query;
    const daysNum = parsePositiveInt(days as string, DEFAULT_DAYS, MAX_DAYS);
    const startDate  = new Date();
    startDate.setDate(startDate.getDate() - daysNum);

    const [
      totalContacts,
      pendingContacts,
      totalPageViews,
      uniqueVisitors,
      popularPages,
    ] = await Promise.all([
      prisma.contact.count(),

      prisma.contact.count({ where: { status: 'pending' } }),

      prisma.analytics.count({
        where: {
          eventType: 'page_view',
          createdAt: { gte: startDate },
        },
      }),

      prisma.analytics.groupBy({
        by:    ['sessionId'],
        where: {
          eventType: 'page_view',
          createdAt: { gte: startDate },
        },
      }).then(r => r.length),

      prisma.analytics.groupBy({
        by:    ['page'],
        where: {
          eventType: 'page_view',
          createdAt: { gte: startDate },
        },
        _count:  { page: true },
        orderBy: { _count: { page: 'desc' } },
        take:    10,
      }),
    ]);

    res.json({
      success: true,
      data: {
        contacts: { total: totalContacts, pending: pendingContacts },
        analytics: { pageViews: totalPageViews, uniqueVisitors },
        popularPages: popularPages.map((p: { page: string | null; _count: { page: number } }) => ({
          page:  p.page,
          views: p._count.page,
        })),
        period: {
          days:      daysNum,
          startDate: startDate.toISOString(),
          endDate:   new Date().toISOString(),
        },
      },
    });
  } catch (error) {
    console.error('Error in getStatistics:', error);
    next(error);
  }
};
