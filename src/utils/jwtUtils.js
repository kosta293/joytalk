// JWT 토큰 디코딩 유틸리티
export const getTokenInfo = () => {
  const token = localStorage.getItem("jwt_token");
  if (!token) return null;

  try {
    // JWT의 payload 부분을 디코딩
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      memberId: payload.memberId,
      email: payload.sub,
      role: payload.role,
    };
  } catch (e) {
    console.error("토큰 파싱 에러:", e);
    return null;
  }
};
