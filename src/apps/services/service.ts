import { ISearchPlace } from "./interface";
import { PlaceRepository } from "./repository";

export class PlaceService {
  constructor(
    private readonly placeRepository = new PlaceRepository()
  ) {}

  search(params: ISearchPlace) {
    return this.placeRepository.search(params);
  }
}