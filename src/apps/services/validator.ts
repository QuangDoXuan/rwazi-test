import Joi from "joi";
import { validateBody, validateQueryParams } from "../../libs/validation/abstract-validation";
import { ISearchPlace } from "./interface";
import { ServiceTypeEnum } from "../../libs/common/enum";
import { pagination } from "../../libs/common/constant";

export const validateSearchServices = (data: any): ISearchPlace => {
  return validateQueryParams(data, 
    Joi.object({
      lat: Joi.number().required(),
      long: Joi.number().required(),
      serviceType: Joi.string().valid(...Object.values(ServiceTypeEnum)),
      name: Joi.string(),
      radius: Joi.number().default(10),
      page: Joi.number().default(pagination.defaultPage),
      pageSize: Joi.number().default(pagination.defaultPageSize)
    })
  )
};
