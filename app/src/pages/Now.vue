<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
<template>
    <div id="tips"><a href="..//B站直播舰长列表.user.js">请先安装脚本</a><br><div @click="router.push({ name: 'NowMoblie' });">手机请点这里</div></div>
    <div id="list"></div>
</template>