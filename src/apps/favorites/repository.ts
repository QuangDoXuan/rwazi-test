import { AbstractRepository } from "../../libs/database/abstracts/abstract-repository";
import { Favorite } from "../../libs/database/entities/favorites";
import { IGetListFavorite } from "./interface";

export class FavoriteRepository extends AbstractRepository<Favorite> {
  async addToFavorite(userId: number, serviceId: number) {
    const repo = await this.getRepo(Favorite)
    return repo.insert({ userId, serviceId })
  }

  async removeFromFavorite(userId: number, serviceId: number) {
    const repo = await this.getRepo(Favorite)
    return repo.delete({ userId, serviceId })
  }

  async getUserFavorite(userId: number, serviceId: number) {
    const repo = await this.getRepo(Favorite)
    return repo.createQueryBuilder("favorites")
    .leftJoin("favorites.service", "service")
    .where("favorites.userId = :userId", { userId })
    .andWhere("favorites.serviceId = :serviceId", { serviceId })
    .getOne()
  }

  async getUserFavorites(email: string, params: IGetListFavorite) {
    const repo = await this.getRepo(Favorite)
    const qb = repo.createQueryBuilder("favorites")
    .leftJoin("favorites.service", "service")
    .leftJoin("favorites.user", "user")
    .where("user.email = :email", { email })
    .select([
      "favorites.id",
      "service.id",
      "service.location",
      "service.name"
    ])
    return this.parsePaginate(qb, params);
  }
}