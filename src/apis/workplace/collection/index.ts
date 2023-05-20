import { request } from '@/utils/request';
import { EReqMethod } from '@/enums/htttpEnum';

const COLLECTION_PREFIX_URL = '/workplace/card_collection';

/**
 * @description Get Collections
 * @param {loginParams} loginParams
 * @callback request<Promise<API.UserInfo>>
 */
export function getCollections(queryParams?: any) {
  return request<API.PaginResponse<'card_collections', API.ICollection>>({
    url: COLLECTION_PREFIX_URL,
    method: EReqMethod.GET,
    params: queryParams,
  });
}

/**
 * @description Get Collections
 * @param {loginParams} loginParams
 * @callback request<Promise<API.UserInfo>>
 */
export function getCollectionsById(collectionId: string) {
  return request<API.ICollection>({
    url: `${COLLECTION_PREFIX_URL}/${collectionId}`,
    method: EReqMethod.GET,
  });
}
/**
 * @description get cards by collection id
 * @param {collectionId queryParams} string  @param {queryParams} any
 * @callback
 */
export function getCardsOfCollection(collectionId: string, queryParams?: any) {
  return request<API.PaginResponse<'cards', API.ICard>>({
    url: `${COLLECTION_PREFIX_URL}/${collectionId}/cards`,
    method: EReqMethod.GET,
    params: queryParams,
  });
}

/**
 * @description get cards by collection id
 * @param {collectionId queryParams} string  @param {queryParams} any
 * @callback
 */
export function createCollection(creationData: API.ICollectionCreateData) {
  return request<API.ICollection>({
    url: `${COLLECTION_PREFIX_URL}`,
    method: EReqMethod.POST,
    data: { card_collection: creationData },
  });
}

/**
 * @description get cards by collection id
 * @param {collectionId queryParams} string  @param {queryParams} any
 * @callback
 */
export function updateCollection(
  collectionId: string,
  updateData: API.ICollectionCreateData
) {
  return request<API.ICollection>({
    url: `${COLLECTION_PREFIX_URL}/${collectionId}`,
    method: EReqMethod.PATCH,
    data: { card_collection: updateData },
  });
}

/**
 * @description get cards by collection id
 * @param {collectionId queryParams} string  @param {queryParams} any
 * @callback
 */
export function deleteCollection(collectionId: string) {
  return request<API.ICollection>({
    url: `${COLLECTION_PREFIX_URL}/${collectionId}`,
    method: EReqMethod.DELETE,
  });
}
