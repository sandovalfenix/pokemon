<template>
  <div class="route-buttons" style="display:flex; gap:0.6rem; flex-wrap:wrap; justify-content:center">
    <!-- Static shop button (not necessarily a registered route) -->
    <button class="btn-primary" @click="emitShowInline('shop')">Tienda</button>

    <template v-for="r in visibleRoutes" :key="r.path">
      <button
        v-if="r.path === '/pokemon-center'"
        class="btn-primary"
        @click="emitShowInline(r.path)"
      >
        {{ r.name || r.path }}
      </button>

      <router-link v-else class="btn-primary" :to="r.path">
        {{ r.name || r.path }}
      </router-link>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'show-inline', path: string): void
}>()

const router = useRouter()

const visibleRoutes = computed(() => {
  return router.getRoutes()
    .filter(r => r.path && r.path !== '/:pathMatch(.*)*' && r.path !== '/favicon.ico')
    .map(r => ({ path: r.path, name: r.name }))
})

function emitShowInline(path: string) {
  emit('show-inline', path)
}
</script>

<style scoped>
.btn-primary { display:inline-flex; align-items:center; justify-content:center }
</style>
