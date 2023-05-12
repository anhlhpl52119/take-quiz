<template>
  <div @click="onClick" class="icon-wrap">
    <StarFilled
      v-if="value"
      :style="{
        color: '#ffd859',
      }"
    />
    <StarOutlined v-else />
  </div>
</template>
<script lang="ts" setup>
import { StarOutlined, StarFilled } from '@ant-design/icons-vue';

/** Store */
//const store = useStore();

/** Props & Emit */
const props = defineProps<{ value: boolean }>();
const { value } = toRefs(props);
const emits = defineEmits(['update:value']);

/** Data */

/** Method */
function onClick() {
  emits('update:value', !value.value);
}
</script>
<style scoped lang="less">
.icon-wrap {
  display: inline-block;
  transition: background-color 0.25s;
  height: 2em;
  width: 2em;
  padding: 0.25em;
  border-radius: 50%;
  &:hover {
    background-color: rgba(117, 139, 93, 0.15);
    cursor: pointer;
  }
}
</style>
