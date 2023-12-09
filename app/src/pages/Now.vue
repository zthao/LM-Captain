<script setup lang="ts">
import { useRouter } from 'vue-router';
import { defineAsyncComponent } from 'vue';
const Now = defineAsyncComponent(() => import('./NowMoblie.vue'))
const router = useRouter();
console.log(__ROOM_ID__);
console.log(__RUID__);
const roomid = __ROOM_ID__;//core.getInput('roomid');
const ruid = __RUID__;//core.getInput('ruid');
</script>
<template>
    <!--<div id="tips"><a href="..//B站直播舰长列表.user.js">请先安装脚本</a><br><div @click="router.push({ name: 'NowMoblie' });">手机请点这里</div></div>-->
    <!-- <div id="list"></div> -->
    <div id="tips">请不要频繁刷新，免费服务器有限制</div>
    <Suspense>
        <template #default>
            <Now />
        </template>
        <template #fallback>
            <div id="tips">正在加载...</div>
        </template>
    </Suspense>
</template>