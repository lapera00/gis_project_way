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
const upload = multer({ dest: "public/images/" }); //dest : 저장 위치

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
            '<script type="text/javascript">alert("성공적으로 가입되었습니다."); document.location.href="http://192.168.157.172:5502/public/login.html";</script>'
          );
        } else {
          response.send(
            '<script type="text/javascript">alert("이미 존재하는 아이디 입니다."); document.location.href="http://192.168.157.172:5502/public/signup.html";</script>'
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

  conn.connect(); //mysql과 연결

  let sql = "SELECT * FROM account_table WHERE id = ? AND pw = ?";

  conn.query(sql, [id, pw], function (err, results) {
    if (err) throw err;
    if (results.length > 0) {
      // request.session.isLogined = true;
      // request.session.id = id;
      response.redirect("http://192.168.157.172:5502/public/index.html");
      response.end();
    } else {
      response.send(
        '<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); document.location.href="http://192.168.157.172:5502/public/login.html";</script>'
      );
    }
  });
});

router.post("/terms", function (request, response, err) {
  let chk_all = request.body.chk_all;
  let termsService = request.body.termsService;
  let termsPrivacy = request.body.termsPrivacy;

  if (chk_all) {
    response.redirect("http:/192.168.157.172:5502/public/signup.html");
  } else if (termsService && termsPrivacy) {
    response.redirect("http://192.168.157.172:5502/public/signup.html");
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
  response.send(
    '<script type="text/javascript">alert("타이머 슈바."); document.location.href="http://192.168.157.172:5502/public/index.html";</script>'
  );
});

module.exports = router;
