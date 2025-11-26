<script setup lang="ts">
import { ref } from 'vue'
import { useBackpackStore, type Item } from '@/stores/backpack'
import { storeToRefs } from 'pinia'

const store = useBackpackStore()
const { items, slots, occupiedSlots } = storeToRefs(store)

// -- DATOS DE PRUEBA: OBJETOS EN EL MUNDO (Derecha) --
const worldItems = ref<Item[]>([
  { 
    id: 'master-ball', 
    name: 'Master Ball', 
    icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png', 
    qty: 1, 
    description: 'Captura infalible' 
  },
  { 
    id: 'super-potion', 
    name: 'Super Poción', 
    icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/super-potion.png', 
    qty: 3, 
    description: 'Restaura 50 PS' 
  },
  { 
    id: 'nugget', 
    name: 'Pepita', 
    icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/nugget.png', 
    qty: 1, 
    description: 'Vale 5000 monedas' 
  },
  { 
    id: 'rare-candy', 
    name: 'Caramelo Raro', 
    icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png', 
    qty: 5, 
    description: 'Sube nivel' 
  },
  { 
    id: 'antidote', 
    name: 'Antídoto', 
    icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/antidote.png', 
    qty: 2, 
    description: 'Cura veneno' 
  },
])

const message = ref('¡Bienvenido entrenador! Gestiona tu inventario.')

// -- LÓGICA: Mover del Mundo a la Mochila --
function recogerObjeto(item: Item, index: number) {
  // Intentamos agregar 1 unidad a la mochila
  const itemToAdd = { ...item, qty: 1 }
  const success = store.addItem(itemToAdd)

  if (success) {
    message.value = `Has recogido: ${item.name}`
    // Restamos del mundo
    worldItems.value[index].qty--
    // Si se acaban en el mundo, lo quitamos de la lista visual
    if (worldItems.value[index].qty <= 0) {
      worldItems.value.splice(index, 1)
    }
  } else {
    message.value = '¡No hay espacio en la mochila!'
  }
}

// -- LÓGICA: Mover de la Mochila al Mundo (Tirar) --
function tirarObjeto(item: Item) {
  store.removeItem(item.id, 1)
  
  // Lo devolvemos al "mundo"
  const existingWorldItem = worldItems.value.find(i => i.id === item.id)
  if (existingWorldItem) {
    existingWorldItem.qty++
  } else {
    // Si no estaba en la lista visible del mundo, lo agregamos de nuevo
    worldItems.value.push({ ...item, qty: 1 })
  }
  message.value = `Has tirado: ${item.name}`
}
</script>

<template>
  <div class="game-ui">
    
    <div class="game-header">
      <h1>POKÉ-BAG SYSTEM</h1>
      <div class="message-box">
        <span>{{ message }}</span>
      </div>
    </div>

    <div class="main-container">
      
      <section class="panel backpack-panel">
        <header class="panel-header bg-blue">
          <h2>MOCHILA</h2>
          <span class="badge">{{ occupiedSlots }} / {{ slots }}</span>
        </header>
        
        <div class="grid-container">
          <div 
            v-for="item in items" 
            :key="item.id" 
            class="slot filled"
            @click="tirarObjeto(item)"
          >
            <div class="icon-wrapper">
              <img :src="item.icon" :alt="item.name" class="pixel-art" />
            </div>
            
            <div class="qty-badge">x{{ item.qty }}</div>

            <div class="tooltip">{{ item.name }}</div>
          </div>

          <div 
            v-for="n in (slots - occupiedSlots)" 
            :key="'empty-'+n" 
            class="slot empty"
          ></div>
        </div>
        
        <div class="panel-footer">
          Clic en un objeto para tirarlo
        </div>
      </section>

      <section class="panel world-panel">
        <header class="panel-header bg-red">
          <h2>OBJETOS CERCANOS</h2>
        </header>

        <div class="list-container">
          <div 
            v-for="(item, idx) in worldItems" 
            :key="idx" 
            class="world-item"
            @click="recogerObjeto(item, idx)"
          >
            <div class="w-left">
              <img :src="item.icon" class="pixel-art" style="width:32px; height:32px;" />
            </div>
            <div class="w-info">
              <div class="w-header">
                <span class="w-name">{{ item.name }}</span>
                <span class="w-qty-avail">x{{ item.qty }} Disp.</span>
              </div>
              <span class="w-desc">{{ item.description }}</span>
            </div>
            <button class="btn-action">RECOGER</button>
          </div>

          <div v-if="worldItems.length === 0" class="empty-msg">
            No hay más objetos aquí.
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>
/* FUENTE RETRO */
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

