<template>
  <a-drawer
    placement="top"
    height="100%"
    :closable="false"
    :visible="isVisible"
    @close="onClose"
  >
    <template #title>
      <h3 @click="onClose" style="cursor: pointer">Import Data</h3>
    </template>
    <template #extra>
      <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
      <a-button type="primary" @click="onClose">Submit</a-button>
    </template>
    <section>
      <a-textarea
        ref="textAreaRefs"
        id="ta-test"
        v-model:value="inputValue"
        :placeholder="placeHolder"
        :rows="8"
      />
    </section>
  </a-drawer>
</template>
<script lang="ts" setup>
const props = defineProps<{ isVisible: boolean }>();
const { isVisible } = toRefs(props);
const emit = defineEmits(['update:isVisible']);
onMounted(async () => {
  const a = document.getElementById('ta-test');
  console.log(a);
  a?.addEventListener('keydown', (e) => {
    if (e.key == 'Tab') {
      e.preventDefault();
      // inputValue.value = inputValue.value + '\t';
      inputValue.value = inputValue.value.substring(0);
    }
  });
});
onUnmounted(() => {});
const textAreaRefs = ref<HTMLTextAreaElement | null>();
const symbolTab = '\t';
const SymbolNewLine = '\n';
const placeHolder = `Word 1${symbolTab}Defination 1${SymbolNewLine}Word 2${symbolTab}Defination 2${SymbolNewLine}Word 3${symbolTab}Defination 3${SymbolNewLine}`;
const inputValue = ref<string>('');

const onClose = () => {
  emit('update:isVisible', false);
};
</script>
<style>
#ta-test {
  -moz-tab-size: 8;
  -o-tab-size: 8;
  tab-size: 8;
}
</style>
