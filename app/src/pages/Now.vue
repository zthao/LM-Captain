<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, ref, watch } from 'vue';
const router = useRouter();
const mode = ref<'cloudflare' | 'tampermonkey' | 'PHP'>('cloudflare');
watch(mode, (mode) => {
  if (mode === 'cloudflare') {
    router.push({ name: 'Now_cloudflare' });
  } else if (mode === 'tampermonkey') {
    router.push({ name: 'Now_tampermonkey' });
  } else if (mode === 'PHP') {
    router.push({ name: 'Now_phpproxy' });
  } else {
    router.push({ name: 'Roll' });
  }
});
</script>
<template>
    <h2 mt="1">即时舰长列表</h2>
    <div mt="4">
        <c-button success @click="mode = 'cloudflare'" mr="2">cloudflare反代(需要科学上网)</c-button><br><br>
        <c-button success @click="mode = 'tampermonkey'" mr="2">tampermonkey脚本(本地请求)</c-button><br><br>
        <c-button success @click="mode = 'PHP'" mr="2">PHP-proxy(小水管)</c-button><br><br>
        <c-button success @click="mode = 'tampermonkey'" mr="2">导出 Excel</c-button><br><br>
    </div>
</template>