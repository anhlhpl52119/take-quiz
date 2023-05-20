<template>
  <div>
    <a-card class="box-shadow" draggable="false" size="small" hoverable>
      <template #title>
        <div>
          <h3>{{ name }}</h3>
          <text>{{ description }}</text>
        </div>
      </template>
      <template #extra>
        <a-tag :color="tagCal?.color">
          {{ tagCal?.text }}
        </a-tag>
      </template>
      <div class="btn-card">
        <a-button danger @click.prevent="onDelete" :loading="onDirectLoading"
          >Delete</a-button
        >
        <a-button @click="onUpdateCollection(id)">Edit</a-button>
        <a-button @click="onClick" :loading="onDirectLoading">Learn</a-button>
      </div>
    </a-card>
  </div>
</template>
<script lang="tsx" setup>
import { createVNode } from 'vue';
import {
  ExclamationCircleOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from '@ant-design/icons-vue';
import { Modal, message } from 'ant-design-vue';
import { RouteName } from '@/enums/routesEnum';
import { ECollectionStatus, deleteCollection } from '@/apis/workplace';
const emits = defineEmits(['delete']);
const router = useRouter();
const props = defineProps<{ data: API.ICollection; deleted?: boolean }>();
const { description, name, status, id } = toRef(props, 'data').value;
const onDirectLoading = ref<boolean>(false);
const tagCal = computed(() => {
  switch (status) {
    case ECollectionStatus.DELETED:
      return { color: '#cd201f', icon: <YoutubeOutlined />, text: 'Deleted' };
    case ECollectionStatus.ACTIVE:
      return { color: '#55acee', icon: <TwitterOutlined />, text: 'Active' };
  }
});
function onUpdateCollection(collectionId: string) {
  router.push({
    name: RouteName.UpdateCollection,
    params: { id: collectionId },
  });
}
async function onDelete() {
  Modal.confirm({
    title: 'Do you Want to delete this collection?',
    icon: createVNode(ExclamationCircleOutlined),
    content: createVNode(
      'div',
      { style: 'color:red;' },
      'This action will be remove your collection and all cards in side!'
    ),
    async onOk() {
      try {
        await deleteCollection(id);
        emits('delete', id);
        message.success({ content: 'Deleted', duration: 1 });
      } catch (error) {
        message.error({ content: 'Delete failed', duration: 1 });
      }
    },
    okType: 'danger',
    okText: 'Yes, delete it!',
  });
}
const onClick = () => {
  onDirectLoading.value = true;
  setTimeout(() => {
    router.push({ name: RouteName.CollectionDetails, params: { id } });
    onDirectLoading.value = false;
  });
};
</script>
<style scoped>
.btn-card {
  display: flex;
  gap: 1em;
  justify-content: end;
}
</style>
