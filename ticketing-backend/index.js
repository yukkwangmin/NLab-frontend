const express = require('express');
const app = express();
const port = 3000;

// 기본 주소('/')로 접속했을 때 실행될 부분
app.get('/', (req, res) => {
  res.send('<h1>안녕하세요! 서버가 정상적으로 실행되었습니다.</h1>');
});

app.listen(port, () => {
  console.log(`✅ 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});