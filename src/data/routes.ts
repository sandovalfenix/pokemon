import type { Route } from '@/types/route'

export const routesData: Route[] = [
  {
    id: 1,
    name: 'Ruta 1',
    description: 'Un camino tranquilo entre Pueblo Paleta y Ciudad Verde. Ideal para entrenadores novatos.',
    type: 'grass',
    wildPokemons: [
      { pokemonId: 16, name: 'Pidgey', minLevel: 2, maxLevel: 5, encounterRate: 50 },
      { pokemonId: 19, name: 'Rattata', minLevel: 2, maxLevel: 4, encounterRate: 50 },
    ],
    trainers: [],
    connectedRoutes: [2],
    unlocked: true,
  },
  {
    id: 2,
    name: 'Ruta 2',
    description: 'Un sendero que conecta Ciudad Verde con el Bosque Verde.',
    type: 'grass',
    wildPokemons: [
      { pokemonId: 16, name: 'Pidgey', minLevel: 3, maxLevel: 6, encounterRate: 40 },
      { pokemonId: 19, name: 'Rattata', minLevel: 3, maxLevel: 6, encounterRate: 40 },
      { pokemonId: 10, name: 'Caterpie', minLevel: 3, maxLevel: 5, encounterRate: 20 },
    ],
    trainers: [
      {
        id: 1,
        name: 'Joven Carlos',
        pokemons: [
          { id: 19, name: 'Rattata', hp: 15, attack: 56, defense: 35 },
        ],
        defeated: false,
        reward: 100,
        dialogue: {
          before: '¡Hey! ¿Eres un entrenador? ¡Vamos a pelear!',
          after: 'Vaya... eres muy fuerte.',
        },
      },
    ],
    connectedRoutes: [1, 3],
    unlocked: true,
  },
  {
    id: 3,
    name: 'Bosque Verde',
    description: 'Un denso bosque lleno de Pokémon tipo Bicho. Fácil perderse aquí.',
    type: 'forest',
    wildPokemons: [
      { pokemonId: 10, name: 'Caterpie', minLevel: 3, maxLevel: 6, encounterRate: 30 },
      { pokemonId: 13, name: 'Weedle', minLevel: 3, maxLevel: 6, encounterRate: 30 },
      { pokemonId: 11, name: 'Metapod', minLevel: 4, maxLevel: 6, encounterRate: 15 },
      { pokemonId: 14, name: 'Kakuna', minLevel: 4, maxLevel: 6, encounterRate: 15 },
      { pokemonId: 25, name: 'Pikachu', minLevel: 3, maxLevel: 5, encounterRate: 10 },
    ],
    trainers: [
      {
        id: 2,
        name: 'Cazabichos Pedro',
        pokemons: [
          { id: 10, name: 'Caterpie', hp: 12, attack: 30, defense: 35 },
          { id: 13, name: 'Weedle', hp: 12, attack: 35, defense: 30 },
        ],
        defeated: false,
        reward: 150,
        dialogue: {
          before: '¡Los Pokémon bicho son los mejores!',
          after: 'Quizás necesito más entrenamiento...',
        },
      },
      {
        id: 3,
        name: 'Cazabichos Ana',
        pokemons: [
          { id: 11, name: 'Metapod', hp: 18, attack: 20, defense: 55 },
        ],
        defeated: false,
        reward: 120,
        dialogue: {
          before: '¡Mi Metapod es invencible!',
          after: 'Bueno, al menos tiene buena defensa...',
        },
      },
    ],
    connectedRoutes: [2, 4],
    unlocked: false,
  },
  {
    id: 4,
    name: 'Cueva Oscura',
    description: 'Una cueva misteriosa donde habitan Pokémon de tipo Roca y algunos raros.',
    type: 'cave',
    wildPokemons: [
      { pokemonId: 41, name: 'Zubat', minLevel: 6, maxLevel: 10, encounterRate: 50 },
      { pokemonId: 74, name: 'Geodude', minLevel: 6, maxLevel: 10, encounterRate: 35 },
      { pokemonId: 95, name: 'Onix', minLevel: 8, maxLevel: 12, encounterRate: 15 },
    ],
    trainers: [
      {
        id: 4,
        name: 'Montañero Luis',
        pokemons: [
          { id: 74, name: 'Geodude', hp: 25, attack: 80, defense: 100 },
          { id: 74, name: 'Geodude', hp: 25, attack: 80, defense: 100 },
        ],
        defeated: false,
        reward: 250,
        dialogue: {
          before: '¡Esta cueva es mi territorio!',
          after: 'Impresionante... pasa si quieres.',
        },
      },
    ],
    connectedRoutes: [3],
    unlocked: false,
  },
]
