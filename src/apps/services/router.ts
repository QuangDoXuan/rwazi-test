import { Router } from 'express';
import { ServiceController } from './controller';
import { authenticateJWT } from '../../middlewares/auth-middleware';

const serviceRouter: Router = Router();
const serviceController = new ServiceController();

serviceRouter.get('/services', (req, res) => serviceController.search(req, res));

export default serviceRouter;
