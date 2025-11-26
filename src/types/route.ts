import type { Pokemon } from './pokemon'

export type RouteType = 'grass' | 'cave' | 'water' | 'city' | 'forest'

export interface WildEncounter {
  pokemonId: number
  name: string
  minLevel: number
  maxLevel: number
  encounterRate: number // 0-100 probabilidad de encuentro
}

export interface Trainer {
  id: number
  name: string
  sprite?: string
  pokemons: Pokemon[]
  defeated: boolean
  reward: number // Dinero al ganar
  dialogue: {
    before: string
    after: string
  }
}

export interface Route {
  id: number
  name: string
  description: string
  type: RouteType
  wildPokemons: WildEncounter[]
  trainers: Trainer[]
  connectedRoutes: number[] // IDs de rutas conectadas
  unlocked: boolean
  backgroundImage?: string
}

export interface RouteState {
  currentRouteId: number | null
  visitedRoutes: number[]
  isExploring: boolean
  steps: number
}
