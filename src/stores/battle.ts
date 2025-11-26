import type { Pokemon } from '@/types/pokemon'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

export const useBattleStore = defineStore('battle', () => {
  // my pokemons
  const pokemons = ref([{ id: 1, name: 'Bulbasaur', hp: 10, attack: 44, defense: 49 }])

  // opponent pokemons
  const opponentPokemons = ref([{ id: 4, name: 'Charmander', hp: 10, attack: 52, defense: 43 }])

  const attacker = ref(true)

  // attack function
  const attackPokemon = (pokemonAttack: Ref<Pokemon[]>, pokemonDefense: Ref<Pokemon[]>) => {
    // tolerate both: refs passed from script (have `.value`) and unwrapped arrays passed from templates
    const attackArr: Pokemon[] = pokemonAttack && pokemonAttack.value ? pokemonAttack.value : pokemonAttack as unknown as Pokemon[]
    const defendArr: Pokemon[] = pokemonDefense && pokemonDefense.value ? pokemonDefense.value : pokemonDefense as unknown as Pokemon[]

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
        alert('Opponent is attacking!')
        attackPokemon(opponentPokemons, pokemons)
      }, 1000)
    }
  }

  const gameOver = computed(() => {
    const myHp = pokemons.value[0]?.hp ?? 1
    const oppHp = opponentPokemons.value[0]?.hp ?? 1
    return myHp <= 0 || oppHp <= 0
  })

  const winner = computed(() => {
    const myHp = pokemons.value[0]?.hp ?? 1
    const oppHp = opponentPokemons.value[0]?.hp ?? 1
    if (myHp <= 0) return 'opponent'
    if (oppHp <= 0) return 'player'
    return null
  })

  return { pokemons, opponentPokemons, attacker, attackPokemon, gameOver, winner }
})
