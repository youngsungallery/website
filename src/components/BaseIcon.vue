<!-- src/components/BaseIcon.vue -->
<template>
  <svg :class="['base-icon', name + '-icon']"
       :viewBox="viewBox"
       :width="width"
       :height="height"
       :style="style"
       xmlns="http://www.w3.org/2000/svg">
    <template v-if="paths && paths.length > 0">
      <!-- 각 path에 fill 속성을 직접 바인딩하여 색상 지정 -->
      <path v-for="(path, index) in paths" :key="index" :d="path.d" :fill="path.fill || 'currentColor'"></path>
    </template>
    <template v-else>
      <!-- 아이콘 데이터가 없는 경우를 위한 대체 (디버깅용) -->
      <rect x="0" y="0" width="24" height="24" fill="transparent" stroke="red" stroke-width="2"/>
    </template>
  </svg>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  width: {
    type: String,
    default: '1em'
  },
  height: {
    type: String,
    default: '1em'
  },
  style: {
    type: Object,
    default: () => ({})
  }
});

// 아이콘 SVG 경로 데이터 중앙 관리
const iconPaths = {
  // 전화 아이콘 (Material Symbols - Outlined 'call')
  phone: {
    viewBox: '0 0 24 24',
    paths: [{ d: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.21-2.21c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02L6.62 10.79z', fill: 'currentColor' }]
  },
  // ✨ 유튜브 아이콘 (실제 로고) - 2개의 path, 각자 fill 색상 지정 ✨
  youtube: {
    viewBox: '0 0 24 24',
    paths: [
      { d: 'M21.948 7.646c-.106-.402-.45-.75-.895-.85C19.7 6.372 15 6.368 12 6.368s-7.7.004-9.053.428c-.445.1-.79.448-.896.85C1.65 9.17 1.637 12 1.637 12s.013 2.83-.001 4.354c.106.402.45.75.896.85C4.3 17.632 9 17.636 12 17.636s7.7-.004 9.053-.428c.445-.1.79-.448.896-.85C22.35 14.83 22.363 12 22.363 12s-.013-2.83-.415-4.354z', fill: '#FF0000' }, // 빨간색 배경
      { d: 'M9.826 14.664V9.336L14.7 12l-4.874 2.664z', fill: '#FFFFFF' } // 흰색 플레이 버튼
    ]
  },
  // ✨ 카카오톡 아이콘 (실제 로고) - 단일 path, 직접 fill 색상 지정 ✨
  kakao: {
    viewBox: '0 0 24 24',
    paths: [
      { d: 'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10c1.78 0 3.49-.491 4.969-1.394l.325.976c.078.234.33.366.58.307l2.842-.662c.18-.042.274-.23.22-.407l-.372-1.12c2.046-2.146 3.284-4.887 3.284-7.83C22 6.477 17.523 2 12 2zM9.5 8c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zM12 17.037c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z', fill: '#FEE500' } // 노란색 말풍선 (눈 포함)
    ]
  }
};

const iconData = computed(() => iconPaths[props.name] || { viewBox: '0 0 24 24', paths: [] });
const viewBox = computed(() => iconData.value.viewBox);
const paths = computed(() => iconData.value.paths); // `paths`는 이제 { d: '...', fill: '...' } 객체의 배열
</script>

<style scoped>
.base-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
  /* ✨ 중요한 변화: SVG 자체에 fill이 지정되었으므로, 여기서 fill은 더 이상 필요 없을 가능성이 높음. ✨
     `fill="currentColor"`는 path 객체에 `fill` 속성이 없는 경우에 대비한 fallback 역할 */
}
</style>