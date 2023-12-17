import Joi from "joi";
import { validateBody, validateQueryParams } from "../../libs/validation/abstract-validation";
import { IFavoriteAction, IGetListFavorite } from "./interface";
import { ActionTypeEnum } from "../../libs/common/enum";
import { pagination } from "../../libs/common/constant";

export const validateFavoriteAction = (data: any): IFavoriteAction => {
  return validateBody(data,
    Joi.object({
      serviceId: Joi.number().required().min(1),
      actionType: Joi.string().valid(...Object.values(ActionTypeEnum)),
    })
  )
};

export const validateGetListFavorite = (data: any): IGetListFavorite => {
  return validateQueryParams(data,
    Joi.object({
      page: Joi.number().default(pagination.defaultPage),
      pageSize: Joi.number().default(pagination.defaultPageSize),
    })
  )
};