/* ESTILOS GLOBALES DEL JUEGO */
.game-ui {
  font-family: 'VT323', monospace;
  background-color: #2c3e50; /* Fondo oscuro general */
  min-height: 100vh;
  padding: 20px;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* UTILIDAD PIXEL ART: Evita que las imágenes se vean borrosas */
.pixel-art {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

/* HEADER Y CAJA DE MENSAJES */
.game-header {
  width: 100%;
  max-width: 950px;
  margin-bottom: 20px;
  text-align: center;
}

.game-header h1 {
  color: #f1c40f;
  text-shadow: 3px 3px 0 #c0392b;
  font-size: 3.5rem;
  margin: 0 0 10px 0;
  letter-spacing: 2px;
}

.message-box {
  background: #fff;
  border: 4px double #333;
  border-radius: 6px;
  padding: 12px 20px;
  font-size: 1.6rem;
  text-align: left;
  box-shadow: 0 5px 0 rgba(0,0,0,0.3);
}

/* CONTENEDOR PRINCIPAL (2 COLUMNAS) */
.main-container {
  display: flex;
  gap: 30px;
  width: 100%;
  max-width: 950px;
  align-items: flex-start;
}

/* PANELES (Mochila y Mundo) */
.panel {
  background: #f0f0f0;
  border-radius: 10px;
  border: 4px solid #444;
  box-shadow: 8px 8px 0 rgba(0,0,0,0.4);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 4px solid #444;
  color: white;
}
.panel-header h2 { margin: 0; font-size: 1.8rem; }
.badge { background: rgba(0,0,0,0.4); padding: 2px 8px; border-radius: 4px; font-size: 1.4rem; }

.bg-blue { background: #3498db; }
.bg-red { background: #e74c3c; }

/* === ESTILOS MOCHILA (IZQUIERDA) === */
.backpack-panel {
  flex: 6; /* Ocupa el 60% aprox */
  width: 600px;
}

.grid-container {
  display: grid;
  /* 3 COLUMNAS GRANDES */
  grid-template-columns: repeat(3, 1fr); 
  gap: 15px;
  padding: 20px;
  background: #bdc3c7;
  max-height: 500px;
  overflow-y: auto;
}

/* SLOT INDIVIDUAL */
.slot {
  height: 120px; /* Cuadrado grande */
  background: #fff;
  border: 4px inset #ecf0f1;
  border-radius: 8px;
  margin-top:20%;
  
  /* FLEX COLUMN PARA PONER CANTIDAD ABAJO */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  
  position: relative;
  cursor: pointer;
  transition: transform 0.1s;
}

.slot.filled:hover {
  background: #ffeaa7; /* Amarillo selección */
  border-color: #f1c40f;
  border-style: solid;
  transform: translateY(-3px);
  box-shadow: 0 4px 0 rgba(0,0,0,0.1);
}

.slot.empty {
  background: #e5e5e5;
  cursor: default;
}
.slot.empty::after {
  content: "---";
  color: #bdc3c7;
  font-size: 2rem;
}

/* IMAGEN DENTRO DEL SLOT */
.icon-wrapper img {
  width: 50px;
  height: 50px;
}

/* CANTIDAD (x5) */
.qty-badge {
  font-size: 1.4rem;
  font-weight: bold;
  color: #2c3e50;
  background: rgba(0,0,0,0.08);
  padding: 2px 12px;
  border-radius: 12px;
}

/* TOOLTIP */
.tooltip {
  display: none;
  position: absolute;
  top: -40px;
  background: #2c3e50;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 1rem;
  z-index: 10;
  white-space: nowrap;
  box-shadow: 2px 2px 0 #000;
}
.slot.filled:hover .tooltip { display: block; }

.panel-footer {
  background: #333;
  color: #fff;
  text-align: center;
  padding: 8px;
  font-size: 1.1rem;
}

/* === ESTILOS MUNDO (DERECHA) === */
.world-panel {
  flex: 4; /* Ocupa el 40% aprox */
}

.list-container {
  padding: 15px;
  background: #ecf0f1;
  flex-grow: 1;
  min-height: 400px;
}

.world-item {
  display: flex;
  align-items: center;
  background: #fff;
  border: 2px solid #95a5a6;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 12px;
  box-shadow: 0 4px 0 #bdc3c7;
  transition: all 0.1s;
  cursor: pointer;
}

.world-item:active {
  transform: translateY(4px);
  box-shadow: none;
}

.w-left { margin-right: 12px; }
.w-info { flex: 1; display: flex; flex-direction: column; }
.w-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; }
.w-name { font-weight: bold; font-size: 1.3rem; }
.w-qty-avail { font-size: 1rem; color: #e67e22; font-weight: bold; margin-right: 10px; }
.w-desc { color: #7f8c8d; font-size: 1rem; line-height: 1.1; }

.btn-action {
  background: #27ae60;
  border: none;
  color: white;
  padding: 8px 6px;
  font-family: inherit;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  min-width: 70px;
}

.empty-msg {
  text-align: center;
  color: #95a5a6;
  margin-top: 30px;
  font-size: 1.4rem;
}

/* RESPONSIVE */
@media (max-width: 800px) {
  .main-container { flex-direction: column; }
  .grid-container { grid-template-columns: repeat(3, 1fr); }
  .backpack-panel, .world-panel { width: 100%; }
}
</style>