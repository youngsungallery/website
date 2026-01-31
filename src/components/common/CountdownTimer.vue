<!-- FILE: src/components/common/CountdownTimer.vue -->
<template>
  <div v-if="isActive" class="cd">
    <span v-if="label" class="cd-label">{{ label }}</span>
    <span class="cd-time">{{ text }}</span>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  isActive: { type: Boolean, default: false },
  label: { type: String, default: "" },
  text: { type: String, default: "" },
});

const isActive = computed(() => !!props.isActive);
</script>

<style scoped>
.cd{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:8px 10px;
  border-radius:999px;
  border:1px solid rgba(0,0,0,0.10);
  background:rgba(0,0,0,0.03);
  font-size:12px;
  line-height:1;
  white-space:nowrap;
}
.cd-label{
  font-weight:700;
  color:#111;
}
.cd-time{
  font-variant-numeric: tabular-nums;
  font-weight:700;
  color:#111;
}
</style>
