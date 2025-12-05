<template>
  <div class="inventory-panel">
    <div class="inv-items">
      <div class="inv-item">
        <div class="label">Pokéballs</div>
        <div class="value">{{ pokeballs }}</div>
      </div>
      <div class="inv-item">
        <div class="label">Dinero</div>
        <div class="value">$ {{ money }}</div>
      </div>
    </div>

    <div class="captured">
      <h4>Pokémon atrapados</h4>
      <ul>
        <li v-for="p in pokemons" :key="p.id" class="captured-item">
          <img :src="p.sprite" :alt="p.name" class="mini-sprite" />
          <div class="cap-meta">
            <div class="cap-name">{{ p.name }} <small class="level">Lv. {{ p.level ?? 1 }}</small></div>
            <div class="cap-desc muted">{{ p.description ?? 'Sin descripción' }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTeamStore } from '@/stores/teamStore'

const team = useTeamStore()
const { pokeballs, money, pokemons } = storeToRefs(team)
</script>

<style scoped>
.inventory-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  padding: 0;
  box-sizing: border-box;
}

.inv-items {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.inv-item {
  background: #f8fafc;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(2, 6, 23, 0.08);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.label {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.value {
  font-weight: 800;
  color: #333;
  font-size: 1.1rem;
}

.captured {
  width: 100%;
  box-sizing: border-box;
}

.captured h4 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  color: #333;
  font-weight: 700;
}

.captured ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  width: 100%;
  box-sizing: border-box;
}

.captured-item {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  background: #fff;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(2, 6, 23, 0.08);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  min-width: 0;
}

.mini-sprite {
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  image-rendering: pixelated;
  object-fit: contain;
}

.cap-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
  flex: 1;
}

.cap-name {
  font-weight: 700;
  color: #333;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.level {
  color: #9ca3af;
  font-weight: 600;
  margin-left: 0.5rem;
  font-size: 0.8rem;
}

.cap-desc {
  font-size: 0.8rem;
  color: #9ca3af;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 768px) {
  .inventory-panel {
    gap: 1.2rem;
  }

  .captured ul {
    grid-template-columns: 1fr;
  }

  .captured-item {
    padding: 0.6rem;
  }

  .mini-sprite {
    width: 45px;
    height: 45px;
  }

  .cap-name {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .inventory-panel {
    gap: 1rem;
  }

  .inv-items {
    gap: 0.5rem;
  }

  .inv-item {
    padding: 0.5rem 0.8rem;
    font-size: 0.85rem;
  }

  .value {
    font-size: 1rem;
  }

  .captured h4 {
    font-size: 0.95rem;
    margin-bottom: 0.75rem;
  }

  .captured ul {
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }

  .captured-item {
    padding: 0.5rem;
  }

  .mini-sprite {
    width: 40px;
    height: 40px;
  }

  .cap-name {
    font-size: 0.8rem;
  }

  .cap-desc {
    font-size: 0.75rem;
  }
}
</style>
