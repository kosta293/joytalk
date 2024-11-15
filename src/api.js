import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

// 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 친구 목록 조회 함수 추가
export const fetchFriends = async (memberId) => {
  try {
    const response = await api.get("/friends/list", {
      params: { memberId },
    });
    // response.data가 배열인지 확인하고, 배열이 아닐 경우 빈 배열을 반환
    console.log(response.data);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    if (error.response?.status === 401) {
      // 인증 에러 처리
      localStorage.removeItem("jwt_token");
      window.location.href = "/login";
    }
    console.error("친구 목록 조회 실패:", error);
    return []; // 에러 발생 시 빈 배열 반환
    // throw error;
  }
};

// 친구 검색
export const searchFriends = async (nickName) => {
  try {
    const response = await api.get("/friends/search", {
      params: { nickName },
    });

    return Array.isArray(response.data) ? response.data : []; // 검색된 데이터 반환
  } catch (error) {
    console.error("친구 검색 실패:", error);
    throw error;
  }
};

// 친구 추가
export const addFriend = async (friendData) => {
  try {
    const response = await api.post("/friends/add", null, {
      params: {
        memberId: friendData.memberId, // memberId를 쿼리 파라미터로 전달
        friendId: friendData.friendId, // friendId를 쿼리 파라미터로 전달
      },
    });
    return response.data;
  } catch (error) {
    console.error("친구 추가 실패:", error);
    throw error;
  }
};

// 사용자 정보 조회
export const fetchUserInfo = async (memberId) => {
  try {
    const response = await api.get("/mypage", {
      params: { memberId },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("jwt_token");
      window.location.href = "/login";
    }
    console.error("사용자 정보 조회 실패:", error);
    throw error;
  }
};

// 사용자 정보 업데이트
export const updateUserInfo = async (userData) => {
  try {
    const response = await api.patch("/mypage", userData);
    return response.data;
  } catch (error) {
    console.error("사용자 정보 업데이트 실패:", error);
    throw error;
  }
};
