<template>
  <div>
    <a-modal
      :visible="display"
      :confirm-loading="isFetching"
      :maskClosable="false"
      :closable="false"
      @ok="handleOk"
      @cancel="onCancel"
    >
      <template #title>
        <h3>Setup your Test</h3>
      </template>
      <div class="modal-content">
        <div class="content-item">
          <label
            >Test Time
            <span style="color: darkgray; font-size: 10px"
              >(10 mins ~ 90 mins)</span
            ></label
          >
          <!-- TODO: add icon for input -->
          <a-input-number
            style="width: 12em"
            v-model:value="configStore.execution_time"
            :keyboard="true"
            :min="10"
            :max="90"
            addon-after="Mins"
          />
        </div>
        <div class="content-item">
          <label>Number of questions</label>
          <!-- TODO: add icon for input -->
          <a-input-number
            style="width: 12em"
            v-model:value="configStore.question_count"
            :keyboard="true"
            :min="1"
            :max="100"
            addon-after="Questions"
          />
        </div>
        <!-- TODO: for future, don't clear -->
        <!-- <div class="content-item">
          <label>Answer with</label>
          <a-select ref="select" v-model:value="formState.answerType" style="width: 120px">
            <a-select-option value="term">Term</a-select-option>
            <a-select-option value="defination" disabled>Defination</a-select-option>
            <a-select-option value="both">Both</a-select-option>
          </a-select>
        </div> -->
        <a-divider style="height: 2px"></a-divider>
        <!-- TODO: for future, don't clear -->
        <!-- <div class="content-item">
          <label>True & False</label>
          <a-switch
            v-model:checked="formState.checked1"
            checked-children="Yes"
            un-checked-children="No"
          />
        </div>
        <div class="content-item">
          <label>Multiple questions</label>
          <a-switch
            v-model:checked="formState.checked2"
            checked-children="Yes"
            un-checked-children="No"
          />
        </div> -->
        <div class="content-item">
          <label>Defination as Question?</label>
          <a-switch
            v-model:checked="configStore.definition_as_question"
            checked-children="Yes"
            un-checked-children="No"
          />
        </div>
        <div class="content-item">
          <label>Question Type</label>
          <a-select
            ref="select"
            v-model:value="configStore.question_type"
            style="width: 120px"
          >
            <a-select-option :value="ESessionQuestionType.TrueFalseType"
              >True False</a-select-option
            >
            <a-select-option :value="ESessionQuestionType.FourAnswer"
              >Multiple</a-select-option
            >
            <!-- TODO: value = undefine mean both Multiple and TrueFalse -->
            <a-select-option :value="11" disabled>Both</a-select-option>
          </a-select>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { useTestStore } from './store/useTestStore';
import { ESessionQuestionType } from '@/apis/workplace';
const testSessionStore = useTestStore();
const { isFetching } = toRefs(testSessionStore);
const router = useRouter();
const props = defineProps<{ display: boolean }>();
const { display } = toRefs(props);

const configStore = useTestStore().configModal.configs;

const emits = defineEmits(['update:display']);

function onCancel() {
  router.go(-1);
}

const handleOk = async () => {
  await testSessionStore.loadTestSession();
  emits('update:display', false);
};
</script>
<style scoped lang="less">
.modal-content {
  display: flex;
  flex-direction: column;
  gap: 1.2em;
  .content-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
:deep(.ant-divider-horizontal) {
  margin: 1em 0;
}
</style>
