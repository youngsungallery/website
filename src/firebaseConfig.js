// src/firebaseConfig.js (새로 생성하는 파일)

// 필요한 Firebase SDK 모듈들을 가져옵니다.
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; 

// Firebase 프로젝트 설정입니다.
const firebaseConfig = {
  apiKey: "AIzaSyBlCGfn3wL69ArzYp0F46ocSTJXT3b_1Kc",
  authDomain: "youngsungallery-admin.firebaseapp.com",
  databaseURL: "https://youngsungallery-admin-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "youngsungallery-admin",
  storageBucket: "youngsungallery-admin.firebasestorage.app",
  messagingSenderId: "390092602898",
  appId: "1:390092602898:web:fa0b9a642da767dd0922cb"
};

// Firebase 앱을 초기화합니다.
const app = initializeApp(firebaseConfig);

// 초기화된 Firebase 앱으로부터 Realtime Database 인스턴스를 가져옵니다.
const db = getDatabase(app);

// 다른 파일에서 이 db 인스턴스를 import하여 사용할 수 있도록 내보냅니다.
export { db };