export interface IFavoriteAction {
  actionType: 'like' | 'dislike';
  serviceId: number
}

export interface IGetListFavorite {
  page: number;
  pageSize: number;
}
