<template>
  <div>
    <header>
      <TestSessionHeader></TestSessionHeader>
    </header>
    <Suspense>
      <!-- <component :is="Component" /> -->
      <div class="wrapper-content">
        <section class="question-visible" v-if="studyCards">
          <QuestionContent :data="studyCards[0]"></QuestionContent>
        </section>
      </div>
    </Suspense>

    <!-- <footer class="fotter-page">
      <a-button
        type="primary"
        @click="studySessionStore.checkUserAnswer"
        :loading="studySessionStore.isFetching"
        size="large"
        >Submit</a-button
      >
    </footer> -->
    <template>
      <ModalConfig v-model:display="configModal"></ModalConfig>
    </template>
  </div>
</template>
<script lang="ts" setup>
import TestSessionHeader from './TestSessionHeader.vue';
// import QuestionContent from './QuestionContent.vue';
import { useStudyStore } from './store/useStudyStore';
const ModalConfig = defineAsyncComponent(
  () => import('./ModalCreateTestSession.vue')
);
const QuestionContent = defineAsyncComponent(
  () => import('./QuestionContent.vue')
);

const studyStore = useStudyStore();
const { studyCards } = toRefs(studyStore);

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
