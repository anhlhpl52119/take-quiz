<template>
  <a-result status="success">
    <template #title>
      <div>Submit test sucess!</div>
    </template>
    <template #extra>
      <a-progress type="circle" :percent="percentCorrect" :width="80" :stroke-color="colored" />
      <br />
      <div style="margin-top: 1em">
        <div>
          Total questions: <span>{{ testResult.total_question }}</span>
        </div>
        <div>
          Total answers: <span>{{ testResult.total_answer }}</span>
        </div>
        <div>
          Total correct answers: <span>{{ testResult.total_success_answer }}</span>
        </div>
      </div>
    </template>
  </a-result>
</template>
<script setup lang="ts">
import { useTestStore } from './store/useTestStore';
const testResult = useTestStore().testResult!;
const percentCorrect = computed(() => {
  return Math.round((testResult.total_success_answer / testResult.total_question) * 100);
});
const colored = computed(() => {
  if (percentCorrect.value <= 20) {
    return '#ff4d4f';
  } else if (20 < percentCorrect.value && percentCorrect.value < 80) {
    return '108ee9';
  } else {
    return '#87d068';
  }
});
</script>
