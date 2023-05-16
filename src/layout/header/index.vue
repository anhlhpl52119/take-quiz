<template>
  <div class="flex-50 header">
    <div class="logo">
      <a href="/about"
        ><img class="full-size-logo" src="@/assets/logo_ngang.svg"
      /></a>
      <img class="mini-size-logo" src="@/assets/logo_doc.svg" />
    </div>
    <div>
      <ul class="header_items">
        <li class="nav-about" v-if="isDisplay">
          <a-button type="primary" @click="onClickCreateSet">
            <template #icon>
              <PlusOutlined :style="{ fontSize: '18px' }"></PlusOutlined>
            </template>
            Create collection</a-button
          >
        </li>
        <li class="nav-lang">
          <a-select ref="select" v-model:value="valSelect" style="width: 5em">
            <template #suffixIcon
              ><TranslationOutlined class="ant-select-suffix"
            /></template>
            <a-select-option value="vietnam">Vi</a-select-option>
            <a-select-option value="english">Eng</a-select-option>
          </a-select>
        </li>
        <li>
          <UserMenu></UserMenu>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { RouteName } from '@enum/routesEnum';
import { PlusOutlined, TranslationOutlined } from '@ant-design/icons-vue';

const UserMenu = defineAsyncComponent(() => import('./UserMenu.vue'));
const valSelect = ref('english');
const router = useRouter();
const route = useRoute();
const isDisplay = computed(() => {
  const a = route.name;
  if (a === RouteName.CreateCollection || a === RouteName.UpdateCollection) {
    return false;
  } else {
    return true;
  }
});
function onClickCreateSet() {
  router.push({ name: RouteName.CreateCollection });
}
</script>
<style scoped lang="less">
.header {
  justify-content: space-between;
  align-items: center;
  align-items: center;
  height: 64px;
  background-color: white;
  li {
    margin: 0 10px;
    list-style: none;
  }
}
.header_items {
  display: flex;
  margin: 0;
  align-items: center;
}
.full-size-logo {
  display: block;
  width: 200px;
}
.mini-size-logo {
  width: 70px;
  display: none;
}
@media only screen and (max-width: @mobile-screen-rps) {
  .nav-lang,
  .full-size-logo {
    display: none;
  }
  .mini-size-logo {
    display: block;
  }
}
</style>
