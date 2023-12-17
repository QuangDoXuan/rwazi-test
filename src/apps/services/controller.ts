import { Request, Response } from 'express';
import { ResponseBase } from "../../libs/responses/response";
import { PlaceService } from './service';
import { validateSearchServices } from './validator';

export class ServiceController {
  constructor(
    private readonly placeService = new PlaceService(),
    private readonly response = new ResponseBase()
  ) { }

  async search(req: Request, res: Response) {
    try {
      const params = validateSearchServices(req.query)
      const data = await this.placeService.search(params)
      return this.response.success(res, data)
    } catch (err) {
      return this.response.error(res, err)
    }
  }
}
