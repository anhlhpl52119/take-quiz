<template>
  <div>
    <a-card size="small" class="box-shadow">
      <template #title>
        <strong>{{ index }}</strong>
      </template>
      <template #extra v-if="!isActiveDelete">
        <DeleteOutlined
          class="delete-icon"
          :class="{ 'active-delete': isActiveDelete }"
          @click="$emit('delete', data.id)"
        ></DeleteOutlined>
      </template>
      <template>
        <div></div>
      </template>
      <div class="card-content">
        <div class="flex-item" style="">
          <a-textarea
            v-model:value="data.question"
            :autoSize="sizingInputAera"
            placeholder="Enter Term"
          />
        </div>
        <div class="flex-item">
          <a-textarea
            v-model:value="data.answer"
            :autoSize="sizingInputAera"
            placeholder="Enter Defination"
          />
        </div>
      </div>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import { DeleteOutlined } from '@ant-design/icons-vue';
type ICards = Pick<API.ICard, 'id' | 'question' | 'answer'>;
const props = defineProps<{
  data: ICards;
  isActiveDelete: boolean;
  index: number;
}>();
const { data, isActiveDelete } = toRefs(props);

const sizingInputAera = readonly({ minRows: 2, maxRows: 6 });
</script>

<style scoped lang="less">
.active-delete {
  pointer-events: none;
  opacity: 0.5;
}
.delete-icon {
  font-size: 1.2em;
  transition: 0.2s;
  color: #ff4d4f;
  &:hover {
    color: #ff4d4f;
    filter: drop-shadow(2px 3px 3px rgba(162, 93, 93, 0.9));
  }
}
.card-content {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  min-height: 2.5em;
  .flex-item {
    flex: 1 1 300px;
    width: 300px;
    position: relative;
    box-sizing: content-box;
    ._item {
      position: absolute;
      z-index: 1;
      transition: 2s;
      transform: translateY(-40px);
    }
  }
}
</style>
