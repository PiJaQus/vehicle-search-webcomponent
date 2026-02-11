<script setup>
import { ref } from 'vue'

const props = defineProps({
  manufacturers: { type: Array, default: () => [] },
  fuelTypes: { type: Array, default: () => [] },
  selectedManufacturer: { type: String, default: '' },
  selectedFuelType: { type: String, default: '' },
  maxPrice: { type: [String, Number], default: '' },
  selectedCategory: { type: String, default: '' },
})

const emit = defineEmits([
  'update:selectedManufacturer',
  'update:selectedFuelType',
  'update:maxPrice',
  'clear',
  'update:selectedCategory',
])


const activeType = ref('LIMOUSINE') 

const setActive = (type) => {
  activeType.value = type
  emit('update:selectedCategory', type)
}
</script>

<template>
  <div class="panel">
    <div class="section">
      <div class="sectionTitle">Marke und Model</div>

      <label class="label">Hersteller</label>
      <select
        :value="selectedManufacturer"
        class="control"
        @change="emit('update:selectedManufacturer', $event.target.value)"
      >
        <option value="">Alle</option>
        <option v-for="m in manufacturers" :key="m" :value="m">{{ m }}</option>
      </select>

      <label class="label" style="margin-top:12px;">Kraftstoff</label>
      <select
        :value="selectedFuelType"
        class="control"
        @change="emit('update:selectedFuelType', $event.target.value)"
      >
        <option value="">Alle</option>
        <option v-for="f in fuelTypes" :key="f" :value="f">{{ f }}</option>
      </select>

      <label class="label" style="margin-top:12px;">Max. Preis in €</label>
      <input
        type="number"
        placeholder="z. B. 30000"
        :value="maxPrice"
        class="control"
        min="0"
        @input="emit('update:maxPrice', $event.target.value)"
      />
      <div class="help">Preis in €</div>
    </div>

    <div class="actions">
      <button type="button" class="btnGhost" @click="emit('clear')">
        Zurücksetzen
      </button>
    </div>
  </div>
</template>

<style scoped>
.panel {
  background: #fff;
  padding: 14px;
  position: sticky;
  top: 12px;
  overflow: hidden;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
}

/* 4 ikonki obok siebie */
.iconRow{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 12px;
}

.iconBtn{
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.10);
  background: #fff;
  cursor: pointer;
  display: grid;
  place-items: center;
  padding: 0;
  transition: border-color 120ms ease, box-shadow 120ms ease, transform 120ms ease;
}

.iconBtn:hover{
  transform: translateY(-1px);
}

/* aktywne = tylko jedno na raz */
.iconBtn.active{
  box-shadow: 0 10px 18px rgba(0,0,0,0.10);
}

.iconImg{
  width: 63px;
  height: 35px;
  object-fit: contain;
  display: block;
}

/* reszta bez zmian */
.section { padding: 8px 0; }

.sectionTitle {
  font-weight: 950;
  font-size: 13px;
  color: rgba(0,0,0,0.70);
  margin-bottom: 8px;
}

.label {
  display: block;
  font-size: 12.5px;
  font-weight: 950;
  margin: 10px 0 6px;
  color: rgba(0,0,0,0.62);
}

.control {
  width: 100%;
  box-sizing: border-box;
  height: 44px;
  padding: 0 12px;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(0,0,0,0.02);
  font-weight: 850;
  outline: none;
}
.control:focus { background: #fff; border-color: rgba(0,0,0,0.22); }

.help { margin-top: 6px; font-size: 12px; opacity: 0.6; font-weight: 700; }

.actions { margin-top: 12px; display: flex; }
.btnGhost {
  width: 100%;
  height: 44px;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  background: #fff;
  font-weight: 950;
  cursor: pointer;
}
</style>
