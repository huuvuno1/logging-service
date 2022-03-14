import { Router } from 'express';
import healthRouter from './health';
import userRouter from './users';
import logRouter from './logs';

const router = Router();

router.use('/health', healthRouter);
router.use('/users', userRouter);
router.use('/logs', logRouter)

export default router;
