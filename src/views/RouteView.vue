<script setup lang="ts">
import { useRoutesStore } from '@/stores/routes'
import type { Trainer } from '@/types/route'
import type { Pokemon } from '@/types/pokemon'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'

const routesStore = useRoutesStore()
const { currentRoute, availableRoutes, remainingTrainers, steps, currentEncounter } =
  storeToRefs(routesStore)

// Computed properties tipadas para el encuentro actual
const wildPokemonData = computed(() => {
  if (currentEncounter.value?.type === 'wild') {
    return currentEncounter.value.data as Pokemon
  }
  return null
})

const trainerData = computed(() => {
  if (currentEncounter.value?.type === 'trainer') {
    return currentEncounter.value.data as Trainer
  }
  return null
})

const { walk, travelTo, challengeTrainer, clearEncounter, defeatTrainer, unlockRoute } = routesStore

const walkMessage = ref('')
const isWalking = ref(false)

const handleWalk = () => {
  if (isWalking.value) return

  isWalking.value = true
  walkMessage.value = 'Caminando...'

  setTimeout(() => {
    const result = walk()

    if (result.encountered && result.pokemon) {
      walkMessage.value = `¡Un ${result.pokemon.name} salvaje apareció!`
    } else {
      const messages = [
        'El camino está tranquilo...',
        'Escuchas el sonido de la naturaleza.',
        'No hay nada por aquí.',
        'Sigues adelante con cuidado.',
        'El viento sopla suavemente.',
      ]
      walkMessage.value = messages[Math.floor(Math.random() * messages.length)]
    }

    isWalking.value = false
  }, 500)
}

const handleFlee = () => {
  walkMessage.value = '¡Escapaste del encuentro!'
  clearEncounter()
}

const handleFight = () => {
  if (currentEncounter.value?.type === 'trainer' && trainerData.value) {
    const trainer = trainerData.value
    // Simular victoria por ahora
    defeatTrainer(trainer.id)
    walkMessage.value = `¡Derrotaste a ${trainer.name}! Ganaste $${trainer.reward}`

    // Desbloquear siguiente ruta si derrotaste todos los entrenadores
    if (remainingTrainers.value.length === 0 && currentRoute.value) {
      const nextRoute = currentRoute.value.connectedRoutes.find(
        (id) => !routesStore.routes.find((r) => r.id === id)?.unlocked,
      )
      if (nextRoute) {
        unlockRoute(nextRoute)
        walkMessage.value += ' ¡Nueva ruta desbloqueada!'
      }
    }
  } else {
    walkMessage.value = '¡Victoria! El Pokémon salvaje huyó.'
  }
  clearEncounter()
}

const handleTrainerChallenge = (trainerId: number) => {
  const trainer = challengeTrainer(trainerId)
  if (trainer) {
    walkMessage.value = trainer.dialogue.before
  }
}

const getRouteTypeIcon = (type: string) => {
  const icons: Record<string, string> = {
    grass: '🌿',
    forest: '🌲',
    cave: '🕳️',
    water: '🌊',
    city: '🏙️',
  }
  return icons[type] || '📍'
}

const getRouteTypeClass = (type: string) => {
  return `route-bg-${type}`
}
</script>

