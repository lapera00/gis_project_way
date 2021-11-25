const express = require("express");
const router = express.Router();

const mysql = require("mysql");

const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();
const path = require("path");
const os = require("os");
const fs = require("fs");

const multer = require("multer");
const { json } = require("express");
const { connect } = require("http2");
const upload = multer({ dest: "public/images/" }); //dest : 저장 위치

var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
var sessionStore = new MySQLStore({
  host: "localhost",
  user: "root",
  password: "123456",
  port: 3306,
  database: "project_way",
});
// var options = {
//   host: "localhost",
//   user: "root",
//   password: "123456",
//   port: 3306,
//   database: "project_way",
// };
router.use(
  session({
    secret: "secretkeyway",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

let conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: 3306,
  database: "project_way",
}); //mysql 연결정보등록

router.post("/sigup", function (request, response) {
  let id = request.body.id;
  let pw = request.body.pw;
  let name = request.body.name;
  let phone = request.body.phone;
  let email = request.body.email;
  let address = request.body.address;
  let address2 = request.body.address2;

  //conn.connect(); //mysql과 연결

  let sql = "insert into account_table values(?,?,?,?,?,?,?)";

  console.log(id, pw);
  if (id && pw) {
    conn.query(
      "SELECT * FROM account_table WHERE id = ? AND pw = ? ",
      [id, pw],
      function (err, results, fields) {
        if (err) throw err;
        if (results.length <= 0) {
          conn.query(
            sql,
            [id, pw, name, phone, email, address, address2],
            function (err, data) {
              if (err) console.log(err);
              else console.log(data);
            }
          );
          response.send(
            '<script type="text/javascript">alert("성공적으로 가입되었습니다."); document.location.href="http://172.31.99.211:5502/public/login.html";</script>'
          );
        } else {
          response.send(
            '<script type="text/javascript">alert("이미 존재하는 아이디 입니다."); document.location.href="http://172.31.99.211:5502/public/signup.html";</script>'
          );
        }
        response.end();
      }
    );
  }
});

router.post("/login", function (request, response) {
  let id = request.body.id;
  let pw = request.body.pw;
  console.log(request.body);
  conn.connect(); //mysql과 연결

  let sql = "SELECT * FROM account_table WHERE id = ? AND pw = ?";

  conn.query(sql, [id, pw], function (err, results) {
    if (err) throw err;
    if (results.length > 0) {
      request.session.isLogined = true;
      request.session.id = id;
      // console.log(results);
      // console.log(id);
      response.redirect("https://172.31.99.211:3004/");
      response.end();
    } else {
      response.send(
        '<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); document.location.href="http://172.31.99.211:5502/public/login.html";</script>'
      );
    }
  });
});

router.post("/terms", function (request, response) {
  let chk_all = request.body.chk_all;
  let termsService = request.body.termsService;
  let termsPrivacy = request.body.termsPrivacy;

  if (chk_all) {
    response.redirect("http://172.31.99.211:5502/public/signup.html");
  } else if (termsService && termsPrivacy) {
    response.redirect("http://172.31.99.211:5502/public/signup.html");
  } else {
    console.log(err);
  }
});

router.post("/index", upload.single("file"), (req, res) => {
  let data = req.body.image;
  var face = data.replace(/^data:image\/\w+;base64,/, "");
  let decode = Buffer.from(face, "base64");
  fs.writeFileSync(`./face/${Date.now()}face.jpg`, decode);
});

router.post("/index2", function (request, response) {
  response.redirect("https://172.31.99.211:3004/");
});

router.post("/update", function (request, response) {
  var sess = request.session;

  response.render("http://127.0.0.1:5502/public/update.html", {
    length: 5,
    id: sess.id,
  });
});

module.exports = router;
