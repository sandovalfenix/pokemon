import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemon', () => {
    
    // Array de pokemones con vida máxima y vida actual
    const pokemons = ref([
        { id: 1, nombre: 'Pikachu', vidaMax: 100, vidaActual: 60 },
        { id: 2, nombre: 'Charmander', vidaMax: 120, vidaActual: 40 },
        { id: 3, nombre: 'Squirtle', vidaMax: 220, vidaActual: 10 },
        { id: 4, nombre: 'Bulbasaur', vidaMax: 100, vidaActual: 50 },
        { id: 5, nombre: 'Pidgey', vidaMax: 90, vidaActual: 70 },
        { id: 6, nombre: 'Rattata', vidaMax: 80, vidaActual: 60 },
    ])

    // Cura el 20% de vidaMax cada segundo por 5 segundos
    async function curarPokemones() {
        const segundos = 5

        for (let i = 1; i <= segundos; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000))

        pokemons.value.forEach(p => {
            const cantidadCura = p.vidaMax * 0.34
            p.vidaActual = Math.min(p.vidaActual + cantidadCura, p.vidaMax)
        })
        }
    }

    return {
        pokemons,
        curarPokemones,
    }
})
