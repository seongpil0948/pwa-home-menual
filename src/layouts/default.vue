<script lang="ts" setup>
import { ref } from 'vue'

import { BIconList } from 'bootstrap-icons-vue'
const activeIndex = ref('1')

const drawer = ref(false)
function cancelClick() {
  drawer.value = false
}
function openDrawer() {
  drawer.value = true
}
const router = useRouter()
router.afterEach(() => {
  if (drawer.value)
    drawer.value = false
})
</script>

<template>
  <el-drawer v-model="drawer" size="600" direction="ltr" :show-close="false">
    <template #header>
      바로가기
    </template>
    <ul class="post-list pr-3" style="overflow: auto;">
      <li v-for="p in [1, 2, 3, 4]" :key="p" class="post-list-item">
        {{ p }}
      </li>
    </ul>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">
          닫기
        </el-button>
      </div>
    </template>
  </el-drawer>
  <el-menu
    style="height: 5vh;"
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
  >
    <el-menu-item style="margin: auto" index="0" @click="openDrawer">
      <BIconList style="font-size: 1.2rem;" />
    </el-menu-item>
    <div class="flex-grow" />
  </el-menu>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <RouterView />
  </main>
  <div class="mt-5 mx-auto text-center opacity-75 dark:opacity-50 text-sm">
    <Footer />
  </div>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
.post-list {
  list-style: none;
}
.post-list .post-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.post-list .post-list-item + .list-item {
  margin-top: 10px;
}
</style>
