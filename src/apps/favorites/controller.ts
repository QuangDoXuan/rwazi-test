import { Request, Response } from 'express';
import { ResponseBase } from "../../libs/responses/response";
import { FavoriteService } from './service';
import { validateFavoriteAction, validateGetListFavorite } from './validator';
import { AuthenticatedRequest } from '../../libs/common/interface';

export class FavoriteController {
  constructor(
    private readonly favoriteService = new FavoriteService(),
    private readonly response = new ResponseBase()
  ) { }

  async getListFavorite(req: AuthenticatedRequest, res: Response) {
    try {
      const params = validateGetListFavorite(req.query)
      const data = await this.favoriteService.getListFavorite(req.user, params)
      return this.response.success(res, data)
    } catch (err) {
      return this.response.error(res, err)
    }
  }

  async addToFavorite(req: AuthenticatedRequest, res: Response) {
    try {
      const body = validateFavoriteAction(req.body)
      await this.favoriteService.addToFavorite(req.user, body)
      return this.response.success(res, {})
    } catch (err) {
      return this.response.error(res, err)
    }
  }
}
