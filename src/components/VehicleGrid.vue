<script setup>
const props = defineProps({
  vehicles: { type: Array, default: () => [] },
  count: { type: Number, default: 0 },
  formatPrice: { type: Function, required: true },
  formatKm: { type: Function, required: true },
})

const emit = defineEmits(['clear'])
</script>

<template>
  <!-- Empty state -->
  <div v-if="count === 0" class="empty">
    <div class="emptyTitle">Keine Treffer</div>
    <div class="emptyText">
      Bitte Filter anpassen oder zurücksetzen.
    </div>
    <button type="button" class="btn btnPrimary" @click="emit('clear')">
      Filter zurücksetzen
    </button>
  </div>

  <!-- Grid -->
  <section v-else class="grid">
    <article v-for="v in vehicles" :key="v.id" class="card">
      <!-- image placeholder -->
      <div class="media" aria-hidden="true">
        <img src="../assets/image.png" alt="Your Image" class="mediaImage">
      </div>

      <div class="cardBody">
        <div class="cardTop">
          <div class="cardTitle">{{ v.manufacturer }} {{ v.model }}</div>
          <div class="price">{{ formatPrice(v.price) }}</div>
        </div>

        <div class="meta">
          <span class="tag">{{ v.fuelType }}</span>
          <span class="tag">{{ v.initialRegistration }}</span>
          <span class="tag">{{ formatKm(v.mileage) }}</span>
        </div>

        <div class="divider"></div>

        <div class="details">
          <div class="detail">
            <div>Zustand</div>
            <div>Gebraucht</div>
          </div>
          <div class="detail">
            <div>Standort</div>
            <div>—</div>
          </div>
        </div>

        <div class="cardActions">
          <button type="button" class="btn btnPrimary btnSm">Angebot ansehen</button>
          <button type="button" class="btn btnGhost btnSm">Merken</button>
        </div>
      </div>
    </article>
  </section>
</template>

<style scoped>
/* Empty state */
.empty {
  border: 1px dashed rgba(0,0,0,0.18);
  border-radius: 16px;
  background: rgba(0,0,0,0.02);
  padding: 18px;
}

.emptyTitle {
  font-weight: 900;
  font-size: 16px;
  margin-bottom: 6px;
}

.emptyText {
  opacity: 0.75;
  margin-bottom: 12px;
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

.btnSm {
  padding: 9px 10px;
  font-size: 13px;
  border-radius: 10px;
}

.btnPrimary {
  border-color: rgba(0,0,0,0.12);
  background: #111;
  color: #fff;
}

/* Grid + cards */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 14px;
}

.card {
  border: 1px solid rgba(0,0,0,0.10);
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  display: grid;
  grid-template-columns: 140px 1fr;
  min-height: 160px;
  box-shadow: 0 1px 0 rgba(0,0,0,0.02);
  transition: transform 120ms ease, box-shadow 120ms ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(0,0,0,0.08);
}

/* Image placeholder */
.media {
  background: linear-gradient(135deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02));
  display: grid;
  place-items: center;
  position: relative;
}
.mediaImage {
  max-width: 100%;
  height: auto;
}

/* Card body */
.cardBody {
  padding: 12px 12px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cardTop {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
}

.cardTitle {
  font-weight: 900;
  font-size: 15px;
  line-height: 1.2;
}

.price {
  font-weight: 900;
  font-size: 15px;
  white-space: nowrap;
}

/* Meta tags */
.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  font-size: 12px;
  padding: 5px 8px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.12);
  background: rgba(0,0,0,0.02);
}

/* Divider + details */
.divider {
  height: 1px;
  background: rgba(0,0,0,0.08);
}

.details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.detail .k {
  font-size: 11px;
  opacity: 0.65;
}

.detail .v {
  font-size: 13px;
  font-weight: 700;
}

/* Actions */
.cardActions {
  display: flex;
  gap: 10px;
  margin-top: auto;
}
</style>
