<template>
  <div>
    <a-modal :visible="isVisible" title="Edit" @ok="handleOk" @cancel="onCancel">
      <div class="modal-content">
        <div class="flex-item">
          <label>Question</label>
          <a-textarea v-model:value="modalContent.question" placeholder="Enter Term" />
        </div>
        <div class="flex-item">
          <label>Answer</label>
          <a-textarea v-model:value="modalContent.answer" placeholder="Enter Defination" />
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{ modalContent: API.ICard; isVisible: boolean }>();
const emits = defineEmits(['update:isVisible', 'update:modalContent']);
const { isVisible, modalContent } = toRefs(props);

const handleOk = () => {
  onCancel();
};
const onCancel = () => {
  emits('update:isVisible', false);
};
</script>
<style scoped lang="less">
.modal-content {
  display: flex;
  flex-direction: column;
  gap: 1em 0;
  .flex-item {
    label {
      margin: 0.5em;
    }
  }
}
</style>
