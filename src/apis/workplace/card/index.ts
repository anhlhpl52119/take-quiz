import { request } from '@/utils/request';
import { EReqMethod } from '@/enums/htttpEnum';

const CARD_PREFIX_URL = '/workplace/card';

export function updateCardsInCollection(updateData: API.ICardUpdateDatas) {
  return request<API.PaginResponse<'card_collections', API.ICollection>>({
    url: CARD_PREFIX_URL,
    method: EReqMethod.PATCH,
    data: { obj: updateData },
  });
}
export function setCardIsFavorite(updateData: API.ICardUpdateFavoriteDatas) {
  return request<API.PaginResponse<'card_collections', API.ICollection>>({
    url: CARD_PREFIX_URL,
    method: EReqMethod.PATCH,
    data: { obj: updateData },
  });
}

export function createCardInCollection(creationData: API.ICardCreateDatas) {
  return request<API.ICollection>({
    url: CARD_PREFIX_URL,
    method: EReqMethod.POST,
    data: { obj: creationData },
  });
}
export function deleteCardInCollection(deleteData: API.ICardDeleteDatas) {
  return request<API.ICollection>({
    url: CARD_PREFIX_URL,
    method: EReqMethod.DELETE,
    data: { obj: deleteData },
  });
}
