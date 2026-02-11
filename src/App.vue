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
        <img src="./assets/digital35.png" alt="digital35" class="iconImg" />
        <div class="searchWrap">
          <input
            v-model="searchQuery"
            class="search"
            placeholder="Suche nach Hersteller, Modell..."
            type="text"

          />
          <button class="searchBtn" type="button" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke-width="2" stroke="currentColor" width="18" height="18">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
            </svg>
          </button>
        </div>

        <button class="sortBtn" type="button" aria-label="Sortieren">
          <span class="sortLabel">Sortieren</span>
          <span class="sortChevron" aria-hidden="true">▾</span>
        </button>

        <a class="topLink" href="#">Suchauftrag</a>
        <a class="topLink contact" href="#">Kontakt</a>

        <div class="hitsPill"><strong>{{ count }}</strong>  Treffer</div>
      </div>

      <div v-if="hasActiveFilters" class="chipsRow" aria-label="Active filters">
        <button v-if="selectedManufacturer" class="chip" type="button" @click="removeFilter('manufacturer')">
          {{ selectedManufacturer }} <span class="x">×</span>
        </button>

        <button v-if="selectedCategory" class="chip" type="button" @click="removeFilter('category')">
          {{ selectedCategory }} <span class="x">×</span>
        </button>

        <button v-if="maxPrice" class="chip" type="button" @click="removeFilter('price')">
          bis {{ formatPrice(Number(maxPrice)) }} <span class="x">×</span>
        </button>

        <button v-if="selectedFuelType" class="chip" type="button" @click="removeFilter('fuel')">
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
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
  gap: 14px;
}

.searchWrap{
  flex: 1;
  height: 46px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.12);
  background: rgba(0,0,0,0.015);
  display: flex;
  align-items: center;
  padding: 0 6px 0 16px;
}

.search{
  flex: 1;
  height: 100%;
  border: 0;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: rgba(0,0,0,0.85);
  font-weight: 650;
}

.search::placeholder{
  color: rgba(0,0,0,0.40);
  font-weight: 600;
}

.searchBtn{
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 0;
  background: transparent;
  display: grid;
  place-items: center;
  cursor: default;
  color: rgba(0,0,0,0.55);
}

.searchBtn svg { display: block; }

.searchWrap:focus-within{
  border-color: rgba(0,0,0,0.28);
  background: #fff;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}

.sortBtn {
  height: 46px;
  min-width: 170px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.12);
  background: rgba(0,0,0,0.015);
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0 14px;
  cursor: default;
  color: rgba(0,0,0,0.70);
  font-weight: 750;
}

.sortChevron {
  color: rgba(0,0,0,0.45);
  font-size: 14px;
  transform: translateY(-1px);
}

.favBtn {
  position: relative;
  height: 46px;
  width: 56px;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.12);
  background: rgba(0,0,0,0.015);
  display: grid;
  place-items: center;
  cursor: default;
  color: rgba(0,0,0,0.70);
}

.topLink {
  text-decoration: none;
  color: rgba(0,0,0,0.62);
  font-weight: 750;
  font-size: 13px;
  padding: 0 2px;
  white-space: nowrap;
}
.topLink.contact { color: #2b8cff; }

.hitsPill{
  height: 46px;
  display: inline-flex;
  align-items: center;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.12);
  background: rgba(0,0,0,0.015);
  font-size: 13px;
  font-weight: 800;
  color: rgba(0,0,0,0.70);
  white-space: nowrap;
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
  .sortBtn, .topLink, .hitsPill { display: none; }
}
</style>
