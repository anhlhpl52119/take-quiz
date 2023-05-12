<template>
  <div>
    <div class="title">
      <a-skeleton
        v-if="isLoading"
        style="width: 1000px"
        size="default"
        :active="isLoading"
        :paragraph="{ rows: 0 }"
      />
      <h2 v-else>{{ currentCollection?.name }}</h2>
    </div>
    <nav>
      <ul class="ul_li-f opt-btn">
        <li>
          <a-button block size="large" @click="onStudy">Study</a-button>
        </li>
        <li>
          <a-button block size="large" @click="onTest">Test</a-button>
        </li>
      </ul>
    </nav>
    <div class="card-wrapper" @click="onFlip">
      <a-spin
        v-if="isLoading"
        tip="Loading..."
        style="width: 100%; position: absolute; top: 50%"
      ></a-spin>
      <FlipCard
        v-else
        class="test_animation"
        style="perspective: 1200px"
        :key="currentCardsIndex"
        :card-data="CardTestComputed"
        v-model:flip="isActiveCardFlip"
      ></FlipCard>
    </div>
    <div class="tool-bar-wrapper">
      <div class="f-tool-bar left-toolbar">
        <a-dropdown placement="topRight" :trigger="['click']">
          <a-button :loading="isFetching" size="large"> History </a-button>
          <template #overlay>
            <a-menu @click="onOpenHistory">
              <a-menu-item key="test"> Test Histories </a-menu-item>
              <a-menu-item key="study"> Learn Histories </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div class="f-tool-bar middle-toolbar">
        <a-button
          @click="onCurrentCardChange(IChangeType.Previous)"
          size="large"
          :disabled="currentCardsIndex === 1"
          ><template #icon> <ArrowLeftOutlined /> </template> Pre</a-button
        >
        <span>{{ currentCardsIndex + 1 }}/{{ cardsInCollection.length }}</span>
        <a-button
          @click="onCurrentCardChange(IChangeType.Next)"
          size="large"
          :disabled="currentCardsIndex === cardsInCollection.length + 1"
          ><template #icon> <ArrowRightOutlined /> </template> Next</a-button
        >
      </div>
      <div class="f-tool-bar right-toolbar">
        <div class="icon-wrap">
          <SettingOutlined @click="onOpenOptionModal" style="font-size: 1.5em" />
        </div>
      </div>
    </div>
    <a-progress
      :stroke-color="{
        '0%': '#108ee9',
        '100%': '#87d068',
      }"
      :percent="percentStatusBar"
    />
    <template>
      <TestHistoryModal
        v-model:is-visible="visibleHistory.testSession"
        :data="testSessions"
      ></TestHistoryModal>
    </template>
    <template>
      <StudyHistoryModal
        v-model:is-visible="visibleHistory.studySession"
        :data="studySessions"
      ></StudyHistoryModal>
    </template>
    <template>
      <CardOptionModal v-model:is-visible="visibleState.optionModal"></CardOptionModal>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { ArrowRightOutlined, ArrowLeftOutlined, SettingOutlined } from '@ant-design/icons-vue';
import FlipCard from './FlipCard.vue';
import { IChangeType, type CardForTemplate } from './types';
import { useStudyCard } from './store/useStudyCard';
import { useCardsStore } from './store/useCardsStore';
import { useWorkplaceApi } from '@/composable/mock/useWorkplaceApi';
import { RouteName } from '@/enums/routesEnum';

const TestHistoryModal = defineAsyncComponent(() => import('./ModalTestHistory.vue'));
const StudyHistoryModal = defineAsyncComponent(() => import('./ModalStudyHistory.vue'));
const CardOptionModal = defineAsyncComponent(() => import('./ModalCardOptions.vue'));
const {
  // loadCardsOfCollection,
  loadCollectionById,
  isLoading,
} = useWorkplaceApi();
const props = defineProps<{ collectionId: string }>();
const {
  isFetching,
  studySessions,
  testSessions,
  loadCollectionStudyHistory,
  loadCollectionTestHistory,
} = useStudyCard();
const cardsStore = useCardsStore();
const { cardsInCollection } = toRefs(cardsStore);
const { loadCardsOfCollection } = cardsStore;
onMounted(async () => {
  loadCardsOfCollection(props.collectionId, false);
  const collecion = await loadCollectionById(props.collectionId);
  currentCollection.value = collecion;
});

