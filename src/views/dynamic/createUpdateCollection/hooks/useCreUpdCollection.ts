import { getCardsOfCollection, getCollectionsById } from '@/apis/workplace';

export function useCreUpdCollection() {
  const collectionRes = ref<API.ICollection>({} as API.ICollection);
  const cardsCollection = ref<API.ICard[]>([]);
  const isFetch = reactive({
    global: false,
  });

  async function loadCollectionAndCards(collectionId: string) {
    try {
      isFetch.global = true;
      const [collection, cards] = await Promise.all([
        _loadCollectionById(collectionId),
        loadCardsOfCollection(collectionId),
      ]);
      collectionRes.value = collection;
      cardsCollection.value = cards;
    } catch (err) {
      return Promise.reject(err);
    } finally {
      isFetch.global = false;
    }
  }

  async function _loadCollectionById(collectionId: string) {
    try {
      isFetch.global = true;
      return await getCollectionsById(collectionId);
    } catch (error) {
      return {} as API.ICollection;
    } finally {
      isFetch.global = false;
    }
  }

  async function loadCardsOfCollection(collectionId: string) {
    const pageFetchingParams = { items: 50, page: 1 };
    try {
      isFetch.global = true;
      const cardsAfterPaging: API.ICard[] = [];

      const { cards, total_page, current_page } = await getCardsOfCollection(
        collectionId,
        pageFetchingParams
      );
      cardsAfterPaging.push(...cards);
      if (current_page < total_page) {
        for (let nextPage = 2; nextPage <= total_page; nextPage++) {
          const { cards } = await getCardsOfCollection(collectionId, {
            ...pageFetchingParams,
            page: nextPage,
          });
          cardsAfterPaging.push(...cards);
        }
      }
      return cardsAfterPaging;
    } catch (error) {
      return [];
    } finally {
      isFetch.global = false;
    }
  }

  return {
    isFetch,
    collectionRes,
    cardsCollection,
    loadCollectionAndCards,
  };
}
