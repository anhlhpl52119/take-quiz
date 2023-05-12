<template>
  <div>
    <a-modal
      :visible="isVisible"
      title="Cards option"
      :confirm-loading="isFetching"
      :closable="false"
      @ok="handleOk"
      @cancel="coloseModal"
    >
      <div class="content-item">
        <label>Cards is star?</label>
        <a-switch
          v-model:checked="isLoadFavoriteCards"
          checked-children="Yes"
          un-checked-children="No"
        />
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { useCardsStore } from './store/useCardsStore';
/** Store */
const cardsStore = useCardsStore();
const { isFetching } = toRefs(cardsStore);
const { loadCardsOfCollection } = useCardsStore();

/** Props & Emit */
const props = defineProps<{ isVisible: boolean }>();
const { isVisible } = toRefs(props);
const emits = defineEmits(['update:isVisible']);

/** Data */
const isLoadFavoriteCards = ref(false);
const route = useRoute();

/** Method */
function coloseModal() {
  emits('update:isVisible', false);
}
async function handleOk() {
  const collectionId = route.params.id as string;
  await loadCardsOfCollection(collectionId, isLoadFavoriteCards.value);
  coloseModal();
}
</script>
<style scoped lang="less">
.content-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
