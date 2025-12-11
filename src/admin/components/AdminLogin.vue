<!-- src/admin/components/AdminLogin.vue -->
<template>
  <div class="admin-login">
    <h1>관리자 로그인</h1>
    <p v-if="error" class="error-message">{{ error }}</p>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">이메일:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">비밀번호:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? '로그인 중...' : '로그인' }}
      </button>
    </form>
    <button @click="signInWithGoogle" :disabled="loading">Google로 로그인</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '@/plugins/firebase'; // Firebase auth 인스턴스 임포트
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; // Firebase 인증 메서드 임포트

const email = ref('');
const password = ref('');
const error = ref(null);
const loading = ref(false);
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  error.value = null;
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push('/admin');
  } catch (err) {
    console.error('로그인 에러:', err.code, err.message);
    switch (err.code) {
      case 'auth/user-not-found':
        error.value = '등록되지 않은 사용자입니다.';
        break;
      case 'auth/wrong-password':
        error.value = '비밀번호가 틀렸습니다.';
        break;
      case 'auth/invalid-email':
        error.value = '유효하지 않은 이메일 형식입니다.';
        break;
      case 'auth/too-many-requests':
        error.value = '너무 많은 로그인 시도. 잠시 후 다시 시도해주세요.';
        break;
      default:
        error.value = '로그인에 실패했습니다. 다시 시도해주세요.';
    }
  } finally {
    loading.value = false;
  }
};

const signInWithGoogle = async () => {
  loading.value = true;
  error.value = null;
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    router.push('/admin');
  } catch (err) {
    console.error('Google 로그인 에러:', err.code, err.message);
    if (err.code === 'auth/popup-closed-by-user') {
      error.value = 'Google 로그인 팝업이 닫혔습니다.';
    } else if (err.code === 'auth/cancelled-popup-request') {
      error.value = 'Google 로그인 팝업 요청이 취소되었습니다.';
    } else {
      error.value = 'Google 로그인에 실패했습니다. 다시 시도해주세요.';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
@use '@/admin/styles/AdminLogin.scss'; /* <<-- 여기에 외부 SCSS 파일을 임포트합니다! */
</style>