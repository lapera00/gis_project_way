var express = require("express");
var http = require("http");
var serveStatic = require("serve-static"); //특정 폴더의 파일들을 특정 패스로 접근할 수 있도록 열어주는 역할
var path = require("path");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");

const app = express();

const router = require("./routes/routes.js");

const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: false }));

app.use(
  expressSession({
    secret: "my key", //이때의 옵션은 세션에 세이브 정보를 저장할때 할때 파일을 만들꺼냐
    //아니면 미리 만들어 놓을꺼냐 등에 대한 옵션들임
    resave: true,
    saveUninitialized: true,
  })
);

app.use(router);
app.listen(3003);
//3003-server, 3306-mysql, 5500-html
