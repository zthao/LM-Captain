<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Client, getType } from '../client';
const router = useRouter();
console.log(__ROOM_ID__);
console.log(__RUID__);
const roomid = __ROOM_ID__;//core.getInput('roomid');
const ruid = __RUID__;//core.getInput('ruid');
const client = new Client(roomid, ruid);
const list = await client.get();
const getGuardImg = (type: string) => {
  if (type === '总督') return '/guard-1.png';
  else if (type === '提督') return '/guard-2.png';
  else return '/guard-3.png';
};
</script>
<template>
    <!--<div id="tips"><a href="..//B站直播舰长列表.user.js">请先安装脚本</a><br><div @click="router.push({ name: 'NowMoblie' });">手机请点这里</div></div>-->
    <!--<div id="list"></div>-->
    <div id="summary" class="list" w="full" overflow="auto">
    <h2 mt="1">即时舰长列表</h2>
    <table rounded border border-collapse w="full">
      <thead>
        <tr bg="light-300">
          <th text="center">#</th>
          <th>UID</th>
          <th>用户名</th>
          <th text="center">类型</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cap, index) in list" :key="cap.uid">
            <td text="center" font-bold>{{ index + 1 }}</td>
          <td>{{ cap.uid }}</td>
          <td>
            <router-link :to="{ name: 'Captain', params: { user: cap.uid } }">{{
              cap.username
            }}</router-link>
          </td>
          <td text="center">
            <div flex="~" items-center justify-center>
              <img
                :src="getGuardImg(getType(cap.level))"
                :alt="getType(cap.level)"
                class="h-[2em] lt-md:h-[1.5em] select-none mr1"
              />
              <span font-light w-8>{{ getType(cap.level) }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>