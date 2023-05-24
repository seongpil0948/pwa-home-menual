<script lang="ts" setup>
import { ref } from 'vue'
import { Search as SearchIcon } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { usePostStore } from '~/store/post'

const activeIndex = ref('1')
const postStore = usePostStore()
const { postList, postSearched } = storeToRefs(postStore)
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
const targetPostList = computed(() => postSearched.value.length > 0 ? postSearched.value : postList.value)
</script>

<template>
  <el-drawer v-model="drawer" size="600" direction="ltr" :show-close="false">
    <template #header>
      <post-search-selector />
    </template>
    <template #default>
      <ul class="post-list pr-3" style="overflow: auto;">
        <li v-for="p in targetPostList" :key="p.id" class="post-list-item">
          <RouterLink class="icon-btn mx-2" :to="`/post/${p.id}`">
            <div class="flex items-center mt-2">
              {{ p.title }}
            </div>
          </RouterLink>
        </li>
      </ul>
    </template>
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
      <el-icon>
        <SearchIcon style="width: 1rem;" />
      </el-icon>
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
