<template>
  <div>
    <a-form
      :model="collectionInfo"
      name="basic"
      autocomplete="off"
      @finish="onFinishValidateForm"
    >
      <header class="fixed-header-tool flex-50">
        <h2>{{ pageContent.pageTitle }}</h2>
        <a-button
          type="primary"
          size="large"
          :loading="isFetch.global"
          html-type="submit"
          >{{ pageContent.submitButton }}
        </a-button>
      </header>
      <section class="tool-bar flex-50">
        <div>
          <a-button
            @click="visibleState.ImportDrawer = true"
            size="large"
            :disabled="false"
          >
            <template #icon>
              <PlusOutlined></PlusOutlined>
            </template>
            Import
          </a-button>
        </div>
        <div>
          <SettingOutlined style="font-size: 1.5em"></SettingOutlined>
        </div>
      </section>

      <section class="material-content flex-content">
        <div class="collection-info">
          <a-form-item
            name="name"
            :rules="[
              { required: true, message: 'Collection title is required!' },
            ]"
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
          <template v-for="(item, index) in allCardsCollection" :key="item.id">
            <MaterialCardContent
              :index="index + 1"
              :data="item"
              :is-active-delete="allCardsCollection.length <= 1"
              @delete="onDelete"
            ></MaterialCardContent>
          </template>
        </TransitionGroup>
        <div
          ref="refsContent"
          @click="onAddNewCard"
          class="new-content-btn box-shadow"
        >
          <span class="hover-underline-animation">Add Card</span>
        </div>
      </section>
    </a-form>
    <div ref="refsContent" style="margin-top: 10px; height: 20px"></div>
    <template>
      <ImportDrawer
        v-if="visibleState.ImportDrawer"
        v-model:is-visible="visibleState.ImportDrawer"
      ></ImportDrawer>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { PlusOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { v4 as uuidv4 } from 'uuid';
import MaterialCardContent from './MaterialCardContent.vue';
import { useCreUpdCollection } from './hooks/useCreUpdCollection';
// import ImportDrawer from './ImportDrawer.vue';
import { RouteName } from '@/enums/routesEnum';
const ImportDrawer = defineAsyncComponent(() => import('./ImportDrawer.vue'));

/** InterFace */
interface PageContentText {
  pageTitle: string;
  submitButton: string;
}
type ICards = Pick<API.ICard, 'id' | 'question' | 'answer'>;
type ICollection = Pick<API.ICollection, 'name' | 'description'>;
interface ICardsInCollection {
  newCards: ICards[];
  oldCards: ICards[];
}

/** Hooks */
onMounted(async () => {
  switch (route.name) {
    case RouteName.CreateCollection:
      onAddNewCard(); //init 1 card when create new Collection
      collectionInfo.value = collectionRes.value;
      break;
    case RouteName.UpdateCollection:
      await loadCollectionAndCards(collectionId.value);
      cardsInCollection.oldCards = cardsCollection.value;
      break;
  }
});

/** Props & emit */
const props = defineProps<{
  collectionId: string;
}>();

/** Data */
const NEW_CARD_PREFIX_ID = 'NEW_';
const route = useRoute();
const { loadCollectionAndCards, cardsCollection, collectionRes, isFetch } =
  useCreUpdCollection();

const cardsInCollection = reactive<ICardsInCollection>({
  oldCards: [],
  newCards: [],
});
const collectionInfo = ref<ICollection>({ name: '', description: '' });

const { collectionId } = toRefs(props);
const refsContent = ref<HTMLElement>();
const visibleState = reactive({
  ImportDrawer: false,
});

/** Computed & Watcher */
const pageContent = computed<PageContentText>(() => {
  if (route.name === RouteName.UpdateCollection) {
    return {
      pageTitle: `Update collection`,
      submitButton: 'Save Change',
      isUpdate: true,
    };
  } else {
    return {
      pageTitle: `Create new collection`,
      submitButton: 'Create',
      isUpdate: false,
    };
  }
});
const allCardsCollection = computed<ICards[]>(() => {
  return [...cardsInCollection.oldCards, ...cardsInCollection.newCards];
});

/** Fuction */
function onAddNewCard() {
  const newItem: ICards = {
    id: `${NEW_CARD_PREFIX_ID}${uuidv4()}`,
    question: '',
    answer: '',
  };
  cardsInCollection.newCards.push(newItem);
  //scroll to bottom when new item added
  setTimeout(() => {
    refsContent.value?.scrollIntoView({ behavior: 'smooth' });
    //0.3s = transition time of css varr
  }, 0.3);
}

function onDelete(deleteId: string) {
  if (deleteId.includes(NEW_CARD_PREFIX_ID)) {
    cardsInCollection.newCards = cardsInCollection.newCards.filter((item) => {
      return item.id !== deleteId;
    });
  } else {
    cardsInCollection.oldCards = cardsInCollection.oldCards.filter((item) => {
      return item.id !== deleteId;
    });
  }
}

// async function onUpdateAllCollection() {
//   await onUpdateAllCollectionDatas(
//     collectionId?.value!,
//     collectionInfo,
//     submitOldCards.value,
//     submitionNewCards.value
//   );
// }

// async function onCreateNewCollection() {
//   await createNewCollectionAndCards(collectionInfo, submitionCards.value);

// update collection of

function onFinishValidateForm() {
  console.log('ok');
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
