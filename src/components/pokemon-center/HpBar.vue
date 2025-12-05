<template>
  <div class="hp-wrapper">
    <div class="hp-label">{{ hp }} / {{ maxHP }}</div>
    <div class="hp-bar">
      <div class="hp-fill" :style="fillStyle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ hp: number; maxHP: number }>()

const pct = computed(() => Math.max(0, Math.min(100, Math.round((props.hp / props.maxHP) * 100))))

const fillStyle = computed(() => {
  let color = '#34d399'
  if (pct.value <= 30) color = '#f87171'
  else if (pct.value <= 60) color = '#fbbf24'
  return { width: pct.value + '%', background: color }
})
</script>

<style scoped>
.hp-wrapper { display:flex; flex-direction:column; gap:0.25rem }
.hp-label { font-size:0.8rem; color:#374151 }
.hp-bar { width:100%; height:12px; background:rgba(0,0,0,0.06); border-radius:999px; overflow:hidden }
.hp-fill { height:100%; transition:width 0.4s ease }
</style>
