<template>
  <div>
    <a-modal
      :visible="isVisible"
      width="700px"
      title="Test Histories"
      @ok="handleOk"
      @cancel="closeModal"
      style="top: 2em"
    >
      <div v-if="data.length === 0">No Study Histories</div>
      <div v-else class="body-modal">
        <div v-for="item in data" :key="item.id" class="item-container box-shadow">
          <ul class="result-items">
            <li><strong>Date: </strong> {{ dayjs(item.created_at).format('DD-MM-YYYY') }}</li>
            <li><strong>Total questions: </strong> {{ item.results.total_question }}</li>
            <li><strong>Total answers: </strong> {{ item.results.total_answer }}</li>
            <li><strong>Correct answers: </strong> {{ item.results.total_success_answer }}</li>
          </ul>
          <a-progress
            type="circle"
            :percent="resultPercent(item.results.total_question, item.results.total_success_answer)"
            :width="70"
          />
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';
// import type { ITestSession } from '@/apis/workplace';
const props = defineProps<{ isVisible: boolean; data: API.ITestSession[] }>();
const { isVisible, data } = toRefs(props);

const emits = defineEmits(['update:isVisible']);
function resultPercent(total: number, success: number): number {
  return Math.round((success / total) * 100);
}
function closeModal() {
  emits('update:isVisible', false);
}
function handleOk() {
  closeModal();
}
</script>
<style scoped lang="less">
.body-modal {
  max-height: 500px;
  overflow: scroll;
  overflow-x: hidden;
}
.item-container {
  border-radius: 0.8em;
  margin: 0.5em;
  display: flex;
  padding: 0.5em;
  justify-content: space-between;
  align-items: center;
  .result-items {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
</style>
