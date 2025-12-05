<template>
  <div class="product-card">
    <img :src="product.image" :alt="product.name" class="product-image" />
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">$ {{ product.price }}</p>
    </div>
    <button class="buy-button" @click="onBuy">Comprar</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Product {
  id: string
  name: string
  price: number
  image?: string
}

const props = defineProps<{ product: Product }>()
const emit = defineEmits<{
  (e: 'buy', product: Product): void
}>()

function onBuy() {
  emit('buy', props.product)
}
</script>

<style scoped>
.product-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #fff;
  border-radius: 8px;
  padding: 0.75rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}
.product-image {
  width: 64px;
  height: 64px;
  object-fit: contain;
}
.product-info {
  flex: 1;
}
.product-name {
  margin: 0;
  font-size: 1rem;
}
.product-price {
  margin: 0.15rem 0 0 0;
  color: #555;
}
.buy-button {
  background: #ffcb05;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
.buy-button:hover { filter: brightness(0.95); }
</style>
