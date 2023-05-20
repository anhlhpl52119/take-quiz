<template>
  <a-card hoverable>
    <span
      style="position: absolute; bottom: 5px; color: darkgrey; font-size: 11px"
      ><i>Lastest: {{ dayjs(created_at).format('DD/MM/YYYY') }}</i></span
    >
    <template #cover>
      <img alt="example" :src="imgRandomUrl" style="height: 150px" />
    </template>
    <template #extra> </template>
    <a-card-meta :title="name" :description="description">
      <template #avatar>
        <a-avatar src="https://avatars0.githubusercontent.com/u/33479836?v=4" />
      </template>
    </a-card-meta>
    <br />
    <div
      style="
        display: flex;
        gap: 0 0.5em;
        justify-content: space-between;
        align-items: center;
      "
    >
      <a-dropdown :trigger="['click']" placement="top">
        <div class="icon-wrap">
          <SettingOutlined style="font-size: 1.5em" />
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item key="edit">
              <a-button @click="onUpdateCollection(id)" block
                >Edit <template #icon><EditFilled></EditFilled></template
              ></a-button>
            </a-menu-item>
            <a-menu-divider />

            <a-menu-item key="delete">
              <a-button
                danger
                @click.prevent="onDelete"
                :loading="onDirectLoading"
                block
                >Delete
                <template #icon><DeleteOutlined></DeleteOutlined></template
              ></a-button>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-button size="large" @click="onLearn" :loading="onDirectLoading"
        >Learn</a-button
      >
    </div>
  </a-card>
</template>
<script lang="ts" setup>
import { createVNode } from 'vue';
import dayjs from 'dayjs';
import {
  ExclamationCircleOutlined,
  SettingOutlined,
  DeleteOutlined,
  EditFilled,
} from '@ant-design/icons-vue';
import { Modal, message } from 'ant-design-vue';
import { RouteName } from '@/enums/routesEnum';
import { deleteCollection } from '@/apis/workplace';
const emits = defineEmits(['delete']);
const router = useRouter();
const props = defineProps<{ data: API.ICollection; deleted?: boolean }>();
const { description, name, created_at, id } = toRef(props, 'data').value;
const onDirectLoading = ref<boolean>(false);

const imgURLs = [
  'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG1pbmltYWwlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
  'https://images.unsplash.com/photo-1679881631944-38888f7aac81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHw%3D&w=1000&q=80',
  'https://images.unsplash.com/photo-1636728682521-5bf9a2c4f533?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80',
  'https://media.istockphoto.com/id/1463086638/photo/abstract-background-with-smooth-wavy-shapes-in-cold-colors.jpg?b=1&s=170667a&w=0&k=20&c=nCWTAp8U-QQbOduAPnNI4EnqL0DkWbIHWa0Eg-Vlk_s=',
  'https://wallpaperaccess.com/full/178365.jpg',
  'https://images.unsplash.com/photo-1679931974874-77efab50038e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NHx8fGVufDB8fHx8&w=1000&q=80',
  'https://img.freepik.com/free-vector/microchip-processor-background-realistic-design_52683-58315.jpg?w=360',
];
const imgRandomUrl = computed<string>(() => {
  return imgURLs[Math.floor(Math.random() * imgURLs.length)];
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
const onLearn = () => {
  onDirectLoading.value = true;
  setTimeout(() => {
    router.push({ name: RouteName.CollectionDetails, params: { id } });
    onDirectLoading.value = false;
  });
};
</script>
<style scoped lang="less">
.icon-wrap {
  display: inline-block;
  transition: background-color 0.25s;
  height: 2.5em;
  width: 2.5em;
  padding: 0.5em;
  border-radius: 50%;
  &:hover {
    background-color: rgba(76, 76, 76, 0.15);
    cursor: pointer;
  }
}
</style>
