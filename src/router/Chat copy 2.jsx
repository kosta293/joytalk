// import React, { useEffect, useState } from "react";
// import "../css/Chat.css";
//
// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [ws, setWs] = useState(null);
//
//   useEffect(() => {
//     const socket = new WebSocket("ws://localhost:8079");
//     setWs(socket);
//
//     socket.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       setMessages((prevMessages) => [...prevMessages, message]);
//     };
//
//     return () => {
//       socket.close();
//     };
//   }, []);
//
//   const sendMessage = () => {
//     if (input.trim()) {
//       const message = {
//         content: input,
//         timestamp: new Date().toLocaleTimeString(),
//       };
//       ws.send(JSON.stringify(message));
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { ...message, isMine: true },
//       ]);
//       setInput("");
//     }
//   };
//
//   return (
//     <div className="chat-container">
//       <h1>Chat</h1>
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${msg.isMine ? "mine" : "theirs"}`}
//           >
//             <p>{msg.content}</p>
//             <span className="timestamp">{msg.timestamp}</span>
//           </div>
//         ))}
//       </div>
//       <div className="input-container">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="메시지를 입력하세요..."
//         />
//         <button onClick={sendMessage}>전송</button>
//       </div>
//     </div>
//   );
// };
//
// export default Chat;
