import { defineStore } from 'pinia'

export interface Item {
  id: string
  name: string
  icon: string // Ahora será una URL
  qty: number
  description?: string
}

export const useBackpackStore = defineStore('backpack', {
  state: () => ({
    slots: 10,
    items: [
      { 
        id: 'potion', 
        name: 'Poción', 
        icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png', 
        qty: 5, 
        description: 'Restaura 20 PS' 
      },
      { 
        id: 'pokeball', 
        name: 'Poké Ball', 
        icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png', 
        qty: 10, 
        description: 'Captura Pokémon' 
      },
      { 
        id: 'revive', 
        name: 'Revivir', 
        icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/revive.png', 
        qty: 1, 
        description: 'Revive Pokémon' 
      },
    ] as Item[],
  }),
  // ... (Getters y Actions se mantienen igual) ...
  getters: {
    occupiedSlots: (state) => state.items.length,
    isFull: (state) => state.items.length >= state.slots
  },
  actions: {
    removeItem(id: string, amount: number = 1) {
      const idx = this.items.findIndex(i => i.id === id)
      if (idx === -1) return false
      this.items[idx].qty -= amount
      if (this.items[idx].qty <= 0) this.items.splice(idx, 1)
      return true
    },
    addItem(newItem: Item) {
      const existing = this.items.find(i => i.id === newItem.id)
      if (existing) {
        existing.qty += newItem.qty
        return true
      } else {
        if (this.items.length < this.slots) {
          this.items.push({ ...newItem }) 
          return true
        } else return false
      }
    }
  }
})