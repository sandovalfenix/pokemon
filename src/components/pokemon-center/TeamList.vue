<template>
  <ul class="team-list">
    <li v-for="p in pokemons" :key="p.id" class="team-item">
      <img :src="p.sprite" :alt="p.name" class="sprite" />
      <div class="meta">
        <div class="name">{{ p.name }} <small class="level">Lv. {{ p.level ?? 5 }}</small></div>
        <HpBar :hp="p.hp" :maxHP="p.maxHP" />
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import HpBar from './HpBar.vue'

interface P {
  id: number
  name: string
  hp: number
  maxHP: number
  sprite: string
  level?: number
}

const props = defineProps<{ pokemons: Ref<P[]> | P[] }>()
const pokemons = props.pokemons as P[]
</script>

<style scoped>
.team-list { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:0.75rem }
.team-item { display:flex; gap:0.75rem; align-items:center; background:#fbfdff; padding:0.5rem; border-radius:8px; border:1px solid rgba(2,6,23,0.04) }
.sprite { width:56px; height:56px; image-rendering: pixelated }
.meta { flex:1 }
.name { font-weight:700 }
.level { color:#6b7280; margin-left:0.5rem; font-weight:600 }
</style>
