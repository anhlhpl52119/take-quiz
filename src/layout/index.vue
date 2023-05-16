<template>
  <header>
    <HeaderLayout class="container headerOne"></HeaderLayout>
  </header>
  <main>
    <div class="container cont-mg-t">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <transition
            :name="
              Object.is(route.meta?.transitionName, false)
                ? ''
                : 'fade-transform'
            "
            mode="out-in"
            appear
          >
            <Suspense>
              <component :is="Component" />
            </Suspense>
          </transition>
        </template>
      </router-view>
    </div>
  </main>
  <!-- <footer><FooterLayout></FooterLayout></footer> -->
</template>
<script lang="ts" setup>
import HeaderLayout from './header/index.vue';
// import FooterLayout from './footer/index.vue';
const route = useRoute();
</script>
<style scoped lang="less">
main {
  top: @header-height;
  margin-top: 2em;
}
header {
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 9999;
}
</style>
