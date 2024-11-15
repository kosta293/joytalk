// ProfileImageUploader.jsx
import React from "react";
import styled from "styled-components"; // styled-components로 스타일링
import profileImg from "../images/profile2.png"; // 기본 프로필 이미지 임포트

// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex; // Flexbox 레이아웃
  flex-direction: column; // 세로 방향으로 정렬
  align-items: center; // 중앙 정렬
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

const HiddenInput = styled.input`
  display: none; // 실제 파일 입력 요소는 숨김
`;

export const MyProfileImg = styled.img`
  width: 150px; // 이미지 너비
  height: 150px; // 이미지 높이
  border-radius: 50%; // 원형 이미지
  border: 5px solid #bad7ff; // 테두리 스타일
  object-fit: cover; // 이미지 비율 유지
  margin-bottom: 30px; // 하단 여백
  cursor: ${(props) =>
    props.disabled ? "not-allowed" : "pointer"}; // 마우스 커서 포인터로 변경
  filter: ${(props) => (props.disabled ? "grayscale(30%)" : "none")};
  transition: all 0.3s ease;

  &:hover {
    transform: ${(props) => (props.disabled ? "none" : "scale(1.05)")};
  }
`;

const ProfileImageUploader = ({ onChangeImage, uploadedImage, disabled }) => {
  // 파일 입력 변경 시 호출되는 함수
  const onChangeFile = (e) => {
    if (disabled) return; // disabled 상태일 때는 함수 실행하지 않음

    const file = e.target.files[0]; // 선택된 파일 가져오기
    if (file) {
      const reader = new FileReader(); // FileReader 객체 생성
      reader.onloadend = () => {
        onChangeImage(reader.result); // 부모 컴포넌트에 이미지 URL 전달
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 읽기
    }
  };

  // disabled 상태일 때 클릭 이벤트 방지
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Container disabled={disabled}>
      <label
        htmlFor="file-input"
        onClick={handleClick}
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
      >
        {/* 업로드된 이미지가 있으면 해당 이미지를, 없으면 기본 이미지를 표시 */}
        <MyProfileImg
          src={uploadedImage || profileImg}
          alt="프로필 사진"
          disabled={disabled}
        />
      </label>
      <HiddenInput
        id="file-input" // label과 연결된 파일 입력 요소의 ID
        type="file" // 파일 입력 유형
        accept="image/*" // 이미지 파일만 선택 가능
        onChange={onChangeFile} // 파일 선택 시 함수 호출
        disabled={disabled} // HTML native disabled 속성 추가
      />
    </Container>
  );
};

// PropTypes 추가 (선택사항)
// ProfileImageUploader.propTypes = {
//   onChangeImage: PropTypes.func.isRequired,
//   uploadedImage: PropTypes.string,
//   disabled: PropTypes.bool
// };

// ProfileImageUploader.defaultProps = {
//   disabled: false
// };

export default ProfileImageUploader; // ProfileImageUploader 컴포넌트 내보내기
