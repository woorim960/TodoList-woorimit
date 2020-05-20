// 모듈
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');

// 포트 설정
const PORT = process.env.PORT || 3000;

// 라우터
const main = require('./routes/main-route');

// 앱 세팅
app.set('view engine', 'ejs'); // ejs 엔진 사용
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// 라우팅
app.use('/', main);



// 서버 온
app.listen(PORT, () => {
  console.log("Listen on 3000 port");
});