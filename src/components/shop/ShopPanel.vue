<template>
  <div class="shop-panel">
    <div class="shop-header">
      <h2>Tienda Pokémon</h2>
      <div class="balance">
        <BalanceDisplay :key="balanceKey" />
      </div>
    </div>

    <div class="products-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @buy="handleBuy"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProductCard from './ProductCard.vue'
import BalanceDisplay from './BalanceDisplay.vue'
import { useTeamStore } from '@/stores/teamStore'
import { storeToRefs } from 'pinia'

interface Product {
  id: string
  name: string
  price: number
  image?: string
  quantity?: number
}

// Productos con múltiples opciones
const products = ref<Product[]>([
  { id: 'pokeball', name: 'Pokéball', price: 200, image: '/pokeball.svg', quantity: 1 },
  { id: 'greatball', name: 'Superball', price: 600, image: '/greatball.svg', quantity: 1 },
  { id: 'ultraball', name: 'Ultraball', price: 1200, image: '/ultraball.svg', quantity: 1 },
  { id: 'potion', name: 'Poción', price: 300, image: '/potion.svg', quantity: 1 },
  { id: 'super-potion', name: 'Súper Poción', price: 700, image: '/super-potion.svg', quantity: 1 },
  { id: 'hyper-potion', name: 'Hiper Poción', price: 1500, image: '/hyper-potion.svg', quantity: 1 },
  { id: 'max-potion', name: 'Poción Máxima', price: 2500, image: '/max-potion.svg', quantity: 1 },
  { id: 'full-restore', name: 'Restauración Total', price: 3000, image: '/full-restore.svg', quantity: 1 },
])

// Use Pinia teamStore when available
const teamStore = useTeamStore()
const { money, pokeballs } = storeToRefs(teamStore)

const balanceKey = ref(0)

function handleBuy(product: Product) {
  if (!teamStore.spendMoney(product.price)) {
    alert('❌ Saldo insuficiente')
    return
  }

  if (product.id === 'pokeball' || product.id === 'greatball' || product.id === 'ultraball') {
    teamStore.addPokeballs(product.quantity || 1)
  }

  // force re-render if needed
  balanceKey.value++

  alert(`✅ Comprado: ${product.name} por $${product.price}`)
}
</script>

<style scoped>
.shop-panel {
  background: #f7fafc;
  padding: 1rem;
  border-radius: 10px;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}
.shop-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (max-width: 640px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
