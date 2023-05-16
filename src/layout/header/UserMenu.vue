<template>
  <div style="cursor: pointer">
    <a-dropdown :trigger="['click']" placement="bottomRight">
      <!-- TODO: change after -->
      <a-badge :count="0">
        <a-avatar size="45" shape="square">
          <template #icon><UserOutlined /></template>
        </a-avatar>
      </a-badge>
      <template #overlay>
        <a-menu @click="onClickMenuItem">
          <div class="avatar-in-menu">
            <a-avatar :size="50" shape="circle">
              <template #icon><UserOutlined /></template>
            </a-avatar>
            <ul>
              <li><span style="font-weight: bold">abc@gmail.com</span></li>
              <li><span>TakeQuizId</span></li>
            </ul>
          </div>
          <a-menu-divider />
          <a-menu-item :key="MenuKey.MyProfile">
            <UserOutlined :style="iconStyle" />
            <span class="menu-label">Hồ sơ</span>
          </a-menu-item>
          <a-menu-item :key="MenuKey.Setting">
            <SettingOutlined :style="iconStyle" />
            <span class="menu-label">Cài đặt</span>
          </a-menu-item>

          <a-menu-divider />
          <a-menu-item :key="MenuKey.AboutUs"
            ><span class="menu-label">Về chúng tôi</span>
          </a-menu-item>
          <a-menu-item :key="MenuKey.SendFeedback"
            ><span class="menu-label">Gửi phản hồi cho chúng tôi</span>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item
            :key="MenuKey.Logout"
            style="text-align: center; padding: 0.5em"
            ><span class="menu-label logout">Đăng xuất</span></a-menu-item
          >
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script lang="ts" setup>
import { UserOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { RouteName } from '@enum/routesEnum';
import type { MenuProps } from 'ant-design-vue';
import { useUserAuth } from '@/stores/userAuthen';

enum MenuKey {
  MyProfile,
  Setting,
  Logout,
  SendFeedback,
  AboutUs,
}
const iconStyle = readonly({
  fontSize: '19px',
  fontWeight: 900,
  marginRight: '0.6em',
});
const router = useRouter();
const authStore = useUserAuth();
const onClickMenuItem: MenuProps['onClick'] = (e) => {
  switch (e.key) {
    case MenuKey.MyProfile:
      router.push({ name: RouteName.MyProfile });
      break;
    case MenuKey.Setting:
      router.push({ name: RouteName.MyProfile });
      break;
    case MenuKey.Logout:
      authStore.doLogout();
      router.push({ name: RouteName.LoginPage });
      break;
    case MenuKey.SendFeedback:
      router.push({ name: RouteName.MyProfile });
      break;
  }
};
</script>
<style scoped lang="less">
.avatar-in-menu {
  margin: 0.5em 1em;
  display: flex;
  align-items: center;
  overflow: hidden;
  ul {
    list-style: none;
    font-size: 12px;
    padding-left: 1em;
  }
}
:deep(.ant-dropdown-menu-item) {
  padding: 1em;
  font-size: 0.8em, 1.5em;
}
.logout {
  color: #ff4d4f;
}
</style>
