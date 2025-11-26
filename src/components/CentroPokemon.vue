<script setup>
import { usePokemonStore } from '../stores/healing'
import { ref } from 'vue'

const store = usePokemonStore()
const isHealing = ref(false)

async function iniciarCuracion() {
  isHealing.value = true
  await store.curarPokemones()
  isHealing.value = false
}

function getHealthColor(actual, max) {
  const percentage = (actual / max) * 100
  if (percentage > 60) return '#10b981'
  if (percentage > 30) return '#f59e0b'
  return '#ef4444'
}

function getHealthPercentage(actual, max) {
  return Math.round((actual / max) * 100)
}
</script>

<template>
  <div class="pokemon-center">
    <div class="header">
      <h1>🏥 Centro Pokémon</h1>
      <p class="subtitle">Cura a tus Pokémon</p>
    </div>

    <div class="pokemon-grid">
      <div v-for="p in store.pokemons" :key="p.id" class="pokemon-card">
        <div class="card-header">
          <h3>{{ p.nombre }}</h3>
          <span class="pokemon-id">#{{ String(p.id).padStart(3, '0') }}</span>
        </div>
        
        <div class="health-container">
          <div class="health-bar-wrapper">
            <div 
              class="health-bar-fill" 
              :style="{ 
                width: getHealthPercentage(p.vidaActual, p.vidaMax) + '%',
                backgroundColor: getHealthColor(p.vidaActual, p.vidaMax)
              }"
            ></div>
          </div>
          <div class="health-text">
            <span class="health-values">{{ Math.floor(p.vidaActual) }} / {{ p.vidaMax }}</span>
            <span class="health-percentage">{{ getHealthPercentage(p.vidaActual, p.vidaMax) }}%</span>
          </div>
        </div>

        <div class="status-indicator">
          <span 
            class="status-dot"
            :class="{ 
              'status-healthy': getHealthPercentage(p.vidaActual, p.vidaMax) > 60,
              'status-warning': getHealthPercentage(p.vidaActual, p.vidaMax) <= 60 && getHealthPercentage(p.vidaActual, p.vidaMax) > 30,
              'status-critical': getHealthPercentage(p.vidaActual, p.vidaMax) <= 30
            }"
          ></span>
          <span class="status-text">
            {{ getHealthPercentage(p.vidaActual, p.vidaMax) > 60 ? 'Saludable' : 
               getHealthPercentage(p.vidaActual, p.vidaMax) > 30 ? 'Lesionado' : 'Crítico' }}
          </span>
        </div>
      </div>
    </div>

    <button 
      class="heal-button"
      @click="iniciarCuracion"
      :disabled="isHealing"
    >
      <span v-if="!isHealing" class="button-icon">💊</span>
      <span v-else class="button-icon spinner">⏳</span>
      {{ isHealing ? 'Curando...' : 'Curar todos' }}
    </button>
  </div>
</template>

<style scoped>
.pokemon-center {
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  min-height: 100vh;
  animation: fadeIn 0.6s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 3rem;
  animation: slideDown 0.6s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header h1 {
  font-size: 2.5rem;
  margin: 0;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.subtitle {
  margin: 0.5rem 0 0 0;
  font-size: 1.1rem;
  opacity: 0.95;
  font-weight: 300;
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
}

@media (max-width: 900px) {
  .pokemon-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .pokemon-grid {
    grid-template-columns: 1fr;
  }
}


.pokemon-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: popIn 0.5s ease-out;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.pokemon-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #f3f4f6;
  padding-bottom: 1rem;
}

.card-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #1f2937;
  font-weight: 700;
}

.pokemon-id {
  background: #f3f4f6;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #6b7280;
}

.health-container {
  margin-bottom: 1.5rem;
}

.health-bar-wrapper {
  width: 100%;
  height: 24px;
  background: #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.75rem;
}

.health-bar-fill {
  height: 100%;
  border-radius: 12px;
  transition: width 0.3s ease, background-color 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.health-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #6b7280;
}

.health-values {
  font-weight: 600;
  color: #1f2937;
}

.health-percentage {
  background: #eff6ff;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-weight: 700;
  color: #3b82f6;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 8px;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.status-healthy {
  background-color: #10b981;
}

.status-warning {
  background-color: #f59e0b;
}

.status-critical {
  background-color: #ef4444;
}

.status-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: #4b5563;
}

.heal-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 20px rgba(245, 158, 11, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.heal-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(245, 158, 11, 0.4);
  background: linear-gradient(135deg, #fcd34d 0%, #fbbf24 100%);
}

.heal-button:active:not(:disabled) {
  transform: translateY(-1px);
}

.heal-button:disabled {
  opacity: 0.8;
  cursor: not-allowed;
}

.button-icon {
  font-size: 1.3rem;
}

.spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .pokemon-center {
    padding: 1.5rem;
    border-radius: 12px;
  }

  .header h1 {
    font-size: 2rem;
  }

  .pokemon-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .heal-button {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
}
</style>
