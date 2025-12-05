import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface TeamPokemon {
  id: number
  name: string
  hp: number
  maxHP: number
  sprite: string
  type?: string | string[]
  level?: number
  description?: string
}

export const useTeamStore = defineStore('team', () => {
  // Initial dummy team (3 pokémon)
  const pokemons = ref<TeamPokemon[]>([
    { id: 25, name: 'Pikachu', hp: 20, maxHP: 35, sprite: '/pikachu.svg', type: 'Electric', level: 8, description: 'Ratón eléctrico, ágil y rápido.' },
    { id: 1, name: 'Bulbasaur', hp: 30, maxHP: 45, sprite: '/bulbasaur.svg', type: ['Grass', 'Poison'], level: 7, description: 'Planta inicial con una semilla en su espalda.' },
    { id: 4, name: 'Charmander', hp: 12, maxHP: 39, sprite: '/charmander.svg', type: 'Fire', level: 6, description: 'Pequeño lagarto con cola ardiente.' },
  ])

  // Inventory
  const pokeballs = ref<number>(5)
  const money = ref<number>(1200)

  function healTeam() {
    pokemons.value = pokemons.value.map(p => ({ ...p, hp: p.maxHP }))
  }

  function spendMoney(amount: number) {
    if (money.value >= amount) {
      money.value -= amount
      return true
    }
    return false
  }

  function addPokeballs(qty = 1) {
    pokeballs.value += qty
  }

  function addPokemon(p: TeamPokemon) {
    pokemons.value.push(p)
  }

  return { pokemons, pokeballs, money, healTeam, spendMoney, addPokeballs, addPokemon }
})
