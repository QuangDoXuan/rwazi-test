import { ICurrentUser } from "src/libs/common/interface";
import { IFavoriteAction, IGetListFavorite } from "./interface";
import { FavoriteRepository } from "./repository";
import { UserRepository } from "../users/repository";
import { BadRequestException } from "../../libs/exceptions/bad-request-exception";
import { apiErrorMessages } from "../../libs/common/messages";
import { PlaceRepository } from "../services/repository";

export class FavoriteService {
  constructor(
    private readonly favoriteRepository = new FavoriteRepository(),
    private readonly userRepository = new UserRepository(),
    private readonly serviceRepository = new PlaceRepository()
  ) {}

  async addToFavorite(auth: ICurrentUser, body: IFavoriteAction) {
    const [user, favorite, service] = await Promise.all([
      this.userRepository.getUserById(auth.id),
      this.favoriteRepository.getUserFavorite(auth.id, body.serviceId),
      this.serviceRepository.getServiceById(body.serviceId)
    ])
    if (!user) {
      throw new BadRequestException(apiErrorMessages.userNotFound)
    }
    if (!service) {
      throw new BadRequestException(apiErrorMessages.serviceNotExists)
    }
    switch(body.actionType) {
      case 'like':
        if (favorite) {
          throw new BadRequestException(apiErrorMessages.favoriteExists)
        }
        return this.favoriteRepository.addToFavorite(auth.id, body.serviceId)
      case "dislike":
        return this.favoriteRepository.removeFromFavorite(auth.id, body.serviceId)
      default:
        return;
    }
  }

  getListFavorite(auth: ICurrentUser, params: IGetListFavorite) {
    return this.favoriteRepository.getUserFavorites(auth.email, params);
  }
}