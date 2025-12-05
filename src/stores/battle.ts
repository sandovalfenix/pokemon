import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

interface Pokemon {
  id: number
  name: string
  hp: number
  attack: number
  defense: number
}

export const useBattleStore = defineStore('battle', () => {
  // my pokemons
  const pokemons = ref<Pokemon[]>([{ id: 1, name: 'Bulbasaur', hp: 10, attack: 44, defense: 49 }])

  // opponent pokemons
  const opponentPokemons = ref<Pokemon[]>([{ id: 4, name: 'Charmander', hp: 10, attack: 52, defense: 43 }])

  const attacker = ref(true)

  // attack function
  const attackPokemon = (pokemonAttack: Pokemon[] | Ref<Pokemon[]>, pokemonDefense: Pokemon[] | Ref<Pokemon[]>) => {
    // tolerate both: refs passed from script (have `.value`) and unwrapped arrays passed from templates
    let attackArr: Pokemon[]
    let defendArr: Pokemon[]
    
    if (Array.isArray(pokemonAttack)) {
      attackArr = pokemonAttack
    } else {
      attackArr = pokemonAttack.value
    }
    
    if (Array.isArray(pokemonDefense)) {
      defendArr = pokemonDefense
    } else {
      defendArr = pokemonDefense.value
    }

    // validate
    if (!attackArr || !defendArr || !attackArr[0] || !defendArr[0]) return

    if (gameOver.value) return

    const attackerStats = attackArr[0]
    const defenderStats = defendArr[0]

    // calculate damage (at least 1)
    const damage = Math.max(1, attackerStats.attack - defenderStats.defense)

    defenderStats.hp = Math.max(0, defenderStats.hp - damage)

    // switch turn
    attacker.value = !attacker.value

    // if game is not over and it is now the opponent's turn, schedule their attack
    if (!gameOver.value && !attacker.value) {
      setTimeout(() => {
        alert('¡El oponente está atacando!')
        attackPokemon(opponentPokemons, pokemons)
      }, 1000)
    }
  }

  const gameOver = computed(() => {
    return (pokemons.value[0]?.hp || 0) <= 0 || (opponentPokemons.value[0]?.hp || 0) <= 0
  })

  const winner = computed(() => {
    if ((pokemons.value[0]?.hp || 0) <= 0) return 'opponent'
    if ((opponentPokemons.value[0]?.hp || 0) <= 0) return 'player'
    return null
  })

  return { pokemons, opponentPokemons, attacker, attackPokemon, gameOver, winner }
})
