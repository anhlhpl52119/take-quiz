<template>
  <div>
    <div class="header-wrap flex-wrap">
      <a-button @click="onClick">Back</a-button>
      <div>
        <div>
          <a-button
            type="primary"
            @click="onNavigateBack"
            size="large"
            :loading="studyStore.isFetching"
            >Complete Study</a-button
          >
        </div>
      </div>
      <a-button @click="onClick">Next question</a-button>
    </div>
    <div>
      <a-progress stroke-linecap="square" :percent="50" :showInfo="false" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useStudyStore } from './store/useStudyStore';
const studyStore = useStudyStore();
const { terminateSession } = studyStore;
const router = useRouter();

async function onNavigateBack() {
  await terminateSession();
  studyStore.$reset();
  router.go(-1);
}
function onClick() {
  console.log('object');
}
</script>
<style scoped lang="less">
.header-wrap {
  height: @header-height;
  background-color: white;
}
.flex-wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
:deep(.ant-progress-inner) {
  height: 3px;
}
</style>
