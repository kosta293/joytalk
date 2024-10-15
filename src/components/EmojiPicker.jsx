// // src/components/EmojiPicker.jsx
// import React from "react";
// import { Picker } from "emoji-mart";

// const EmojiPicker = ({ onSelectEmoji, visible }) => {
//   if (!visible) return null; // 피커가 보이지 않으면 아무것도 렌더링하지 않음

//   return (
//     <div
//       style={{
//         position: "absolute",
//         bottom: "60px",
//         right: "20px",
//         zIndex: 1000,
//       }}
//     >
//       <Picker onSelect={onSelectEmoji} />
//     </div>
//   );
// };

// export default EmojiPicker;
