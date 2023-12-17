import { Router } from 'express';
import { FavoriteController } from './controller';
import { authenticateJWT } from '../../middlewares/auth-middleware';

const favoriteRouter: Router = Router();
const favoriteController = new FavoriteController();

favoriteRouter.post('/favorites', authenticateJWT, (req: any, res) => favoriteController.addToFavorite(req, res));
favoriteRouter.get('/favorites', authenticateJWT, (req: any, res) => favoriteController.getListFavorite(req, res));

export default favoriteRouter;
