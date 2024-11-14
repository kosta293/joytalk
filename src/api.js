import axios from "axios";

const api = axios.create({
  baseURL: "/api/friends",
  withCredentials: true,
});

// 친구 목록 조회 함수 추가
export const fetchFriends = async (memberId) => {
  try {
    const response = await api.get("/list", { memberId: 1 });
    // response.data가 배열인지 확인하고, 배열이 아닐 경우 빈 배열을 반환
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("친구 목록 조회 실패:", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

// 친구 검색
export const searchFriends = async (nickName) => {
  try {
    const response = await api.get("/search", {
      params: { nickName },
    });

    return response.data; // 검색된 데이터 반환
  } catch (error) {
    console.error("친구 검색 실패:", error);
    throw error;
  }
};

// 친구 추가
export const addFriend = async (friendData) => {
  try {
    const response = await api.post("/add", null, {
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
