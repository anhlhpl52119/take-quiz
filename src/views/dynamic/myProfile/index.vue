<template>
  <div>
    <div class="user-info-flex justify-item">
      <div class="user-info-flex">
        <a-avatar :size="64">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <ul>
          <li class="info"><span>hunganh@gmail.com</span></li>
          <li class="info"><span style="color: rgb(167 165 165)">Lam Hung Anh</span></li>
        </ul>
      </div>
      <div class="user-info-flex btn-gap">
        <a-button>
          Edit profile
          <template #icon> <EditOutlined></EditOutlined> </template
        ></a-button>
        <a-button @click="onClickChangePass"
          >Change Password <template #icon> <KeyOutlined></KeyOutlined> </template
        ></a-button>
      </div>
    </div>
    <div class="tab-option">
      <TabOption></TabOption>
    </div>
    <template>
      <ModalChangePassword v-model:is-visible="modalvisible.changePass"></ModalChangePassword>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { UserOutlined, KeyOutlined, EditOutlined } from '@ant-design/icons-vue';
import TabOption from './TabOption.vue';
const ModalChangePassword = defineAsyncComponent(
  () => import('@/components/basic/ModalChangePassword.vue')
);
/** Store */
//const store = useStore();

/** Props & Emit */

/** Data */
const modalvisible = reactive({
  changePass: false,
});
/** Method */
function onClickChangePass() {
  modalvisible.changePass = true;
}
</script>
<style scoped lang="less">
.user-info-flex {
  display: flex;
  align-items: center;
  ul {
    list-style: none;
    margin: 0;
    padding-left: 1em;
  }
  .info {
    font-weight: 900;
  }
}
.justify-item {
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1em 0;
}
.btn-gap {
  gap: 1em;
}
.tab-option {
  margin-top: 1.5em;
}
</style>
