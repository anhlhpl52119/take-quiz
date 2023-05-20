<template>
  <div
    class="box-shadow box-wrapper"
    :style="{ backgroundColor: isAnseredColor }"
  >
    <div class="flex-content">
      <div class="flex-item horizon-divider">
        <h5 class="label-item">Term</h5>
        <div>{{ cardQuestion }}</div>
      </div>
    </div>
    <div class="answer-box">
      <a-radio-group
        v-model:value="userAnswer"
        button-style="solid"
        @change="onUserAnsChange"
      >
        <a-radio :style="radioStyle" :value="answerOption[0]"
          ><span style="font-size: 20px">{{ answerOption[0] }}</span>
        </a-radio>
        <a-radio :style="radioStyle" :value="answerOption[1]"
          ><span style="font-size: 20px">{{ answerOption[1] }}</span></a-radio
        >
        <a-radio :style="radioStyle" :value="answerOption[2]"
          ><span style="font-size: 20px">{{ answerOption[2] }}</span></a-radio
        >
        <a-radio :style="radioStyle" :value="answerOption[3]"
          ><span style="font-size: 20px">{{ answerOption[3] }}</span></a-radio
        >
      </a-radio-group>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useTestStore } from '@/views/dynamic/testSession/store/useTestStore';
const props = defineProps<{ data: API.ITestCards }>();
const userAnswered = useTestStore().userAnswered;
const { data } = toRefs(props);

const radioStyle = reactive({
  padding: '0.5em',
  border: '1px solid darkgray',
  borderRadius: '1em',
});
const isAnseredColor = computed(() => {
  if (userAnswer.value) {
    return '#3a6f4326';
  } else {
    return '';
  }
});
function onUserAnsChange() {
  const testCardId = data.value.id;
  userAnswered.set(data.value.id, {
    test_card_id: testCardId,
    user_answers: [userAnswer.value],
  });
}
const userAnswer = ref();
const cardQuestion = computed<string>(() => {
  return data.value.questions.question;
});
const answerOption = computed<string[]>(() => {
  return data.value.answers.answer_list;
});
</script>
<style scoped lang="less">
.box-wrapper {
  padding: 1em;
  background-color: white;
  border-radius: 0.5em;
  .flex-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1em 0;
    .horizon-divider {
      order: -1;
    }
    .flex-item {
      flex: 1 1 20em;
    }
    .label-item {
      margin-bottom: 1em;
      color: darkgrey;
    }
  }
  .answer-box {
    margin-top: 2em;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
