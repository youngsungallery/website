<!-- src/admin/components/ExhibitionForm.vue -->
<template>
  <div class="exhibition-form-container">
    <h2>{{ isEditing ? '전시 수정' : '새 전시 추가' }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">전시명</label>
        <input type="text" id="title" v-model="formData.title" placeholder="전시 제목을 입력하세요" required />
      </div>
      <div class="form-group">
        <label for="date">기간</label>
        <input type="text" id="date" v-model="formData.date" placeholder="예: 2025.11.01 ~ 11.30" required />
      </div>
      <div class="form-group">
        <label for="desc">설명/작가</label>
        <textarea id="desc" v-model="formData.desc" placeholder="전시 설명 또는 작가명을 입력하세요"></textarea>
      </div>
      <div class="form-group">
        <label for="image">포스터 URL</label>
        <input type="url" id="image" v-model="formData.image" placeholder="포스터 이미지 URL을 입력하세요" />
      </div>

      <div class="form-actions">
        <button type="submit" class="save-button">{{ isEditing ? '수정 완료' : '추가하기' }}</button>
        <button type="button" @click="cancelForm" class="cancel-button">취소</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue';

const props = defineProps({
  // 수정 모드일 경우 기존 데이터가 전달됩니다.
  // 이 컴포넌트가 재활용될 때 isEditing 플래그를 통해 동작을 구분합니다.
  initialData: {
    type: Object,
    default: () => ({ title: '', date: '', desc: '', image: '' })
  },
  isEditing: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['save', 'cancel']);

const formData = ref({ ...props.initialData }); // props의 초기 데이터를 formData에 복사

// initialData가 변경될 때마다 formData를 업데이트 (수정 모드 재진입 시)
watch(() => props.initialData, (newVal) => {
  formData.value = { ...newVal };
}, { deep: true });

const submitForm = () => {
  emit('save', { ...formData.value }); // 현재 formData 값을 부모 컴포넌트로 전달
  resetForm(); // 폼 초기화
};

const cancelForm = () => {
  emit('cancel');
  resetForm(); // 폼 초기화
};

const resetForm = () => {
  formData.value = { title: '', date: '', desc: '', image: '' }; // 폼 필드 초기화
};

// 수정 모드 진입 시 initialData로 폼 채우기
watch(() => props.isEditing, (newVal) => {
  if (newVal) {
    formData.value = { ...props.initialData };
  } else {
    resetForm();
  }
}, { immediate: true });
</script>

<style scoped lang="scss">
@use '@/admin/styles/ExhibitionForm.scss'; // ⭐⭐ 스타일 파일 임포트 ⭐⭐
</style>