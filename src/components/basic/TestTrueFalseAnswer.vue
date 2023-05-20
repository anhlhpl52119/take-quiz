<template>
  <div
    class="box-shadow box-wrapper"
    :style="{ backgroundColor: isAnseredColor }"
  >
    <div class="flex-content">
      <div class="flex-item horizon-divider">
        <h5 class="label-item">Term</h5>
        <div>{{ questionExtraction.question }}</div>
      </div>
      <div class="flex-item">
        <h5 class="label-item">Defination</h5>
        <div>{{ questionExtraction.answers }}</div>
      </div>
    </div>
    <div class="answer-box">
      <a-radio-group
        v-model:value="userAnswer"
        button-style="solid"
        @change="onUserAnsChange"
      >
        <a-radio :style="radioStyle" :value="1"
          ><span style="font-size: 20px">True</span>
        </a-radio>
        <a-radio :style="radioStyle" :value="0"
          ><span style="font-size: 20px">False</span></a-radio
        >
      </a-radio-group>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useTestStore } from '@/views/dynamic/testSession/store/useTestStore';
const userAnswered = useTestStore().userAnswered;
const props = defineProps<{ data: API.ITestCards }>();
const { data } = toRefs(props);
interface Question {
  question: string;
  answers: string;
}
const radioStyle = reactive({
  padding: '0.5em',
  border: '1px solid darkgray',
  borderRadius: '1em',
});
const isAnseredColor = computed(() => {
  if (userAnswer.value || userAnswer.value === 0) {
    return '#3a6f4326';
  } else {
    return '';
  }
});
const userAnswer = ref();
function onUserAnsChange() {
  const convertedValue = userAnswer.value === 0 ? false : true;
  const testCardId = data.value.id;
  userAnswered.set(data.value.id, {
    test_card_id: testCardId,
    user_answers: [convertedValue],
  });
}
const questionExtraction = computed<Question>(() => {
  const questionTupple = data.value.questions.question.split(' => ');
  return { question: questionTupple[0], answers: questionTupple[1] };
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

    &:before {
      content: '';
      border: 1px solid #d3d3d3;
      align-self: stretch;
      margin: 0 1em;
    }
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
    justify-content: center;
    // .answer-choice {
    //   display: flex;
    //   flex-wrap: wrap;
    //   justify-content: space-between;
    // }
  }
}

@media screen {
  @media (max-width: 50em) {
    .flex-content {
      flex-direction: column;
    }

    .flex-item {
      flex: auto;
    }
  }
}
</style>
