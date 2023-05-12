import { defineStore } from 'pinia';
import {
  ESessionQuestionType,
  gennerateTestSession,
  submitTestSession,
  // type IResultTest,
} from '@/apis/workplace';
export const useTestStore = defineStore('testSessionStore', () => {
  const route = useRoute();
  const isFetching = ref<boolean>(false);
  const testCards = ref<API.ITestCards[]>();
  const sessionInfo = ref<API.ITestSession>();
  const userAnswered = ref(new Map<string, API.ISubmitTestCardAnswer>());
  const testResult = ref<API.ITestSessionResults['results']>();
  const visibleResult = ref(false);

  const configModal = reactive<API.ITestSetupParams>({
    card_collection_id: route.params.id as string, //get id immedietly
    configs: {
      question_count: 10,
      question_type: ESessionQuestionType.TrueFalseType,
      definition_as_question: false,
      execution_time: 15, //15 mins default
    },
  });
  const getQuestionType = computed<ESessionQuestionType>(() => {
    return configModal.configs.question_type;
  });
  const getUserAns = computed<API.ISubmitTestCardAnswer[]>(() => {
    return Array.from(userAnswered.value.values());
  });
  const getExcutionTime = computed(() => {
    return configModal.configs.execution_time;
  });

  //generated after call API submit session
  const getSessionId = computed(() => {
    return sessionInfo.value?.id;
  });

  async function loadTestSession() {
    try {
      isFetching.value = true;
      const { test_cards, test_session } = await gennerateTestSession(configModal);
      testCards.value = test_cards;
      sessionInfo.value = test_session;
    } catch (error) {
      Promise.reject(error);
      testCards.value = [];
    } finally {
      isFetching.value = false;
    }
  }
  async function submitAnswers() {
    try {
      isFetching.value = true;
      const { results } = await submitTestSession(sessionInfo.value?.id!, getUserAns.value);
      testResult.value = results;
      visibleResult.value = true;
      resetCards();
    } catch (error) {
      Promise.reject(error);
      testCards.value = [];
    } finally {
      isFetching.value = false;
    }
  }
  function resetCards() {
    testCards.value = [];
  }

  return {
    configModal,
    isFetching,
    testCards,
    sessionInfo,
    testResult,
    getQuestionType,
    getSessionId,
    userAnswered,
    visibleResult,
    getExcutionTime,
    resetCards,
    loadTestSession,
    submitAnswers,
  };
});
