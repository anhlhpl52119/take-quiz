<template>
  <div>
    <header>
      <TestSessionHeader></TestSessionHeader>
    </header>
    <div v-if="testSessionStore.visibleResult">
      <Result></Result>
    </div>
    <div v-if="!testSessionStore.visibleResult" class="wrapper-content">
      <section class="question-visible">
        <div v-if="!testCards">
          <template>
            <a-result title="Your have not redy!">
              <template #extra>
                <a-button key="console" type="primary">Go Console</a-button>
              </template>
            </a-result>
          </template>
        </div>
        <template v-else>
          <template v-if="testSessionStore.getQuestionType === ESessionQuestionType.TrueFalseType">
            <div v-for="card in testCards" :key="card.id">
              <TestTrueFalseQuestion
                :data="card"
                :question-type="testSessionStore.getQuestionType"
              ></TestTrueFalseQuestion>
            </div>
          </template>
          <template v-if="testSessionStore.getQuestionType === ESessionQuestionType.FourAnswer">
            <div v-for="card in testCards" :key="card.id">
              <TestMultipleAnswer
                :data="card"
                :question-type="testSessionStore.getQuestionType"
              ></TestMultipleAnswer>
            </div>
          </template>
        </template>
      </section>
    </div>
    <footer v-if="!testSessionStore.visibleResult || !testCards" class="fotter-page">
      <a-button
        type="primary"
        @click="testSessionStore.submitAnswers"
        :loading="testSessionStore.isFetching"
        size="large"
        >Submit</a-button
      >
    </footer>
    <template>
      <ModalConfig v-model:display="configModal"></ModalConfig>
    </template>
  </div>
</template>
<script lang="ts" setup>
import TestSessionHeader from './TestSessionHeader.vue';
import { useTestStore } from './store/useTestStore';
import { ESessionQuestionType } from '@/apis/workplace';
import TestTrueFalseQuestion from '@/components/basic/TestTrueFalseAnswer.vue';
import TestMultipleAnswer from '@/components/basic/TestMultipleAnswer.vue';
const testSessionStore = useTestStore();
const testCards = computed(() => {
  return testSessionStore.testCards;
});
const ModalConfig = defineAsyncComponent(() => import('./ModalCreateTestSession.vue'));
const Result = defineAsyncComponent(() => import('./Result.vue'));
const configModal = ref(true);
</script>
<style scoped lang="less">
.wrapper-content {
  margin-top: 2em;
  .question-visible {
    display: flex;
    flex-direction: column;
    gap: 1.5em 0;
    width: min(95%, 900px);
    margin: auto;
  }
}
.fotter-page {
  display: flex;
  justify-content: center;
  padding: 2em;
}
</style>
