<template>
  <div>
    <a-tabs class="custom-border" v-model:activeKey="activeKey" size="large">
      <a-tab-pane key="1" tab="Archivements"
        ><div class="tab-content">{{ dayjs().format('DD/MM/YYYY') }}</div></a-tab-pane
      >
      <a-tab-pane key="2" tab="Study Sets">
        <div class="tab-content">
          <StudySets></StudySets> <br /><StudySets></StudySets><br /><StudySets></StudySets>
        </div>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Classes"><div class="tab-content">Content of tab 3</div></a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';

const StudySets = defineAsyncComponent(() => import('./MyStudySets.vue'));
const activeKey = ref('1');
</script>
<style scoped lang="less">
:deep(.ant-tabs-nav-wrap) {
  border-bottom: 1px solid #d5d5d5;
}
.tab-content {
  padding: 0.5em;
}
</style>
