<template>
  <div class="balance-display">
    <span class="label">Saldo:</span>
    <span class="amount">$ {{ money }}</span>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTeamStore } from '@/stores/teamStore'

const team = useTeamStore()
const { money } = storeToRefs(team)
</script>

<style scoped>
.balance-display {
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
  font-weight: 600;
}
.label { color: #333; }
.amount { color: #1f8ef1; }
</style>
