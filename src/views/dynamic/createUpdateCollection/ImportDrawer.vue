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
        ref="refEvent"
        id="textbox"
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

const refEvent = ref<HTMLTextAreaElement | null>(null);
const symbolTab = '\t';
const SymbolNewLine = '\n';
const placeHolder = `Word 1${symbolTab}Defination 1${SymbolNewLine}Word 2${symbolTab}Defination 2${SymbolNewLine}Word 3${symbolTab}Defination 3${SymbolNewLine}`;
const inputValue = ref<string>('');

const onClose = () => {
  emit('update:isVisible', false);
};
</script>