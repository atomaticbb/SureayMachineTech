import { Router } from 'express';
import {
  getContacts,
  updateContactStatus,
  addFollowUp,
  getAnalytics,
  getStatistics,
} from '../controllers/adminController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.use(requireAuth);

// 联系人管理
router.get('/contacts',                  getContacts);
router.patch('/contacts/:id/status',     updateContactStatus);
router.post('/contacts/:id/followups',   addFollowUp);

// 访问分析
router.get('/analytics',  getAnalytics);
router.get('/statistics', getStatistics);

export default router;
