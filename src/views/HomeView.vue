<script setup lang="ts">
import { ref } from 'vue'
import PokemonCenterPanel from '@/components/pokemon-center/PokemonCenterPanel.vue'
import ShopPanel from '@/components/shop/ShopPanel.vue'
import { useBattleStore } from '@/stores/battle'
import { useTeamStore } from '@/stores/teamStore'
import { storeToRefs } from 'pinia'

const showPokemonCenter = ref(false)
const showShop = ref(false)

const { attackPokemon } = useBattleStore()
const { pokemons, opponentPokemons, gameOver, winner } = storeToRefs(useBattleStore())
const { pokemons: teamPokemons, pokeballs, money } = storeToRefs(useTeamStore())

function togglePokemonCenter() {
  showPokemonCenter.value = !showPokemonCenter.value
  if (showPokemonCenter.value) showShop.value = false
}

function toggleShop() {
  showShop.value = !showShop.value
  if (showShop.value) showPokemonCenter.value = false
}
</script>

<template>
  <main>
    <h1>🎮 Battle Pokémon</h1>

    <!-- Sección de información general -->
    <section class="info-section">
      <div class="info-card">
        <h3>📊 Estado General</h3>
        <p><strong>Pokémon en equipo:</strong> {{ teamPokemons.length }}/6</p>
        <p><strong>Pokéballs disponibles:</strong> {{ pokeballs }}</p>
        <p><strong>Dinero:</strong> ${{ money }}</p>
      </div>
    </section>

    <!-- Estado del juego si está en batalla -->
    <div v-if="gameOver" class="gameOver">
      <h2>🏆 Game Over!</h2>
      <p>El ganador es: <strong>{{ winner === 'player' ? 'Jugador' : 'Oponente' }}</strong></p>
    </div>

    <!-- Sección de batalla -->
    <section class="battle-section">
      <div class="pokemon-card">
        <h2>🎯 Pokémon del Jugador</h2>
        <p><strong>Nombre:</strong> {{ pokemons[0]?.name || 'N/A' }}</p>
        <p><strong>HP:</strong> {{ pokemons[0]?.hp || 0 }}/{{ pokemons[0]?.attack || 0 }}</p>
        <button class="btn-attack" @click="attackPokemon(pokemons, opponentPokemons)" v-if="!gameOver">Atacar Oponente</button>
      </div>

      <div class="pokemon-card">
        <h2>⚔️ Pokémon Oponente</h2>
        <p><strong>Nombre:</strong> {{ opponentPokemons[0]?.name || 'N/A' }}</p>
        <p><strong>HP:</strong> {{ opponentPokemons[0]?.hp || 0 }}/{{ opponentPokemons[0]?.attack || 0 }}</p>
      </div>
    </section>

    <!-- Botones principales centrados -->
    <div class="button-group">
      <button class="btn-primary" @click="togglePokemonCenter" :class="{ active: showPokemonCenter }">
        🏥 Inventario Pokémon
      </button>
      <button class="btn-primary" @click="toggleShop" :class="{ active: showShop }">
        🛒 Tienda
      </button>
    </div>

    <!-- Paneles de Centro Pokémon y Tienda (solo uno visible a la vez) -->
    <section v-if="showPokemonCenter || showShop" class="panels-container">
      <PokemonCenterPanel v-if="showPokemonCenter" />
      <ShopPanel v-if="showShop" />
    </section>
  </main>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

main {
  text-align: center;
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

h1 {
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.battle-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  gap: 2rem;
  flex-wrap: wrap;
}

.pokemon-card {
  border: 1px solid #ccc;
  padding: 1.5rem;
  border-radius: 8px;
  width: 220px;
  background: #fafafa;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.pokemon-card h2 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.1rem;
}

.pokemon-card p {
  margin: 0.7rem 0;
  text-align: left;
  color: #666;
  font-size: 0.95rem;
}

.btn-attack {
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  min-width: 180px;
}

.btn-attack:hover {
  background-color: #369870;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.2);
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2.5rem 0;
  flex-wrap: wrap;
}

.btn-primary {
  padding: 1rem 2.5rem;
  background-color: #fff;
  color: #333;
  border: 2px solid #ddd;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.4s ease;
  min-width: 210px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  border-color: #42b983;
  background-color: #f0f8f5;
  color: #42b983;
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(66, 185, 131, 0.25);
}

.btn-primary.active {
  background: linear-gradient(135deg, #42b983 0%, #369870 100%);
  color: white;
  border-color: #369870;
  box-shadow: 0 8px 24px rgba(66, 185, 131, 0.35);
}

.btn-primary.active:hover {
  background: linear-gradient(135deg, #369870 0%, #2d8659 100%);
  border-color: #2d8659;
  box-shadow: 0 10px 28px rgba(66, 185, 131, 0.4);
  transform: translateY(-4px);
}

.panels-container {
  margin-top: 2rem;
  animation: slideIn 0.3s ease-in-out;
  width: 100%;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.gameOver {
  background-color: #ffdddd;
  border: 1px solid #ff5c5c;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  color: #a70000;
  width: 100%;
}

.gameOver h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
}

.gameOver p {
  margin: 0;
  font-size: 1rem;
}

.info-section {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  width: 100%;
}

.info-card {
  background: #f0f0f0;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  min-width: 250px;
  max-width: 400px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.info-card h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.1rem;
}

.info-card p {
  margin: 0.5rem 0;
  color: #666;
  font-size: 0.95rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  main {
    padding: 1.2rem;
    max-width: 100%;
  }

  h1 {
    font-size: 1.7rem;
    margin-bottom: 1.2rem;
  }

  .battle-section {
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .pokemon-card {
    width: 200px;
  }

  .btn-primary {
    min-width: 180px;
    padding: 0.9rem 2rem;
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  main {
    padding: 1rem;
  }

  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .battle-section {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .pokemon-card {
    width: 100%;
    max-width: 280px;
    padding: 1rem;
  }

  .pokemon-card h2 {
    font-size: 1rem;
  }

  .pokemon-card p {
    font-size: 0.9rem;
  }

  .button-group {
    gap: 1.2rem;
    margin: 1.8rem 0;
  }

  .btn-primary {
    min-width: 140px;
    padding: 0.8rem 1.8rem;
    font-size: 0.95rem;
  }

  .info-section {
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .info-card {
    min-width: 100%;
    max-width: 100%;
    padding: 1.2rem;
  }

  .info-card h3 {
    font-size: 1rem;
  }

  .info-card p {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  main {
    padding: 0.8rem;
  }

  h1 {
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
  }

  .battle-section {
    gap: 0.8rem;
    margin: 1rem 0;
  }

  .pokemon-card {
    width: 100%;
    padding: 0.8rem;
  }

  .pokemon-card h2 {
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
  }

  .pokemon-card p {
    font-size: 0.85rem;
    margin: 0.4rem 0;
  }

  .btn-attack {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }

  .button-group {
    gap: 0.8rem;
    margin: 1.2rem 0;
    justify-content: center;
  }

  .btn-primary {
    min-width: 130px;
    padding: 0.7rem 1.4rem;
    font-size: 0.85rem;
  }

  .info-card {
    padding: 1rem;
    min-width: 100%;
  }

  .gameOver {
    padding: 1rem;
  }

  .gameOver h2 {
    font-size: 1.1rem;
  }

  .gameOver p {
    font-size: 0.9rem;
  }
}
</style>
