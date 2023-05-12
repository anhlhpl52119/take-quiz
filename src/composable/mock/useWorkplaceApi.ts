import { createVNode } from 'vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Modal, message } from 'ant-design-vue';
import {
  createCardInCollection,
  createCollection,
  deleteCollection,
  getCardsOfCollection,
  getCollections,
  getCollectionsById,
  updateCardsInCollection,
  updateCollection,
} from '@/apis/workplace';
import { RouteName } from '@/enums/routesEnum';

export function useWorkplaceApi() {
  const router = useRouter();
  const isLoading = ref(false);
  const collections = ref<API.ICollection[]>([]);

  async function loadCollections() {
    const queryParams = {
      page: 1,
      items: 25,
      query: { s: 'created_at desc', status_eq: 'active' },
    };
    try {
      isLoading.value = true;
      const { card_collections } = await getCollections(queryParams);
      collections.value = card_collections;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function loadCardsOfCollection(
    collectionId: string,
    isLoadFavorite?: boolean
  ): Promise<API.ICard[] | []> {
    isLoadFavorite ?? console.log('load');
    // const normalQuery = { items: 50, page: 1 };
    // normalQuery = { ...normalQuery, query: { is: true } };
    try {
      isLoading.value = true;
      const resultCards: API.ICard[] = [];

      const { cards, total_page, current_page } = await getCardsOfCollection(collectionId, {
        items: 50,
        page: 1,
      });
      resultCards.push(...cards);
      if (current_page < total_page) {
        for (let nextPage = 2; nextPage <= total_page; nextPage++) {
          const { cards } = await getCardsOfCollection(collectionId, {
            items: 50,
            page: nextPage,
          });
          resultCards.push(...cards);
        }
      }
      return resultCards;
    } catch (error) {
      Promise.reject(error);
      return [];
    } finally {
      isLoading.value = false;
    }
  }
  async function loadCollectionById(collectionId: string) {
    try {
      isLoading.value = true;
      const collection = await getCollectionsById(collectionId);
      return collection;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }
  async function createNewCollectionAndCards(
    creationData: API.ICollectionCreateData,
    cardsInfo: API.ICardCreateParams[]
  ) {
    try {
      isLoading.value = true;
      const collection = await createCollection(creationData);
      await createCardInCollection({ card_collection_id: collection.id, cards: cardsInfo });
      router.replace({
        name: RouteName.CollectionDetails,
        params: { id: collection.id },
      });
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }
  async function onUpdateCardsInCollection(
    collectionId: string,
    cardsInfo: API.ICardUpdateParams[]
  ) {
    try {
      isLoading.value = true;
      await updateCardsInCollection({ card_collection_id: collectionId, cards: cardsInfo });
      //Modal Close
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }
  async function onUpdateCollection(collectionId: string, cardsInfo: API.ICollectionCreateData) {
    try {
      isLoading.value = true;
      await updateCollection(collectionId, cardsInfo);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function doDeleteCollection(collectionId: string) {
    Modal.confirm({
      title: 'Do you Want to delete this collection?',
      icon: createVNode(ExclamationCircleOutlined),
      content: createVNode(
        'div',
        { style: 'color:red;' },
        'This action will be remove your collection and all cards in side!'
      ),
      async onOk() {
        try {
          await deleteCollection(collectionId);
          collections.value.filter((ft) => {
            return ft.id !== collectionId;
          });
          message.success({ content: 'Deleted', duration: 1 });
        } catch (error) {
          return Promise.reject(error);
        }
      },
      okType: 'danger',
      okText: 'Yes, delete it!',
    });
  }
  async function onUpdateAllCollectionDatas(
    collectionId: string,
    updateCollection: API.ICollectionCreateData,
    updateCardInCollection: API.ICardUpdateParams[],
    createNewCard: API.ICardCreateParams[]
  ) {
    try {
      isLoading.value = true;
      if (createNewCard.length > 0) {
        await Promise.all([
          await onUpdateCollection(collectionId, updateCollection),
          await onUpdateCardsInCollection(collectionId, updateCardInCollection),
          await createCardInCollection({ card_collection_id: collectionId, cards: createNewCard }),
        ]);
      } else {
        await Promise.all([
          await onUpdateCollection(collectionId, updateCollection),
          await onUpdateCardsInCollection(collectionId, updateCardInCollection),
        ]);
      }
      router.replace({
        name: RouteName.CollectionDetails,
        params: { id: collectionId },
      });
      message.success({ content: 'Collection is updated!', duration: 1.5 });
    } catch (error) {
      Promise.reject(error);
    } finally {
      isLoading.value = false;
    }

    // if has new card => call Create card in collection
  }

  return {
    isLoading,
    collections,
    loadCollections,
    loadCollectionById,
    loadCardsOfCollection,
    doDeleteCollection,
    onUpdateCollection,
    createNewCollectionAndCards,
    onUpdateCardsInCollection,
    onUpdateAllCollectionDatas,
  };
}
