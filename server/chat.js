import { WebSocketServer } from "ws";

// server.js
const server = new WebSocketServer({ port: 8079 });

server.on("connection", (socket) => {
  console.log("클라이언트가 연결되었습니다.");

  // 클라이언트로부터 메시지를 받았을 때의 이벤트 리스너
  socket.on("message", (message) => {
    console.log(`클라이언트로부터 받은 메시지: ${message}`);
    const parsedMessage = JSON.parse(message);
    parsedMessage.isMine = false;

    // 접속한 모든 클라이언트들에게 메시지를 전송
    server.clients.forEach((client) => {
      // 메시지를 보낸 클라이언트가 아닌 경우에만 메시지를 전송
      if (client !== socket) {
        client.send(JSON.stringify(parsedMessage));
      } else {
        parsedMessage.isMine = true;
        client.send(JSON.stringify(parsedMessage));
      }
    });
  });

  // 클라이언트와의 연결이 종료되었을 때의 이벤트 리스너
  socket.on("close", () => {
    console.log("클라이언트와의 연결이 종료되었습니다.");
  });

  // 클라이언트에게 메시지를 전송
  socket.send("서버로부터 메시지: 연결되었습니다.");
});

console.log("WebSocket 서버가 8079포트에서 실행 중입니다.");
