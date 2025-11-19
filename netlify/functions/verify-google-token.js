// require('dotenv').config(); // ✨ 이 줄은 Netlify CLI가 알아서 처리하므로 삭제했는지 다시 한번 확인! ✨
const { OAuth2Client } = require('google-auth-library'); // Google OAuth 라이브러리
const jwt = require('jsonwebtoken'); // JSON Web Token 라이브러리

// Netlify 환경 변수에서 가져온 Google 클라이언트 ID 및 보안 비밀번호
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;       // ✨ 수정! VITE_ 접두사 제거! ✨
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// 우리가 사용할 JWT 토큰을 서명하고 검증할 비밀 키 (매우 중요!)
const JWT_SECRET = process.env.JWT_SECRET; // ✨ 수정! 불필요한 기본값 제거! ✨

// 관리자로 인정할 이메일 목록
// 이메일은 실제 관리자의 Gmail 주소로 대체해야 합니다.
const ADMIN_EMAILS = [
  'evepoi86@gmail.com', // ✨ 정민이의 관리자 이메일로 다시 한번 확인! ✨
  'another.admin@example.com' // 추가 관리자가 있다면 여기에 추가
];

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { idToken } = JSON.parse(event.body);

  if (!idToken) {
    return { statusCode: 400, body: 'ID Token is required' };
  }

  try {
    // 1. Google ID Token 검증
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userId = payload['sub']; // Google 계정의 고유 ID
    const userEmail = payload['email']; // Google 계정의 이메일

    console.log(`Verified Google ID Token for: ${userEmail}`);

    // 2. 관리자 여부 확인
    if (!ADMIN_EMAILS.includes(userEmail)) {
      return { statusCode: 403, body: 'Access Denied: Not an admin' };
    }

    // 3. 관리자에게만 우리만의 커스텀 JWT 발행
    const authToken = jwt.sign(
      { userId: userId, email: userEmail, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '1h' } // 토큰 유효 시간 1시간
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Login successful', token: authToken, email: userEmail }),
    };

  } catch (error) {
    console.error('Google ID Token verification failed:', error.message);
    return { statusCode: 401, body: 'Invalid Google ID Token' };
  }
};