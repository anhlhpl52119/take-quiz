<template>
  <div class="wrapper box-shadow flex-wrapper" v-if="data">
    <div class="question-box">
      <section class="label">
        <div>Question:</div>
      </section>
      <section class="question-content">
        <div>{{ data.questions.question }}</div>
      </section>
    </div>
    <div class="answer-box">
      <section class="label">
        <div>Select the correct:</div>
      </section>
      <section class="answer-option">
        <a-radio-group
          v-model:value="userAnswer"
          @change="onUserAnsChange"
          style="width: 100%"
        >
          <a-row :gutter="[16, 16]">
            <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
              <a-radio :style="radioStyle" :value="answerOption[0]"
                ><span style="font-size: 20px">{{ answerOption[0] }}</span>
              </a-radio>
            </a-col>
            <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
              <a-radio :style="radioStyle" :value="answerOption[1]"
                ><span style="font-size: 20px">{{
                  answerOption[1]
                }}</span></a-radio
              >
            </a-col>
            <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
              <a-radio :style="radioStyle" :value="answerOption[2]"
                ><span style="font-size: 20px">{{
                  answerOption[2]
                }}</span></a-radio
              >
            </a-col>
            <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
              <a-radio :style="radioStyle" :value="answerOption[3]"
                ><span style="font-size: 20px">{{
                  answerOption[3]
                }}</span></a-radio
              >
            </a-col>
          </a-row>
        </a-radio-group>
      </section>
    </div>
  </div>
</template>
<script lang="ts" setup>
/** Store */
//const store = useStore();

/** Props & Emit */
const props = defineProps<{ data: API.IStudyCard }>();
const { data } = toRefs(props);
//const emits =defineEmits(['emit']);

/** Data */
const userAnswer = ref<string>();
const radioStyle = reactive({
  padding: '0.5em',
  border: '1px solid darkgray',
  borderRadius: '1em',
  overflow: 'wrap',
  overflowWrap: 'break-word',
  width: '100%',
});
const answerOption = computed(() => {
  return data.value.answers.answer_list;
});

/** Method */
function onUserAnsChange() {}
</script>
<style scoped lang="less">
.wrapper {
  min-height: 25em;
  padding: 1.5em;
  border-radius: 1em;
  background-color: white;
}
.flex-wrapper {
  display: flex;
  flex-direction: column;
  .question-box {
    flex: 1 1 2em;
  }
  .answer-box {
    flex: 1 1 9em;
    .answer-option {
      //   top: 30%;
      //   width: 100%;
    }
  }
  .label {
    margin-bottom: 1em;
  }
}
</style>
