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
    <div class="emptyText">Bitte Filter anpassen oder zurücksetzen.</div>
    <button type="button" class="btnPrimary" @click="emit('clear')">
      Filter zurücksetzen
    </button>
  </div>

  <section v-else class="grid">
    <article v-for="v in vehicles" :key="v.id" class="card">
      <div class="top">
        <div class="badge">
          <div class="b1">ab 199€</div>
          <div class="b2">im Monat</div>
        </div>


        <button class="heart" type="button" aria-label="Merken (UI only)" title="Merken">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
               d="M12.1 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
               2 5.42 4.42 3 7.5 3
               9.24 3 10.91 3.81 12 5.08
               13.09 3.81 14.76 3 16.5 3
               19.58 3 22 5.42 22 8.5
               22 12.28 18.6 15.36 13.35 20.04L12.1 21.35z"
               fill="none"
               stroke="currentColor"
               stroke-width="2"
               stroke-linecap="round"
               stroke-linejoin="round"
              />
          </svg>
        </button>

        <div class="imgWrap" aria-hidden="true">
          <img class="carImg" src="../assets/image1.jpg" alt="" />
        </div>
      </div>

      <div class="panel">
        <div class="title">{{ v.manufacturer }} {{ v.model }}</div>
        <div class="sub">Business Edition · 1.5D · AT/LED · Navi</div>

        <div class="pills">
          <span class="pill">{{ v.initialRegistration }}</span>
          <span class="pill">{{ v.fuelType }}</span>
          <span class="pill">Automatik</span>
        </div>

        <div class="bottom">
          <div class="price">
            {{ formatPrice(v.price) }}
            <div class="tax">inkl. 19% MwSt. (ausweisbar)</div>
          </div>

          <a class="details" href="#">Details ›</a>
        </div>
      </div>
    </article>
  </section>
</template>

<style scoped>
.grid{
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

@media (max-width: 1150px){
  .grid{ grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 720px){
  .grid{ grid-template-columns: 1fr; }
}

.card{
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.10);
}

.top{
  position: relative;
  height: 190px;
  background: #f3f4f5;
  overflow: hidden;
}

.badge{
  position:absolute;
  left: 12px;
  top: 12px;
  z-index: 2;
  background:#111;
  color:#fff;
  border-radius: 12px;
  padding: 8px 10px;
  transform: rotate(-8deg);
}

.b1{ font-size: 13px; line-height: 1.05; }
.b2{ font-size: 11px; opacity: .85; margin-top: 2px; }

.heart{
  position:absolute;
  right: 12px;
  top: 12px;
  z-index: 2;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.16);
  background: #fff;
  display: grid;
  place-items: center;
  color: rgba(0,0,0,0.85);
  cursor: pointer;
}
.heart svg {
  display: block; /* usuwa mikroluki inline */
}
.heart:hover{
  color: #111;
  border-color: rgba(0,0,0,0.28);
}

.imgWrap{
  position: absolute;
  inset: 0;
}

.carImg{
  position: absolute;
  margin-top: 2rem;
  inset: 0;
  width: 100%;
  object-fit: cover;        
  object-position: center;  
  display: block;
  filter: none;             /* bez dziwnych efektów */
}

.panel{
  background: #111;
  color:#fff;
  padding: 14px;
}

.title{
  font-weight: 950;
  font-size: 15px;
  line-height: 1.1;
}
.sub{
  margin-top: 6px;
  font-size: 12px;
  color: rgba(255,255,255,0.65);
  font-weight: 650;
}

.pills{
  display:flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.pill{
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(255,255,255,0.06);
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 800;
}

.bottom{
  margin-top: 12px;
  display:flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 10px;
}

.price{ font-weight: 950; font-size: 16px; }
.tax{ font-size: 11px; font-weight: 650; color: rgba(255,255,255,0.55); margin-top: 3px; }

.details{
  color:#6ec1ff;
  text-decoration:none;
  font-weight: 900;
  white-space: nowrap;
}

.empty{
  border: 1px dashed rgba(0,0,0,0.18);
  border-radius: 16px;
  background: rgba(0,0,0,0.02);
  padding: 18px;
}
.emptyTitle{ font-weight: 900; font-size: 16px; margin-bottom: 6px; }
.emptyText{ opacity: 0.75; margin-bottom: 12px; }
.btnPrimary{
  border: 0;
  background: #111;
  color: #fff;
  padding: 10px 14px;
  border-radius: 12px;
  font-weight: 900;
  cursor: pointer;
}
</style>
