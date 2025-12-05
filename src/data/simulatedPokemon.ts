export interface SimulatedPokemon {
  id: number
  name: string
  hp: number
  maxHP: number
  type: string | string[]
  sprite: string
  level: number
}

export const simulatedPokemon: SimulatedPokemon[] = [
  {
    id: 1,
    name: 'Bulbasaur',
    hp: 30,
    maxHP: 45,
    type: ['Grass', 'Poison'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    level: 5,
  },
  {
    id: 4,
    name: 'Charmander',
    hp: 12,
    maxHP: 39,
    type: 'Fire',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
    level: 6,
  },
  {
    id: 7,
    name: 'Squirtle',
    hp: 35,
    maxHP: 44,
    type: 'Water',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
    level: 5,
  },
  {
    id: 25,
    name: 'Pikachu',
    hp: 20,
    maxHP: 35,
    type: 'Electric',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    level: 8,
  },
  {
    id: 133,
    name: 'Eevee',
    hp: 50,
    maxHP: 55,
    type: 'Normal',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png',
    level: 10,
  },
  {
    id: 39,
    name: 'Jigglypuff',
    hp: 80,
    maxHP: 115,
    type: ['Normal', 'Fairy'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png',
    level: 12,
  },
  {
    id: 94,
    name: 'Gengar',
    hp: 58,
    maxHP: 60,
    type: ['Ghost', 'Poison'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png',
    level: 18,
  },
  {
    id: 143,
    name: 'Snorlax',
    hp: 120,
    maxHP: 160,
    type: 'Normal',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png',
    level: 22,
  },
]
