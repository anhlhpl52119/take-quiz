<template>
  <div>
    <a-modal
      :visible="isVisible"
      width="500px"
      title="Basic Modal"
      @ok="handleOk"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
/** Store */
//const store = useStore();

/** Props & Emit */
const props = defineProps<{ isVisible: boolean }>();
const { isVisible } = toRefs(props);
const emits = defineEmits(['update:isVisible']);

/** Data */

/** Method */
function coloseModal() {
  emits('update:isVisible', false);
}
function handleOk() {
  console.log('ok');
  coloseModal();
}
</script>
<style scoped></style>
