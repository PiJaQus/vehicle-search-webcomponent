<script setup>
import { ref, computed } from 'vue'
import { vehicles } from './data/vehicles'

import VehicleFilters from './components/VehicleFilters.vue'
import VehicleGrid from './components/VehicleGrid.vue'

// filter state
const selectedManufacturer = ref('')
const selectedFuelType = ref('')
const maxPrice = ref('')

// options (static, simple)
const manufacturers = [...new Set(vehicles.map(v => v.manufacturer))].sort()
const fuelTypes = [...new Set(vehicles.map(v => v.fuelType))].sort()

// filtered list
const filteredVehicles = computed(() => {
  return vehicles.filter(v => {
    if (selectedManufacturer.value && v.manufacturer !== selectedManufacturer.value) return false
    if (selectedFuelType.value && v.fuelType !== selectedFuelType.value) return false
    if (maxPrice.value && v.price > Number(maxPrice.value)) return false
    return true
  })
})

const clearFilters = () => {
  selectedManufacturer.value = ''
  selectedFuelType.value = ''
  maxPrice.value = ''
}

const hasActiveFilters = computed(() => {
  return !!(selectedManufacturer.value || selectedFuelType.value || maxPrice.value)
})

const removeFilter = (key) => {
  if (key === 'manufacturer') selectedManufacturer.value = ''
  if (key === 'fuel') selectedFuelType.value = ''
  if (key === 'price') maxPrice.value = ''
}

const count = computed(() => filteredVehicles.value.length)

const formatPrice = (value) => new Intl.NumberFormat('de-DE').format(value) + ' €'
const formatKm = (value) => new Intl.NumberFormat('de-DE').format(value) + ' km'
</script>

<template>
  <div class="page">
    <header class="topbar">
      <div>
        <h1 class="headline">Fahrzeugsuche</h1>
        <p class="subtitle">Wähle Filter aus und entdecke passende Fahrzeuge.</p>
      </div>

      <div class="resultInfo">
        <div class="count">{{ count }} Treffer</div>
      </div>
    </header>

    <div class="layout">
      <!-- LEFT: Filters -->
      <aside class="sidebar" aria-label="Filters">
        <VehicleFilters
          v-model:selectedManufacturer="selectedManufacturer"
          v-model:selectedFuelType="selectedFuelType"
          v-model:maxPrice="maxPrice"
          :manufacturers="manufacturers"
          :fuelTypes="fuelTypes"
          @clear="clearFilters"
        />
      </aside>

      <!-- RIGHT: Listing -->
      <main class="content" aria-label="Vehicle listing">
        <!-- Active filter chips -->
        <div v-if="hasActiveFilters" class="chips" aria-label="Active filters">
          <button
            v-if="selectedManufacturer"
            class="chip"
            type="button"
            @click="removeFilter('manufacturer')"
            title="Filter entfernen"
          >
            Hersteller: {{ selectedManufacturer }} <span>×</span>
          </button>

          <button
            v-if="selectedFuelType"
            class="chip"
            type="button"
            @click="removeFilter('fuel')"
            title="Filter entfernen"
          >
            Kraftstoff: {{ selectedFuelType }} <span>×</span>
          </button>

          <button
            v-if="maxPrice"
            class="chip"
            type="button"
            @click="removeFilter('price')"
            title="Filter entfernen"
          >
            Max. Preis: {{ formatPrice(Number(maxPrice)) }} <span>×</span>
          </button>
        </div>

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
</template>

<style scoped>
/* Page shell */
.page {
  padding: 24px 16px 40px;
  max-width: 1180px;
  margin: 0 auto;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
}

/* Top bar */
.topbar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.headline {
  margin: 0;
  font-size: 24px;
  letter-spacing: -0.02em;
}

.subtitle {
  margin: 6px 0 0;
  opacity: 0.75;
}

.resultInfo {
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
}

.count {
  font-weight: 700;
  padding: 8px 10px;
  border: 1px solid rgba(0,0,0,0.10);
  border-radius: 12px;
  background: rgba(0,0,0,0.02);
}

/* Layout */
.layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 16px;
  align-items: start;
}

/* Content */
.content {
  min-width: 0;
}

/* Active chips */
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.chip {
  border: 1px solid rgba(0,0,0,0.12);
  background: rgba(0,0,0,0.03);
  border-radius: 999px;
  padding: 8px 10px;
  font-size: 13px;
  cursor: pointer;
}

.x {
  margin-left: 6px;
  font-weight: 900;
}

</style>
