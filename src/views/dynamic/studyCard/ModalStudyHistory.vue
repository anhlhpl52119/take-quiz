<template>
  <div>
    <a-modal
      :visible="isVisible"
      width="700px"
      title="Study Histories"
      @ok="handleOk"
      style="top: 2em; max-width: 90%"
    >
      <div v-if="data.length === 0">No Study Histories</div>
      <div v-else style="max-height: 500px; overflow: scroll; overflow-x: hidden">
        <div>{{ data }}</div>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
// import type { IStudySession } from '@/apis/workplace';

const props = defineProps<{ isVisible: boolean; data: API.IStudySession[] }>();

const emits = defineEmits(['update:isVisible']);
const { isVisible, data } = toRefs(props);
function coloseModal() {
  emits('update:isVisible', false);
}
function handleOk() {
  coloseModal();
}
</script>
<style scoped></style>
