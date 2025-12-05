<template>
  <div class="pokemon-center-container">
    <h1 class="pokemon-center-title">🏥 Centro Pokémon</h1>
    <div class="pokemon-center-content">
      <PokemonCenterPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import PokemonCenterPanel from '@/components/pokemon-center/PokemonCenterPanel.vue'
</script>

<style scoped>
.pokemon-center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: #f5f5f5;
}

.pokemon-center-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
}

.pokemon-center-content {
  width: 100%;
  max-width: 800px;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
  .pokemon-center-container {
    padding: 1rem;
  }

  .pokemon-center-title {
    font-size: 1.5rem;
  }

  .pokemon-center-content {
    max-width: 100%;
    padding: 1rem;
  }
}
</style>
