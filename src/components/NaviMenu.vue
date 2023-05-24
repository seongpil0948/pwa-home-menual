<script lang="ts" setup>
import {
  Document,
  Location,
} from '@element-plus/icons-vue'

const auth = useAuthStore()
const { isAuthenticated } = toRefs(auth)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleSelect = (index: string, indexPath: any[]) => {
  console.log(indexPath)
  if (index === '/login') {
    console.info('catch logout')
    auth.logout()
  }
}
</script>

<template>
  <h5 class="mb-2">
    바로가기
  </h5>
  <el-menu
    default-active="/"
    router
    @select="handleSelect"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="/">
      <el-icon><Document /></el-icon>
      <span>메뉴얼</span>
    </el-menu-item>

    <el-sub-menu index="/admin">
      <template #title>
        <el-icon><Location /></el-icon>
        <span>관리자</span>
      </template>
      <el-menu-item index="/admin">
        메뉴얼 작성
      </el-menu-item>
    </el-sub-menu>

    <el-menu-item index="/pwa">
      <span>PWA</span>
    </el-menu-item>
    <el-menu-item index="/about">
      <span>About</span>
    </el-menu-item>
    <el-menu-item v-if="isAuthenticated" index="/login">
      <span>로그아웃</span>
    </el-menu-item>
  </el-menu>
</template>

<!--
const handleNodeClick = (data: Tree) => {
  console.log(data)
  if (data.menuId === 'logout')
    auth.logout()

  if (data.path)
    router.push(data.path)
} -->
