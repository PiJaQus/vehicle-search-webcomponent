<script setup>
import { ref, computed } from 'vue'
import { vehicles } from './data/vehicles'

// filter state
const selectedManufacturer = ref('')
const selectedFuelType = ref('')
const maxPrice = ref('')

// options (static, simple)
const manufacturers = [...new Set(vehicles.map(v => v.manufacturer))]
const fuelTypes = [...new Set(vehicles.map(v => v.fuelType))]

// filtered list
const filteredVehicles = computed(() => {
  return vehicles.filter(v => {
    if (selectedManufacturer.value && v.manufacturer !== selectedManufacturer.value) {
      return false
    }
    if (selectedFuelType.value && v.fuelType !== selectedFuelType.value) {
      return false
    }
    if (maxPrice.value && v.price > Number(maxPrice.value)) {
      return false
    }
    return true
  })
})
const clearFilters = () => {
  selectedManufacturer.value = ''
  selectedFuelType.value = ''
  maxPrice.value = ''
}

const count = computed(() => filteredVehicles.value.length)

const formatPrice = (value) =>
  new Intl.NumberFormat('de-DE').format(value) + ' €'
</script>

<template>
  <div class="wrap">
    <header class="header">
      <h2 class="title">Vehicle Search</h2>
      <p class="sub">Found {{ count }} vehicles</p>
    </header>

    <!-- Filters -->
    <section class="filters">
      <select v-model="selectedManufacturer">
        <option value="">All manufacturers</option>
        <option v-for="m in manufacturers" :key="m" :value="m">
          {{ m }}
        </option>
      </select>

      <select v-model="selectedFuelType">
        <option value="">All fuel types</option>
        <option v-for="f in fuelTypes" :key="f" :value="f">
          {{ f }}
        </option>
      </select>

      <input
        type="number"
        placeholder="Max price (€)"
        v-model="maxPrice"
      />
      <button type="button" class="clearBtn" @click="clearFilters">
        Clear filters
      </button>
    </section>

    <!-- Listing -->
    <section class="grid" aria-label="Vehicle listing">
      <article v-for="v in filteredVehicles" :key="v.id" class="card">
        <div class="cardTitle">{{ v.manufacturer }} {{ v.model }}</div>

        <div class="meta">
          <span class="pill">{{ v.fuelType }}</span>
          <span class="pill">{{ v.initialRegistration }}</span>
          <span class="pill">{{ v.mileage.toLocaleString('de-DE') }} km</span>
        </div>

        <div class="price">{{ formatPrice(v.price) }}</div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.wrap { padding: 16px; }
.header { margin-bottom: 12px; }
.title { margin: 0; font-size: 20px; }
.sub { margin: 4px 0 0; opacity: 0.75; }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}

.card {
  border: 1px solid rgba(0,0,0,0.12);
  border-radius: 12px;
  padding: 12px;
  background: white;
}

.cardTitle { font-weight: 700; margin-bottom: 8px; }

.meta { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }

.pill {
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.12);
  opacity: 0.9;
}

.price { font-weight: 800; font-size: 16px; margin-top: 6px; }

.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 8px;
  margin-bottom: 16px;
}

.filters select,
.filters input {
  padding: 8px;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.2);
  font-size: 14px;
}
</style>
