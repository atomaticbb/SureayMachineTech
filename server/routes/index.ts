import { Router } from 'express';
import productsRouter from './products.js';
import contactRouter from './contact.js';

const router = Router();

router.use('/', productsRouter);
router.use('/', contactRouter);

export default router;
