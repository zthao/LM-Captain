<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const Now = defineAsyncComponent(() => import('./Now_phpproxy_delay.vue'))
</script>
<template>
    <Suspense>
        <template #default>
            <Now />
        </template>
        <template #fallback>
            <div id="tips">PHP正在加载...</div>
        </template>
    </Suspense>
</template>