const visibleState = reactive({
  testModal: false,
  learnModal: false,
  optionModal: false,
});
const router = useRouter();

const isActiveCardFlip = ref<boolean>(false);
const currentCardsIndex = ref<number>(0);
const currentCollection = ref<API.ICollection>();
const visibleHistory = reactive({
  testSession: false,
  studySession: false,
});
const onFlip = () => {
  isActiveCardFlip.value = !isActiveCardFlip.value;
};
async function onOpenHistory(val: any) {
  switch (val.key) {
    case 'test':
      await loadCollectionTestHistory();
      visibleHistory.testSession = true;
      break;
    case 'study':
      await loadCollectionStudyHistory();
      visibleHistory.studySession = true;
      break;
  }
}
function onTest() {
  visibleState.testModal = true;
  router.push({ name: RouteName.TestSession, params: { id: currentCollection.value?.id } });
}
function onStudy() {
  router.push({ name: RouteName.StudySession, params: { id: currentCollection.value?.id } });
}
function onOpenOptionModal() {
  visibleState.optionModal = true;
}
const cardsMap = computed<CardForTemplate>(() => {
  return Object.assign({}, cardsInCollection.value);
});
watch(
  () => cardsInCollection.value,
  () => {
    currentCardsIndex.value = 0;
  }
);
const percentStatusBar = computed<number>(() => {
  const result = Math.round((currentCardsIndex.value / cardsInCollection.value.length) * 100);
  return result;
});

const CardTestComputed = computed(() => {
  return cardsMap.value[currentCardsIndex.value];
});

const onCurrentCardChange = (ChangeType: IChangeType) => {
  switch (ChangeType) {
    case IChangeType.Next:
      currentCardsIndex.value = (currentCardsIndex.value + 1) % cardsInCollection.value.length;
      isActiveCardFlip.value = false;
      break;
    case IChangeType.Previous:
      if (currentCardsIndex.value <= 0) {
        currentCardsIndex.value = 0;
      } else {
        currentCardsIndex.value = (currentCardsIndex.value - 1) % cardsInCollection.value.length;
      }
      isActiveCardFlip.value = false;
      break;
  }
};
/**
 * Keydown Event Handler
 */
window.addEventListener('keyup', function (event: KeyboardEvent) {
  switch (event.keyCode) {
    case 37: // Left Arrow
      onCurrentCardChange(IChangeType.Previous);
      break;
    case 39: //Right Arrow
      onCurrentCardChange(IChangeType.Next);
      break;
    case 32: //space bar
      onFlip();
      break;
    default:
      event.preventDefault();
  }
});
</script>
<style scoped lang="less">
.title {
  margin-bottom: 1em;
}
.card-wrapper {
  position: relative;
  height: 28.125em;
  width: min(100%-2em, 900px);
  margin: auto;
}
.f-tool-bar {
  display: inline-flex;
  align-items: center;
  gap: 0 0.5em;
}
.tool-bar-wrapper {
  margin-top: 1em;
  display: inline-flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  .middle-toolbar {
    flex: 2;
    justify-content: center;
    gap: 0 0.5em;
  }

  .icon-wrap {
    display: inline-block;
    transition: background-color 0.25s;
    height: 2em;
    width: 2em;
    padding: 0.25em;
    border-radius: 50%;
    &:hover {
      background-color: rgba(0, 0, 0, 0.15);
      cursor: pointer;
    }
  }
}
nav {
  margin-bottom: 1rem;
  .opt-btn {
    gap: 0.5em 2em;
    flex-wrap: wrap;
    li {
      flex: 1 1 140px;
      width: 2em;
    }
  }
}
.test_animation {
  transition: transform 0.7s;
  transform-style: preserve-3d;
}
</style>
