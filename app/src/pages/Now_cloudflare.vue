<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const Now = defineAsyncComponent(() => import('./Now_cloudflare_delay.vue'))
</script>
<template>
    <Suspense>
        <template #default>
            <Now />
        </template>
        <template #fallback>
            <div id="tips">正在加载...</div>
        </template>
    </Suspense>
</template>