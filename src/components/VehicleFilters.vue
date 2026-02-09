<script setup>
const props = defineProps({
  manufacturers: { type: Array, default: () => [] },
  fuelTypes: { type: Array, default: () => [] },
  selectedManufacturer: { type: String, default: '' },
  selectedFuelType: { type: String, default: '' },
  maxPrice: { type: [String, Number], default: '' },
})

const emit = defineEmits([
  'update:selectedManufacturer',
  'update:selectedFuelType',
  'update:maxPrice',
  'clear',
])
</script>

<template>
  <div class="panel">
    <div class="panelHeader">
      <div class="panelTitle">Filter</div>
      <div class="panelHint">Einfach & bewusst im Scope gehalten</div>
    </div>

    <div class="field">
      <label class="label">Hersteller</label>
      <select
        :value="selectedManufacturer"
        class="control"
        @change="emit('update:selectedManufacturer', $event.target.value)"
      >
        <option value="">Alle</option>
        <option v-for="m in manufacturers" :key="m" :value="m">
          {{ m }}
        </option>
      </select>
    </div>

    <div class="field">
      <label class="label">Kraftstoff</label>
      <select
        :value="selectedFuelType"
        class="control"
        @change="emit('update:selectedFuelType', $event.target.value)"
      >
        <option value="">Alle</option>
        <option v-for="f in fuelTypes" :key="f" :value="f">
          {{ f }}
        </option>
      </select>
    </div>

    <div class="field">
      <label class="label">Max. Preis</label>
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
      <button type="button" class="btn btnGhost" @click="emit('clear')">
        Zurücksetzen
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Sidebar panel */
.panel {
  border: 1px solid rgba(0,0,0,0.10);
  border-radius: 16px;
  background: white;
  padding: 14px;
  position: sticky;
  top: 12px;
}

.panelHeader {
  margin-bottom: 12px;
}

.panelTitle {
  font-weight: 800;
  font-size: 16px;
  margin-bottom: 2px;
}

.panelHint {
  font-size: 13px;
  opacity: 0.7;
}

.field {
  margin-top: 12px;
}

.label {
  display: block;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 6px;
}

.control {
  width: 95%;
  padding: 10px 10px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.14);
  background: #fff;
  font-size: 14px;
  outline: none;
}

.control:focus {
  border-color: rgba(0,0,0,0.28);
}

.help {
  margin-top: 6px;
  font-size: 12px;
  opacity: 0.65;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 14px;
}

/* Buttons */
.btn {
  border-radius: 12px;
  padding: 10px 12px;
  border: 1px solid rgba(0,0,0,0.14);
  background: white;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  line-height: 1;
}
</style>
