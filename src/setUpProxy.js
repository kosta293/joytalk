const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // 프록시를 적용할 API 경로
    createProxyMiddleware({
      target: "http://localhost:8080", // Spring 서버 주소 (백엔드 주소)
      changeOrigin: true,
      secure: false, // https를 사용하는 경우, ssl 검증이 없도록 설정 (필요시)
      pathRewrite: {
        "^/api": "", // '/api'를 제거하고 실제 Spring 서버로 요청을 보냄
      },
    })
  );
};
