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
        <h3>Setup your learning set</h3>
      </template>
      <div class="modal-content">
        <div class="content-item">
          <label>Number of questions</label>
          <a-input-number
            style="width: 12em"
            v-model:value="setupConfig.question_count"
            :keyboard="true"
            :min="1"
            :max="100"
            addon-after="Questions"
          />
        </div>

        <a-divider style="height: 2px"></a-divider>

        <div class="content-item">
          <label>Defination as Question?</label>
          <a-switch
            v-model:checked="setupConfig.definition_as_question"
            checked-children="Yes"
            un-checked-children="No"
          />
        </div>
        <div class="content-item">
          <label>Question Type</label>
          <a-select ref="select" v-model:value="setupConfig.question_type" style="width: 120px">
            <a-select-option :value="ESessionQuestionType.TrueFalseType"
              >True False</a-select-option
            >
            <a-select-option :value="ESessionQuestionType.FourAnswer">Multiple</a-select-option>
          </a-select>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { useStudyStore } from './store/useStudyStore';
import { ESessionQuestionType } from '@/apis/workplace';

//Store
const studyStore = useStudyStore();
const { setupStudy } = useStudyStore();
const { isFetching } = toRefs(studyStore);

//Props & Emit
const props = defineProps<{ display: boolean }>();
const { display } = toRefs(props);

const emits = defineEmits(['update:display']);

//Data
const router = useRouter();
const setupConfig: API.IStudySetupParams['configs'] = studyStore.studysetupConfig.configs;

function onCancel() {
  router.go(-1);
}

async function handleOk() {
  await setupStudy();
  emits('update:display', false);
}
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
