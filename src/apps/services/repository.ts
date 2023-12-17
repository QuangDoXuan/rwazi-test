import { Service } from "../../libs/database/entities/service";
import { AbstractRepository } from "../../libs/database/abstracts/abstract-repository";
import { ISearchPlace } from "./interface";

export class PlaceRepository extends AbstractRepository<Service> {
  async search(params: ISearchPlace) {
    const repo = await this.getRepo(Service)
    const qb = repo.createQueryBuilder("services")
    .leftJoin("services.serviceToCategories", "serviceToCategories")
    .leftJoin("serviceToCategories.category", "category")
    .where("ST_Distance_Sphere(point(:longitude, :latitude), services.location) <= :radius",
      { latitude: params.lat, longitude: params.long, radius: params.radius }
    )
    if (params.name) {
      qb.andWhere("MATCH(services.name) AGAINST(:searchQuery IN BOOLEAN MODE)", { searchQuery: params.name })
    }
    if (params.serviceType) {
      qb.andWhere("category.name = :serviceType", { serviceType: params.serviceType })
    }
    qb.select([
      "services.id",
      "services.name",
      "services.location",
    ])
    return this.parsePaginate(qb, params);
  }

  async getServiceById(id: number) {
    const repo = await this.getRepo(Service)
    return repo.findOne({ where: { id }})
  }
}
