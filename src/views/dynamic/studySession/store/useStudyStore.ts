import { defineStore } from 'pinia';
import {
  ESessionQuestionType,
  gennerateStudySession,
  closeStudySession,
  takeStudySessionResult,
} from '@api/workplace';
interface IState {
  studysetupConfig: API.IStudySetupParams;
  isFetching: boolean;
  studyCards: API.IStudyCard[];
  cardResult: API.IStudyCard | undefined;
  studySession: API.IStudySession | undefined;
}

export const useStudyStore = defineStore('study_session', {
  state: (): IState => {
    const route = useRoute();
    const routeCollectionId = computed(() => {
      if (route) {
        return route.params.id as string;
      } else {
        return '';
      }
    });
    return {
      isFetching: false,
      studysetupConfig: {
        card_collection_id: routeCollectionId.value,
        configs: {
          definition_as_question: false,
          question_count: 10,
          question_type: ESessionQuestionType.FourAnswer,
        },
      },
      studyCards: [],
      studySession: undefined,
      cardResult: undefined,
    };
  },
  getters: {
    getSessionId: (state): string => {
      if (state.studySession) {
        return state.studySession.id;
      } else {
        return '';
      }
    },
    getNumberOfCards: (state): number => {
      return state.studyCards.length;
    },
  },
  actions: {
    async setupStudy() {
      try {
        this.isFetching = true;
        const { study_cards, study_session } = await gennerateStudySession(this.studysetupConfig);
        this.studyCards = study_cards;
        this.studySession = study_session;
      } catch (error) {
        return Promise.reject(error);
      } finally {
        this.isFetching = false;
      }
    },
    async submitCardStudy(cardId: string, userAnswer: string) {
      try {
        this.isFetching = true;
        const { study_card } = await takeStudySessionResult(this.getSessionId, cardId, userAnswer);
        this.cardResult = study_card;
      } catch (error) {
        return Promise.reject(error);
      } finally {
        this.isFetching = false;
      }
    },
    async terminateSession() {
      try {
        this.isFetching = true;
        await closeStudySession(this.getSessionId);
      } catch (error) {
        return Promise.reject(error);
      } finally {
        this.isFetching = false;
      }
    },
    // resetState() {
    //   this.
    // },
  },
});
