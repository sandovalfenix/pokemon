import type { Pokemon } from '@/types/pokemon'
import type { Route, Trainer, WildEncounter } from '@/types/route'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { routesData } from '@/data/routes'

export const useRoutesStore = defineStore('routes', () => {
  // Estado
  const routes = ref<Route[]>(routesData)
  const currentRouteId = ref<number | null>(1) // Empieza en Ruta 1
  const isExploring = ref(false)
  const steps = ref(0)
  const visitedRoutes = ref<number[]>([1])

  // Encuentro actual (si hay uno)
  const currentEncounter = ref<{ type: 'wild' | 'trainer'; data: Pokemon | Trainer } | null>(null)

  // Ruta actual
  const currentRoute = computed(() => {
    if (!currentRouteId.value) return null
    return routes.value.find(r => r.id === currentRouteId.value) ?? null
  })

  // Rutas conectadas disponibles
  const availableRoutes = computed(() => {
    if (!currentRoute.value) return []
    return routes.value.filter(
      r => currentRoute.value!.connectedRoutes.includes(r.id) && r.unlocked
    )
  })

  // Entrenadores no derrotados en la ruta actual
  const remainingTrainers = computed(() => {
    if (!currentRoute.value) return []
    return currentRoute.value.trainers.filter(t => !t.defeated)
  })

  // Entrar a una ruta
  const enterRoute = (routeId: number) => {
    const route = routes.value.find(r => r.id === routeId)
    if (!route || !route.unlocked) return false

    currentRouteId.value = routeId
    isExploring.value = true
    steps.value = 0

    // Registrar visita
    if (!visitedRoutes.value.includes(routeId)) {
      visitedRoutes.value.push(routeId)
    }

    return true
  }

  // Viajar a una ruta conectada
  const travelTo = (routeId: number) => {
    if (!currentRoute.value) return false
    if (!currentRoute.value.connectedRoutes.includes(routeId)) return false

    const targetRoute = routes.value.find(r => r.id === routeId)
    if (!targetRoute || !targetRoute.unlocked) return false

    return enterRoute(routeId)
  }

  // Caminar (posible encuentro salvaje)
  const walk = (): { encountered: boolean; pokemon?: Pokemon } => {
    if (!currentRoute.value || !isExploring.value) {
      return { encountered: false }
    }

    steps.value++

    // 20% de probabilidad base de encuentro al caminar
    const encounterChance = Math.random() * 100
    if (encounterChance > 20) {
      return { encountered: false }
    }

    // Determinar qué Pokémon aparece basado en encounterRate
    const pokemon = rollWildEncounter(currentRoute.value.wildPokemons)
    if (!pokemon) {
      return { encountered: false }
    }

    // Generar Pokémon con nivel aleatorio
    const level = Math.floor(
      Math.random() * (pokemon.maxLevel - pokemon.minLevel + 1) + pokemon.minLevel
    )

    const wildPokemon: Pokemon = {
      id: pokemon.pokemonId,
      name: pokemon.name,
      hp: 10 + level * 2,
      attack: 20 + level * 3,
      defense: 15 + level * 2,
    }

    currentEncounter.value = { type: 'wild', data: wildPokemon }

    return { encountered: true, pokemon: wildPokemon }
  }

  // Calcular qué Pokémon salvaje aparece
  const rollWildEncounter = (encounters: WildEncounter[]): WildEncounter | null => {
    const roll = Math.random() * 100
    let cumulative = 0

    for (const encounter of encounters) {
      cumulative += encounter.encounterRate
      if (roll <= cumulative) {
        return encounter
      }
    }

    return null
  }

  // Pelear contra un entrenador
  const challengeTrainer = (trainerId: number): Trainer | null => {
    if (!currentRoute.value) return null

    const trainer = currentRoute.value.trainers.find(t => t.id === trainerId)
    if (!trainer || trainer.defeated) return null

    currentEncounter.value = { type: 'trainer', data: trainer }
    return trainer
  }

  // Marcar entrenador como derrotado
  const defeatTrainer = (trainerId: number) => {
    if (!currentRoute.value) return

    const trainer = currentRoute.value.trainers.find(t => t.id === trainerId)
    if (trainer) {
      trainer.defeated = true
    }
  }

  // Desbloquear una ruta
  const unlockRoute = (routeId: number) => {
    const route = routes.value.find(r => r.id === routeId)
    if (route) {
      route.unlocked = true
    }
  }

  // Limpiar encuentro actual
  const clearEncounter = () => {
    currentEncounter.value = null
  }

  // Salir de exploración
  const exitExploring = () => {
    isExploring.value = false
    currentEncounter.value = null
  }

  return {
    // Estado
    routes,
    currentRouteId,
    isExploring,
    steps,
    visitedRoutes,
    currentEncounter,

    // Computed
    currentRoute,
    availableRoutes,
    remainingTrainers,

    // Acciones
    enterRoute,
    travelTo,
    walk,
    challengeTrainer,
    defeatTrainer,
    unlockRoute,
    clearEncounter,
    exitExploring,
  }
})
