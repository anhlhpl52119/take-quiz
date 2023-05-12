import { getStudySessions, getTestSessions, setCardIsFavorite } from '@/apis/workplace';

export function useStudyCard() {
  const route = useRoute();
  const isFetching = ref(false);
  const studySessions = ref<API.IStudySession[]>([]);
  const testSessions = ref<API.ITestSession[]>([]);
  const currentCollectionId = ref(route.params.id as string);

  async function loadCollectionStudyHistory() {
    const queryParams = {
      page: 1,
      items: 20,
      query: {
        status_eq: 'closed',
        card_collection_id_eq: currentCollectionId.value,
      },
    };
    try {
      isFetching.value = true;
      const { study_sessions } = await getStudySessions(queryParams);
      studySessions.value = study_sessions;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isFetching.value = false;
    }
  }
  async function loadCollectionTestHistory() {
    const queryParams = {
      page: 1,
      items: 20,
      query: {
        status_eq: 'submitted',
        card_collection_id_eq: currentCollectionId.value,
      },
    };
    try {
      isFetching.value = true;
      const { test_sessions } = await getTestSessions(queryParams);
      testSessions.value = test_sessions;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isFetching.value = false;
    }
  }
  async function setCardFavorite(favoritecard: API.ICardUpdateFavoriteParams) {
    try {
      await setCardIsFavorite({
        card_collection_id: currentCollectionId.value,
        cards: [favoritecard],
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
  return {
    isFetching,
    studySessions,
    testSessions,
    setCardFavorite,
    loadCollectionStudyHistory,
    loadCollectionTestHistory,
  };
}
