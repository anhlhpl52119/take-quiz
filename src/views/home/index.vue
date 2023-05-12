<template>
  <div>
    <section class="colection">
      <h3 class="poiner">Học phần</h3>
      <a-row :gutter="[16, 16]">
        <a-col
          v-for="collection in activeCollection"
          :key="collection.id"
          :xs="24"
          :sm="24"
          :md="12"
          :lg="8"
          :xl="8"
        >
          <TransitionGroup name="fade" tag="div" class="material-content">
            <CardStudySetPiC
              class="box-shadow"
              :data="collection"
              @delete="onDeletedCollection"
            ></CardStudySetPiC> </TransitionGroup
        ></a-col>
      </a-row>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { useWorkplaceApi } from '@/composable/mock/useWorkplaceApi';
// import CardStudySet from '@/components/basic/CardStudySet.vue';
import CardStudySetPiC from '@/components/basic/CardStudySetWithPic.vue';
import { ECollectionStatus } from '@/apis/workplace';

const { collections, loadCollections } = useWorkplaceApi();
function onDeletedCollection(collectionId: string) {
  const index = collections.value.findIndex((item) => {
    return item.id === collectionId;
  });
  collections.value[index].status = ECollectionStatus.DELETED;
  // collections.value = collections.value.filter((item) => {
  //   return item.id !== collectionId;
  // });
}
// const deletedCollections = computed<API.ICollection[] | []>(() => {
//   if (collections.value) {
//     return collections.value.filter((item) => {
//       return item.status === ECollectionStatus.DELETED;
//     });
//   } else {
//     return [];
//   }
// });

const activeCollection = computed<API.ICollection[] | []>(() => {
  if (collections.value) {
    return collections.value.filter((item) => {
      return item.status === ECollectionStatus.ACTIVE;
    });
  } else {
    return [];
  }
});

loadCollections();
</script>
<style scoped lang="less">
.poiner {
  cursor: pointer;
  margin-bottom: 1em;
}
.colection {
  // margin: 1em 0;
  padding-bottom: 2em;
}
.deleted-collection {
  margin-top: 2em;
}
.collection-flex {
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  flex-wrap: nowrap;
}
.dragme {
  cursor: grab;
  &:hover {
    color: red;
  }
  &:active {
    cursor: grabbing;
  }
}
</style>
