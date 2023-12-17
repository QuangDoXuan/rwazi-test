export enum HttpCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ServiceTypeEnum {
  SUPERMARKET = 'supermarket',
  CINEMA = 'cinema',
  RESTAURANT = 'restaurant',
  TEA = 'tea'
}

export enum ActionTypeEnum {
  LIKE = 'like',
  DISLIKE = 'dislike'
}
