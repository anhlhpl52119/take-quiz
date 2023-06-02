<template>
  <svg v-bind="$attrs" class="svg-icon" :style="getStyle" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts" setup>
import { computed, type CSSProperties } from 'vue';
interface PropsType {
  name: string;
  size?: [number, string];
}
const props = defineProps<PropsType>();
const symbolId = computed(() => `#svg-icon-${props.name}`);
const getStyle = computed((): CSSProperties => {
  const { size } = props;
  const s = `${size}`.replace('px', '').concat('px');
  return {
    width: s,
    height: s,
  };
});
</script>

<style lang="less">
.svg-icon {
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}
</style>
