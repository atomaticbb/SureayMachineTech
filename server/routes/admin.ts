import { Router } from 'express';
import {
  getContacts,
  updateContactStatus,
  getAnalytics,
  getStatistics,
} from '../controllers/adminController.js';

const router = Router();

// 联系人管理
router.get('/contacts', getContacts);
router.patch('/contacts/:id/status', updateContactStatus);

// 访问分析
router.get('/analytics', getAnalytics);
router.get('/statistics', getStatistics);

export default router;
