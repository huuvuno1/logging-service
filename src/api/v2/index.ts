import { Router } from 'express';
import logRouter from './logs';

const router = Router();

router.use('/logs', logRouter)

export default router;
