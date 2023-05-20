<template>
  <div class="header-wrap flex-wrap">
    <a-button @click="onNavigateBack">Back to collection</a-button>
    <div>
      <div v-if="!testStore.visibleResult">
        <span v-if="isPrepare"><h2>Time remain</h2></span>
        <a-statistic-countdown
          v-else
          :value="deadline"
          :format="format"
          @finish="submitAnswers"
        >
        </a-statistic-countdown>
      </div>
    </div>
    <div>
      <a-button
        v-if="!testStore.visibleResult"
        type="primary"
        @click="submitAnswers"
        :loading="testStore.isFetching"
        >Submit</a-button
      >
      <a-button v-else type="primary" @click="onRetest">Retake Test</a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useTestStore } from './store/useTestStore';
const { submitAnswers, resetCards } = useTestStore();
const testStore = useTestStore();
const router = useRouter();
// const excuteTime = useTestStore().getExcutionTime;
const _excuteTime = ref<number>();
const format = 'mm:ss';
const deadline = ref(0);
const isPrepare = ref(true);
function onNavigateBack() {
  resetCards();
  router.go(-1);
}
function onRetest() {
  router.go(0);
}
//TODO: optimize
watch(
  () => testStore.sessionInfo,
  (newVal) => {
    if (newVal) {
      // console.log('watch', excuteTime);
      isPrepare.value = false;
      deadline.value = Date.now() + 1000 * 60 * _excuteTime.value!;
    }
  }
);
watch(
  () => testStore.configModal.configs.execution_time,
  (newVal) => {
    if (newVal) {
      _excuteTime.value = newVal;
    }
  },
  {
    immediate: true,
  }
);
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
</style>
