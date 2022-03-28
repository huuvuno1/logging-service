import { Router } from 'express';
import { asyncRouteHandler } from '../../../middlewares';
import * as controller from './controller';

const router = Router();

router.get('/', asyncRouteHandler(controller.getLogs));
router.get('/services', asyncRouteHandler(controller.getListServices));
router.get('/overview', asyncRouteHandler(controller.getOverview));
router.get('/log-tracking', asyncRouteHandler(controller.logTracking));

export default router;
