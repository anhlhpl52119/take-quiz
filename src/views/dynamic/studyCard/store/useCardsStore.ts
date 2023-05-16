import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';
import { getCardsOfCollection } from '@/apis/workplace';
// import {
//   ESessionQuestionType,
//   gennerateTestSession,
//   submitTestSession,
//   // type IResultTest,
// } from '@/apis/workplace';
interface IState {
  id: string;
  isFetching: boolean;
  cardsQuery: {
    items: number;
    page: number;
    query?: { set_favorite_true: boolean };
  };
  cardsInCollection: API.ICard[];
}
export const useCardsStore = defineStore('cards_store', {
  state(): IState {
    return {
      id: '',
      isFetching: false,
      cardsQuery: { items: 50, page: 1 },
      cardsInCollection: [],
    };
  },
  getters: {
    getId: (state): string => {
      return state.id;
    },
  },
  actions: {
    async loadCardsOfCollection(collectionId: string, isLoadFavorite: boolean) {
      if (isLoadFavorite === true) {
        this.cardsQuery = {
          ...this.cardsQuery,
          query: { set_favorite_true: true },
        };
      }
      try {
        this.isFetching = true;
        const resultCards: API.ICard[] = [];

        const { cards, total_page, current_page } = await getCardsOfCollection(
          collectionId,
          this.cardsQuery
        );
        resultCards.push(...cards);
        if (current_page < total_page) {
          for (let nextPage = 2; nextPage <= total_page; nextPage++) {
            const { cards } = await getCardsOfCollection(collectionId, {
              ...this.cardsQuery,
              page: nextPage,
            });
            resultCards.push(...cards);
          }
        }
        this.cardsInCollection = resultCards;
        isLoadFavorite &&
          message.success({
            content: 'Load favorite cards success!',
            duration: 1.5,
          });
        // isLoadFavorite && message.success({ content: 'Load favorite cards success!' });
      } catch (error) {
        this.cardsInCollection = [];
        return Promise.reject(error);
      } finally {
        this.cardsQuery = { items: 50, page: 1 };
        this.isFetching = false;
      }
    },
  },
});
