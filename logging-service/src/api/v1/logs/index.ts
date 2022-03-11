import { Router } from 'express';
import { asyncRouteHandler } from '../../../middlewares';
import * as controller from './controller';

const router = Router();

router.get('/', asyncRouteHandler(controller.getLogs));
router.post('/', asyncRouteHandler(controller.testSave))

export default router;
