<template>
  <div>
    <a-form :model="collectionInfo" name="basic" autocomplete="off" @finish="onFinish">
      <header class="fixed-header-tool flex-50">
        <h2>{{ pageContent.pageTitle }}</h2>
        <a-button type="primary" size="large" :loading="isLoading" html-type="submit">{{
          pageContent.submitButton
        }}</a-button>
      </header>
      <section class="tool-bar flex-50">
        <div>
          <a-button @click="visibleState.ImportDrawer = true" size="large" :disabled="true"
            ><template #icon>
              <PlusOutlined></PlusOutlined>
            </template>
            Import
          </a-button>
        </div>
        <div><SettingOutlined style="font-size: 1.5em"></SettingOutlined></div>
      </section>

      <section class="material-content flex-content">
        <div class="collection-info">
          <a-form-item
            name="name"
            :rules="[{ required: true, message: 'Collection title is required!' }]"
          >
            <a-input
              id="title-collection"
              :bordered="false"
              v-model:value="collectionInfo.name"
              placeholder="Collection title"
            />
            <label for="title-collection">Title</label>
          </a-form-item>

          <a-form-item name="description">
            <a-input
              id="description-collection"
              :bordered="false"
              v-model:value="collectionInfo.description"
              placeholder="Description for this collection"
            />
            <label for="description-collection">Description</label>
          </a-form-item>
        </div>
        <TransitionGroup name="fade" tag="div" class="material-content">
          <template v-for="(item, index) in cardsInCollection" :key="item.id">
            <MaterialCardContent
              :index="index + 1"
              :data="item"
              :is-active-delete="cardsInCollection.length <= 1"
              @delete="onDelete"
            ></MaterialCardContent>
          </template>
        </TransitionGroup>
        <div ref="refsContent" @click="onAddItem" class="new-content-btn box-shadow">
          <span class="hover-underline-animation">Add Card</span>
        </div>
      </section>
    </a-form>
    <div ref="refsContent" style="margin-top: 10px; height: 20px"></div>
    <template
      ><ImportDrawer v-model:is-visible="visibleState.ImportDrawer"></ImportDrawer
    ></template>
  </div>
</template>
<script lang="ts" setup>
import { PlusOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { v4 as uuidv4 } from 'uuid';
import MaterialCardContent from './MaterialCardContent.vue';
import { useWorkplaceApi } from '@/composable/mock/useWorkplaceApi';
import { RouteName } from '@/enums/routesEnum';

export interface IMyArray {
  id: string;
  term: string;
  definition: string;
}
interface PageContentText {
  pageTitle: string;
  submitButton: string;
}
const route = useRoute();
const pageContent = computed<PageContentText>(() => {
  if (route.name === RouteName.UpdateCollection) {
    return { pageTitle: `Update collection`, submitButton: 'Save Change', isUpdate: true };
  } else {
    return { pageTitle: `Create new collection`, submitButton: 'Create', isUpdate: false };
  }
});
const props = defineProps<{ collectionId?: string }>();
const { collectionId } = toRefs(props);
onMounted(async () => {
  if (collectionId?.value) {
    const [collection, cards] = await Promise.all([
      loadCollectionById(collectionId.value),
      loadCardsOfCollection(collectionId.value),
    ]);
    collectionInfo.name = collection.name;
    collectionInfo.description = collection.description;
    const _rs2 = cards.map((m) => {
      return {
        id: m.id,
        term: m.question,
        definition: m.answer,
      };
    });
    cardsInCollection.value = _rs2;
  } else {
    cardsInCollection.value.push({
      id: uuidv4(),
      term: '',
      definition: '',
    });
  }
});
const ImportDrawer = defineAsyncComponent(() => import('./ImportDrawer.vue'));
const refsContent = ref<HTMLElement>();
const {
  createNewCollectionAndCards,
  loadCardsOfCollection,
  loadCollectionById,
  onUpdateAllCollectionDatas,
  isLoading,
} = useWorkplaceApi();
const visibleState = reactive({
  ImportDrawer: false,
});
const newItems = ref<IMyArray[]>([]);
const collectionInfo = reactive<API.ICollectionCreateData>({ name: '', description: '' });
const cardsInCollection = ref<IMyArray[]>([]);

const submitionCards = computed<API.ICardCreateParams[]>(() => {
  return cardsInCollection.value.map((card) => {
    return { answer: card.term, question: card.definition };
  });
});

const submitOldCards = computed<API.ICardUpdateParams[]>(() => {
  return cardsInCollection.value.map((card) => {
    return { answer: card.term, question: card.definition, id: card.id };
  });
});

//newCards
const submitionNewCards = computed<API.ICardCreateParams[]>(() => {
  return newItems.value.map((card) => {
    return { answer: card.term, question: card.definition };
  });
});
function onAddItem() {
  const newItem = {
    id: uuidv4(),
    term: '',
    definition: '',
  };
  cardsInCollection.value.push(newItem);
  newItems.value.push(newItem);
  setTimeout(() => {
    refsContent.value?.scrollIntoView({ behavior: 'smooth' });
  }, 0.3);
}
function onDelete(deleteId: string) {
  const removeIndex = cardsInCollection.value.findIndex((obj) => {
    return obj.id === deleteId;
  });
  cardsInCollection.value.splice(removeIndex, 1);
}
async function onUpdateAllCollection() {
  await onUpdateAllCollectionDatas(
    collectionId?.value!,
    collectionInfo,
    submitOldCards.value,
    submitionNewCards.value
  );
}

async function onCreateNewCollection() {
  await createNewCollectionAndCards(collectionInfo, submitionCards.value);
}
function onFinish() {
  if (route.name === RouteName.CreateStudySet) {
    onCreateNewCollection();
  } else {
    onUpdateAllCollection();
  }
}
</script>
<style scoped lang="less">
.fixed-header-tool {
  justify-content: space-between;
}
.tool-bar {
  margin: 1em 0;
  justify-content: space-between;
  align-items: center;
}
.material-content {
  margin: 2em 0;
  display: flex;
  flex-direction: column;
  gap: 1em 0;
  .new-content-btn {
    height: 4em;
    background-color: #3a6f43d1;
    border-radius: 10px;
    cursor: pointer;
    position: relative;
    transition: 0.3s;
    color: white;
    &:active {
      transform: translateY(5px);
    }
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: bold;
    }
  }
}
.collection-info {
  width: 50%;
  padding-left: 0.5em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  #title-collection,
  #description-collection {
    font-size: 18px;
    padding: 0;
    font-weight: 900;
  }
  label {
    font-size: small;
    color: #bfbfbf;
  }
}
.hover-underline-animation {
  display: inline-block;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 3px;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }
  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
}
</style>
