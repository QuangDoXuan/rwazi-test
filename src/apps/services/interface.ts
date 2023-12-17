import { ServiceTypeEnum } from "../../libs/common/enum";

export interface ISearchPlace {
  name: string;
  serviceType: ServiceTypeEnum,
  lat: number;
  long: number;
  radius: number;
  page: number;
  pageSize: number;
}
