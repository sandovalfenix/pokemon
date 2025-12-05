<template>
  <section class="pc-panel">
    <header class="pc-header">
      <h2>Centro Pokémon</h2>
      <div class="pc-inventory">
        <InventoryPanel />
      </div>
    </header>

    <main class="pc-main">
      <button class="btn-heal" @click="heal">Curar equipo</button>

      <TeamList :pokemons="pokemons" />
    </main>
  </section>
</template>

<script setup lang="ts">
import { useTeamStore } from '../../stores/teamStore'
import { storeToRefs } from 'pinia'
import InventoryPanel from './InventoryPanel.vue'
import TeamList from './TeamList.vue'

const team = useTeamStore()
const { pokemons } = storeToRefs(team)

function heal() {
  team.healTeam()
  alert('Equipo curado al 100%')
}
</script>

<style scoped>
.pc-panel {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 8px 20px rgba(2,6,23,0.06);
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.pc-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  gap: 1.5rem;
}

.pc-header h2 {
  margin: 0;
  font-size: 1.3rem;
  color: #333;
  flex-shrink: 0;
}

.pc-inventory {
  flex: 1;
  min-width: 0;
}

.pc-main {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.btn-heal {
  background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
  color: #042b2b;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  align-self: flex-start;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
}

.btn-heal:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  background: linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%);
}

.btn-heal:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .pc-panel {
    padding: 1rem;
  }

  .pc-header {
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .pc-header h2 {
    font-size: 1.1rem;
  }

  .btn-heal {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }
}
</style>
