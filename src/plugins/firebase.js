// src/plugins/firebase.js

// Firebase App (initializeApp) 및 Authentication (getAuth) 함수 임포트
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 인증 서비스를 사용하기 위해 getAuth 임포트

// Firebase 구성 정보
// ⭐⭐⭐ 이 부분을 정민님이 복사해둔 firebaseConfig 값으로 교체해주세요! ⭐⭐⭐
const firebaseConfig = {
  apiKey: "AIzaSyBlCGfn3wL69ArzYp0F46ocSTJXT3b_1Kc", // ⭐ 실제 API 키
  authDomain: "youngsungallery-admin.firebaseapp.com",
  projectId: "youngsungallery-admin",
  storageBucket: "youngsungallery-admin.firebasestorage.app",
  messagingSenderId: "390092602898",
  appId: "1:390092602898:web:fa0b9a642da767dd0922cb"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase 인증 서비스 인스턴스 가져오기
export const auth = getAuth(app);

// 필요한 경우 다른 Firebase 서비스도 이곳에서 내보낼 수 있습니다.
// 예:
// import { getFirestore } from "firebase/firestore";
// export const db = getFirestore(app);