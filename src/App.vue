<script setup>
import { computed } from 'vue'
import { vehicles } from './data/vehicles'

const count = computed(() => vehicles.length)

const formatPrice = (value) => {
  return new Intl.NumberFormat('de-DE').format(value) + ' €'
}
</script>

<template>
  <div class="wrap">
    <header class="header">
      <h2 class="title">Vehicle Search</h2>
      <p class="sub">Found {{ count }} vehicles</p>
    </header>

    <section class="grid" aria-label="Vehicle listing">
      <article v-for="v in vehicles" :key="v.id" class="card">
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
</style>