<template>
  <main class="route-view" :class="currentRoute ? getRouteTypeClass(currentRoute.type) : ''">
    <header class="route-header">
      <h1>🗺️ Explorador de Rutas</h1>
      <div class="steps-counter">
        <span>👟 Pasos: {{ steps }}</span>
      </div>
    </header>

    <!-- Información de la ruta actual -->
    <section v-if="currentRoute" class="current-route-panel">
      <div class="route-info">
        <h2>
          {{ getRouteTypeIcon(currentRoute.type) }}
          {{ currentRoute.name }}
        </h2>
        <p class="route-description">{{ currentRoute.description }}</p>

        <div class="route-details">
          <div class="detail-item">
            <span class="label">Tipo:</span>
            <span class="value type-badge" :class="currentRoute.type">
              {{ currentRoute.type }}
            </span>
          </div>
          <div class="detail-item">
            <span class="label">Pokémon salvajes:</span>
            <span class="value">{{ currentRoute.wildPokemons.length }} especies</span>
          </div>
          <div class="detail-item">
            <span class="label">Entrenadores:</span>
            <span class="value">
              {{ remainingTrainers.length }} / {{ currentRoute.trainers.length }}
            </span>
          </div>
        </div>
      </div>

      <!-- Pokémon salvajes disponibles -->
      <div class="wild-pokemon-list">
        <h3>🔍 Pokémon en esta zona</h3>
        <div class="pokemon-chips">
          <span
            v-for="pokemon in currentRoute.wildPokemons"
            :key="pokemon.pokemonId"
            class="pokemon-chip"
            :title="`Nivel ${pokemon.minLevel}-${pokemon.maxLevel} (${pokemon.encounterRate}%)`"
          >
            {{ pokemon.name }}
            <small>Lv.{{ pokemon.minLevel }}-{{ pokemon.maxLevel }}</small>
          </span>
        </div>
      </div>
    </section>

    <!-- Panel de encuentro -->
    <section v-if="currentEncounter" class="encounter-panel">
      <div class="encounter-content">
        <template v-if="currentEncounter.type === 'wild' && wildPokemonData">
          <div class="encounter-icon wild">⚡</div>
          <h2>¡Pokémon Salvaje!</h2>
          <div class="encounter-pokemon">
            <span class="pokemon-name">{{ wildPokemonData.name }}</span>
            <div class="pokemon-stats">
              <span>❤️ HP: {{ wildPokemonData.hp }}</span>
              <span>⚔️ ATK: {{ wildPokemonData.attack }}</span>
              <span>🛡️ DEF: {{ wildPokemonData.defense }}</span>
            </div>
          </div>
        </template>

        <template v-else-if="trainerData">
          <div class="encounter-icon trainer">🎓</div>
          <h2>{{ trainerData.name }}</h2>
          <p class="trainer-dialogue">"{{ trainerData.dialogue.before }}"</p>
          <div class="trainer-pokemon-count">Pokémon: {{ trainerData.pokemons.length }}</div>
        </template>

        <div class="encounter-actions">
          <button class="btn btn-fight" @click="handleFight">⚔️ Pelear</button>
          <button v-if="currentEncounter.type === 'wild'" class="btn btn-flee" @click="handleFlee">
            🏃 Huir
          </button>
        </div>
      </div>
    </section>

    <!-- Controles de exploración -->
    <section v-if="!currentEncounter" class="exploration-controls">
      <button
        class="btn btn-walk"
        :class="{ walking: isWalking }"
        :disabled="isWalking"
        @click="handleWalk"
      >
        <span v-if="isWalking">🚶 Caminando...</span>
        <span v-else>🚶 Caminar por la hierba</span>
      </button>

      <p v-if="walkMessage" class="walk-message">{{ walkMessage }}</p>
    </section>

    <!-- Entrenadores en la ruta -->
    <section v-if="remainingTrainers.length > 0 && !currentEncounter" class="trainers-section">
      <h3>👥 Entrenadores en la zona</h3>
      <div class="trainers-grid">
        <div
          v-for="trainer in remainingTrainers"
          :key="trainer.id"
          class="trainer-card"
          @click="handleTrainerChallenge(trainer.id)"
        >
          <div class="trainer-avatar">🧑‍🎓</div>
          <div class="trainer-info">
            <span class="trainer-name">{{ trainer.name }}</span>
            <span class="trainer-pokemon-count"> {{ trainer.pokemons.length }} Pokémon </span>
            <span class="trainer-reward">💰 ${{ trainer.reward }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Navegación a otras rutas -->
    <section v-if="availableRoutes.length > 0 && !currentEncounter" class="navigation-section">
      <h3>🧭 Rutas conectadas</h3>
      <div class="routes-grid">
        <button
          v-for="route in availableRoutes"
          :key="route.id"
          class="route-card"
          @click="travelTo(route.id)"
        >
          <span class="route-icon">{{ getRouteTypeIcon(route.type) }}</span>
          <span class="route-name">{{ route.name }}</span>
          <span class="route-type-label">{{ route.type }}</span>
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.route-view {
  min-height: 100vh;
  padding: 1.5rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  transition: background 0.5s ease;
}

/* Fondos según tipo de ruta */
.route-bg-grass {
  background: linear-gradient(135deg, #2d5016 0%, #4a7c23 50%, #6b9b37 100%);
}

.route-bg-forest {
  background: linear-gradient(135deg, #1a3a1a 0%, #2d5a2d 50%, #3d6b3d 100%);
}

.route-bg-cave {
  background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 50%, #3d3d5c 100%);
}

.route-bg-water {
  background: linear-gradient(135deg, #0c2d48 0%, #145374 50%, #2e86ab 100%);
}

.route-bg-city {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #5d6d7e 100%);
}

.route-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}

.route-header h1 {
  color: #fff;
  font-size: 1.8rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin: 0;
}

.steps-counter {
  background: rgba(0, 0, 0, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: #fff;
  font-weight: 600;
}

/* Panel de ruta actual */
.current-route-panel {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.route-info h2 {
  color: #1a1a2e;
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}

.route-description {
  color: #555;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.route-details {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.detail-item .label {
  color: #777;
  font-size: 0.9rem;
}

.detail-item .value {
  font-weight: 600;
  color: #333;
}

.type-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  text-transform: uppercase;
}

.type-badge.grass {
  background: #4caf50;
  color: #fff;
}
.type-badge.forest {
  background: #2e7d32;
  color: #fff;
}
.type-badge.cave {
  background: #5d4e6d;
  color: #fff;
}
.type-badge.water {
  background: #2196f3;
  color: #fff;
}
.type-badge.city {
  background: #607d8b;
  color: #fff;
}

/* Lista de Pokémon salvajes */
.wild-pokemon-list {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.wild-pokemon-list h3 {
  color: #333;
  font-size: 1rem;
  margin: 0 0 0.75rem 0;
}

.pokemon-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.pokemon-chip {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: help;
}

.pokemon-chip small {
  opacity: 0.8;
  font-size: 0.7rem;
}

/* Panel de encuentro */
.encounter-panel {
  background: rgba(0, 0, 0, 0.85);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  animation: encounterAppear 0.3s ease-out;
}

@keyframes encounterAppear {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.encounter-content h2 {
  color: #fff;
  margin: 1rem 0;
}

.encounter-icon {
  font-size: 3rem;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.encounter-icon.wild {
  color: #ffd700;
}
.encounter-icon.trainer {
  color: #64b5f6;
}

.encounter-pokemon {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 12px;
  margin: 1rem 0;
}

.pokemon-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffd700;
  display: block;
  margin-bottom: 0.5rem;
}

.pokemon-stats {
  display: flex;
  justify-content: center;
  gap: 1rem;
  color: #fff;
  font-size: 0.9rem;
}

.trainer-dialogue {
  color: #aaa;
  font-style: italic;
  margin: 1rem 0;
}

.trainer-pokemon-count {
  color: #fff;
  font-size: 0.9rem;
}

.encounter-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

/* Controles de exploración */
.exploration-controls {
  text-align: center;
  margin-bottom: 1.5rem;
}

.walk-message {
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  margin-top: 1rem;
  display: inline-block;
}

/* Botones */
.btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-walk {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  color: #fff;
  font-size: 1.1rem;
  padding: 1rem 2rem;
}

.btn-walk.walking {
  animation: walkingPulse 0.5s infinite;
}

@keyframes walkingPulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.btn-fight {
  background: linear-gradient(135deg, #eb3349 0%, #f45c43 100%);
  color: #fff;
}

.btn-flee {
  background: linear-gradient(135deg, #606c88 0%, #3f4c6b 100%);
  color: #fff;
}

/* Sección de entrenadores */
.trainers-section {
  margin-bottom: 1.5rem;
}

.trainers-section h3 {
  color: #fff;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.trainers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.trainer-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.trainer-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.trainer-avatar {
  font-size: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.trainer-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.trainer-name {
  font-weight: 600;
  color: #333;
}

.trainer-pokemon-count {
  font-size: 0.8rem;
  color: #666;
}

.trainer-reward {
  font-size: 0.85rem;
  color: #4caf50;
  font-weight: 600;
}

/* Navegación de rutas */
.navigation-section h3 {
  color: #fff;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.routes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.route-card {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.route-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  background: #fff;
}

.route-icon {
  font-size: 2rem;
}

.route-name {
  font-weight: 600;
  color: #333;
}

.route-type-label {
  font-size: 0.75rem;
  color: #777;
  text-transform: uppercase;
}
</style>
