<script setup lang="ts">
import { Client, getType } from '../client';
const roomid = __ROOM_ID__;//core.getInput('roomid');
const ruid = __RUID__;//core.getInput('ruid');
const client = new Client(roomid, ruid);
const list = await client.get();
console.log(list);
const getGuardImg = (type: string) => {
    if (type === '总督') return '/guard-1.png';
    else if (type === '提督') return '/guard-2.png';
    else return '/guard-3.png';
};
</script> 
<template>
    <div id="summary" class="list" w="full" overflow="auto">
        <div id="tips">请不要频繁刷新，免费服务器有限制</div>
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
                            <img :src="getGuardImg(getType(cap.level))" :alt="getType(cap.level)"
                                class="h-[2em] lt-md:h-[1.5em] select-none mr1" />
                            <span font-light w-8>{{ getType(cap.level) }}</span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>