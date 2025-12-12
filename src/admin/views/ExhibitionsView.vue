<!-- src/admin/views/ExhibitionsView.vue -->
<template>
  <div class="exhibitions-view">
    <div class="exhibitions-header">
      <h1>전시 관리</h1>
      <button @click="toggleAddForm" class="add-button">{{ showAddForm ? '추가 취소' : '새 전시 추가' }}</button>
    </div>

    <!-- ⭐⭐⭐ ExhibitionForm 컴포넌트 위치 변경 (테이블 위 또는 아래) ⭐⭐⭐ -->
    <!-- 정민의 요청에 따라 테이블보다 위에 폼이 먼저 나오도록 배치 -->
    <ExhibitionForm 
      v-if="showAddForm" 
      @save="addNewExhibition" 
      @cancel="cancelAddExhibition" 
      class="exhibition-add-form"
    />

    <div class="exhibitions-table-container">
      <table class="exhibitions-table">
        <thead>
          <tr>
            <th>전시명</th>
            <th>기간</th>
            <th>설명/작가</th>
            <th>포스터</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="displayedExhibitions.length === 0">
            <td colspan="5" class="no-data">등록된 전시가 없습니다.</td>
          </tr>
          <tr v-for="(exhibition, index) in displayedExhibitions" :key="exhibition.title + exhibition.date">
            <td>
              <span v-if="editingIndex !== getActualIndex(exhibition)">{{ exhibition.title }}</span>
              <input v-else v-model="exhibition.title" type="text" class="edit-input" />
            </td>
            <td>
              <span v-if="editingIndex !== getActualIndex(exhibition)">{{ exhibition.date }}</span>
              <input v-else v-model="exhibition.date" type="text" class="edit-input" />
            </td>
            <td>
              <span v-if="editingIndex !== getActualIndex(exhibition)">{{ exhibition.desc }}</span>
              <input v-else v-model="exhibition.desc" type="text" class="edit-input" />
            </td>
            <td>
              <div v-if="editingIndex !== getActualIndex(exhibition)">
                <img :src="exhibition.image" alt="전시 포스터" class="exhibition-poster" />
              </div>
              <input v-else v-model="exhibition.image" type="text" class="edit-input image-input" placeholder="이미지 URL 입력" />
            </td>
            <td>
              <div v-if="editingIndex !== getActualIndex(exhibition)" class="actions-buttons">
                <button @click="handleEdit(getActualIndex(exhibition))" class="edit-button">수정</button>
              </div>
              <div v-else class="actions-buttons">
                <button @click="handleSave(getActualIndex(exhibition))" class="save-button">저장</button>
                <button @click="handleCancel(getActualIndex(exhibition))" class="cancel-button">취소</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination-container">
      <button @click="prevPage" :disabled="currentPage === 1" class="pagination-button">이전</button>
      
      <button
        @click="goToPage(1)"
        :class="['pagination-button', { active: 1 === currentPage }]"
        v-if="totalPages > 0"
      >
        1
      </button>
      
      <span v-if="showFirstEllipsis" class="ellipsis">...</span>

      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="['pagination-button', { active: page === currentPage }]"
      >
        {{ page }}
      </button>

      <span v-if="showLastEllipsis" class="ellipsis">...</span>

      <button
        @click="goToPage(totalPages)"
        :class="['pagination-button', { active: totalPages === currentPage }]"
        v-if="totalPages > 1 && !visiblePages.includes(totalPages)"
      >
        {{ totalPages }}
      </button>
      
      <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button">다음</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import ExhibitionForm from '@/admin/components/ExhibitionForm.vue';

const allExhibitions = ref([]);
const editingIndex = ref(null); 
let originalExhibition = null;

const itemsPerPage = 6;
const currentPage = ref(1); 
const showAddForm = ref(false); 

const totalPages = computed(() => {
  return Math.ceil(allExhibitions.value.length / itemsPerPage);
});

const displayedExhibitions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return allExhibitions.value.slice(start, end);
});

const pagesToShow = 5;

const visiblePages = computed(() => {
  const pages = [];
  const effectivePagesToShow = pagesToShow - 2; 
  if (effectivePagesToShow < 0) return [];
  
  let startPage = Math.max(2, currentPage.value - Math.floor(effectivePagesToShow / 2));
  let endPage = Math.min(totalPages.value - 1, startPage + effectivePagesToShow - 1);

  if (endPage - startPage + 1 < effectivePagesToShow) {
    startPage = Math.max(2, endPage - effectivePagesToShow + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

const showFirstEllipsis = computed(() => {
  return visiblePages.value.length > 0 && visiblePages.value[0] > 2;
});

const showLastEllipsis = computed(() => {
  return visiblePages.value.length > 0 && visiblePages.value[visiblePages.value.length - 1] < totalPages.value - 1;
});

const getActualIndex = (exhibitionItem) => {
  return allExhibitions.value.indexOf(exhibitionItem);
};

onMounted(async () => {
  try {
    // ⭐⭐⭐ 이 부분을 수정합니다! ⭐⭐⭐
    // import.meta.env.BASE_URL은 vite.config.js의 base 경로 값을 가져옵니다.
    // GitHub Pages 배포 시 '/website/'가 되므로, 요청은 '/website/data/exhibitions.json'이 됩니다.
    const response = await fetch(`${import.meta.env.BASE_URL}data/exhibitions.json`); 
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}. Response: ${errorText}`);
    }
    const data = await response.json();
    allExhibitions.value = data;
    console.log("JSON 파일 로드 성공:", allExhibitions.value);
  } catch (error) {
    console.error("JSON 파일 로드 실패:", error);
    allExhibitions.value = [];
  }
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToPage = (page) => {
  currentPage.value = page;
};

const toggleAddForm = () => {
  showAddForm.value = !showAddForm.value;
  // 폼이 열리면 수정 모드 강제 종료 (동시 작업 방지)
  if (showAddForm.value) {
    editingIndex.value = null;
  }
};

const addNewExhibition = (newExhibition) => {
  allExhibitions.value.unshift(newExhibition); 
  showAddForm.value = false; 
  currentPage.value = 1; 
  // 백엔드 저장 로직 필요 (Netlify Functions, API 등)
  console.log("새 전시 추가됨 (프론트엔드에만):", newExhibition);
  alert("새 전시가 목록에 추가되었습니다. (현재는 화면에만 반영됨)");
};

const cancelAddExhibition = () => {
  showAddForm.value = false; 
};


const handleEdit = (actualIndex) => { 
  editingIndex.value = actualIndex; 
  originalExhibition = { ...allExhibitions.value[actualIndex] };
  showAddForm.value = false;
};

const handleSave = (actualIndex) => { 
  console.log(`전시 #${actualIndex + 1} 저장됨:`, allExhibitions.value[actualIndex]);
  editingIndex.value = null;
  originalExhibition = null;
  alert(`전시 #${actualIndex + 1} 내용이 수정되었습니다. (현재는 화면에만 반영됨)`);
};

const handleCancel = (actualIndex) => { 
  if (originalExhibition) {
    allExhibitions.value[actualIndex].title = originalExhibition.title;
    allExhibitions.value[actualIndex].date = originalExhibition.date;
    allExhibitions.value[actualIndex].desc = originalExhibition.desc;
    allExhibitions.value[actualIndex].image = originalExhibition.image;
  }
  editingIndex.value = null;
  originalExhibition = null;
};
</script>

<style scoped lang="scss">
@use '@/admin/styles/ExhibitionsView.scss';
</style>