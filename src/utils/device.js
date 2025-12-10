// src/utils/device.js
import { ref, onMounted, onUnmounted, computed } from 'vue';

const breakpoints = {
  mobile: 768,    // 768px 미만: mobile
  tablet: 1024,   // 768px 이상 1024px 미만: tablet
  pc: 1024        // 1024px 이상: pc
};

export function useDeviceDetection() {
  const windowWidth = ref(window.innerWidth);

  const updateWidth = () => {
    windowWidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', updateWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
  });

  const isMobile = computed(() => windowWidth.value < breakpoints.mobile);
  const isTablet = computed(() => windowWidth.value >= breakpoints.mobile && windowWidth.value < breakpoints.tablet);
  const isPC = computed(() => windowWidth.value >= breakpoints.pc);

  return { isMobile, isTablet, isPC, windowWidth, breakpoints };
}