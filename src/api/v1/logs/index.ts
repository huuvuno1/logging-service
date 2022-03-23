import { Router } from 'express';
import { asyncRouteHandler } from '../../../middlewares';
import * as controller from './controller';

const router = Router();

router.get('/', asyncRouteHandler(controller.getLogs));
router.get('/overview', asyncRouteHandler(controller.getOverview));
router.post('/', asyncRouteHandler(controller.createLog));

export default router;
