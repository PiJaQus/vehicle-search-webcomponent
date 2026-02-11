<script setup>
import { ref, computed } from 'vue'
import { vehicles } from './data/vehicles'

import VehicleFilters from './components/VehicleFilters.vue'
import VehicleGrid from './components/VehicleGrid.vue'

// filter state
const selectedManufacturer = ref('')
const selectedFuelType = ref('')
const maxPrice = ref('')
const selectedCategory = ref('')
const searchQuery = ref('')

// options (static, simple)
const manufacturers = [...new Set(vehicles.map(v => v.manufacturer))].sort()
const fuelTypes = [...new Set(vehicles.map(v => v.fuelType))].sort()

// filtered list
const filteredVehicles = computed(() => {
  return vehicles.filter(v => {
    if (selectedManufacturer.value && v.manufacturer !== selectedManufacturer.value) return false
    if (selectedFuelType.value && v.fuelType !== selectedFuelType.value) return false
    if (maxPrice.value && v.price > Number(maxPrice.value)) return false
    if (selectedCategory.value && v.category !== selectedCategory.value) return false
    return true
  })
})

const clearFilters = () => {
  selectedManufacturer.value = ''
  selectedFuelType.value = ''
  maxPrice.value = ''
  selectedCategory.value = ''
}

const hasActiveFilters = computed(() => {
  return !!(selectedManufacturer.value || selectedFuelType.value || maxPrice.value || selectedCategory.value)
})

const removeFilter = (key) => {
  if (key === 'manufacturer') selectedManufacturer.value = ''
  if (key === 'fuel') selectedFuelType.value = ''
  if (key === 'price') maxPrice.value = ''
  if (key === 'category') selectedCategory.value = ''
}

const count = computed(() => filteredVehicles.value.length)

const formatPrice = (value) => new Intl.NumberFormat('de-DE').format(value) + ' €'
const formatKm = (value) => new Intl.NumberFormat('de-DE').format(value) + ' km'
</script>

<template>
  <div class="shell">
    <header class="top">
      <div class="topInner">
        <div class="searchWrap">
          <input
            v-model="searchQuery"
            class="search"
            placeholder="Suche nach Hersteller, Modell..."
            type="text"

          />
          <div class="hits">
          <strong>{{ count }}</strong> Treffer
        </div>
        </div>
      </div>

      <div v-if="hasActiveFilters" class="chipsRow" aria-label="Active filters">
        <button
          v-if="selectedManufacturer"
          class="chip"
          type="button"
          @click="removeFilter('manufacturer')"
        >
          {{ selectedManufacturer }} <span class="x">×</span>
        </button>

        <button
          v-if="selectedCategory"
          class="chip"
          type="button"
          @click="removeFilter('category')"
        >
        {{ selectedCategory }} <span class="x">×</span>
        </button>

        <button
          v-if="maxPrice"
          class="chip"
          type="button"
          @click="removeFilter('price')"
        >
          bis {{ formatPrice(Number(maxPrice)) }} <span class="x">×</span>
        </button>

        <button
          v-if="selectedFuelType"
          class="chip"
          type="button"
          @click="removeFilter('fuel')"
        >
          {{ selectedFuelType }} <span class="x">×</span>
        </button>

        <button class="chip ghost" type="button" @click="clearFilters">
          Alle löschen
        </button>
      </div>
    </header>

    <div class="page">
      <div class="layout">
      <!-- LEFT: Filters -->
        <aside class="sidebar" aria-label="Filters">
          <VehicleFilters
            v-model:selectedManufacturer="selectedManufacturer"
            v-model:selectedFuelType="selectedFuelType"
            v-model:maxPrice="maxPrice"
            v-model:selectedCategory="selectedCategory"
            :manufacturers="manufacturers"
            :fuelTypes="fuelTypes"
            @clear="clearFilters"
          />
        </aside>

        <main class="content" aria-label="Vehicle listing">
          <VehicleGrid
            :vehicles="filteredVehicles"
            :count="count"
            :formatPrice="formatPrice"
            :formatKm="formatKm"
            @clear="clearFilters"
          />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shell {
  background: #f6f7f8;
  min-height: 100vh;
  color: #0f0f10;

}

.top {
  background: #fff;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}

.topInner{
  max-width: 1240px;
  margin: 0 auto;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 0;              
}

.searchWrap{
  position: relative;
  flex: 1;
  height: 52px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.12);
  display: flex;
  align-items: center;
  padding-left: 16px;

}

.search{
  width: 100%;
  height: 100%;
  border: 0;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: rgba(0,0,0,0.85);
}

.search::placeholder{
  color: rgba(0,0,0,0.45);
  font-weight: 600;
}

.hits{
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 13px;
  font-weight: 800;
  color: rgba(0,0,0,0.72);
  white-space: nowrap;
}

.searchWrap:focus-within{
  border-color: rgba(0,0,0,0.28);
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}

.searchBtn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.10);
  background: #fff;
  display: grid;
  place-items: center;
  cursor: not-allowed; 
  opacity: 0.9;
  color: rgba(0,0,0,0.8);
}

.hits {
  white-space: nowrap;
  font-size: 13px;
  color: rgba(0,0,0,0.62);
}

.chipsRow {
  max-width: 1220px;
  margin: 0 auto;
  padding: 0 18px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.chip {
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(0,0,0,0.02);
  border-radius: 999px;
  padding: 9px 12px;
  font-size: 13px;
  cursor: pointer;
  font-weight: 800;
}
.chip .x { margin-left: 8px; opacity: 0.7; }
.chip.ghost { background: transparent; }

.page {
  max-width: 1220px;
  margin: 0 auto;
  padding: 16px 18px 44px;
}

.layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 16px;
  align-items: start;
}

.content { min-width: 0; }

@media (max-width: 980px) {
  .layout { grid-template-columns: 1fr; }
  .hits { display: none; }
}
</style>
