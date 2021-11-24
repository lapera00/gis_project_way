var express = require("express");
var http = require("http");
const https = require("https");
var serveStatic = require("serve-static"); //특정 폴더의 파일들을 특정 패스로 접근할 수 있도록 열어주는 역할
var path = require("path");
var cookieParser = require("cookie-parser");
const fs = require("fs");
const httpsLocalhost = require("https-localhost")();

const privateKey = fs.readFileSync("./privkey.pem");
const certificate = fs.readFileSync("./Certificate.crt");
const options = {
  key: privateKey,
  cert: certificate,
};
// var session = require("express-session");
// var MySQLStore = require("express-mysql-session")(session);
// var sessionStore = new MySQLStore(options);
// var options = {
//   host: "127.0.0.1",
//   user: "root",
//   password: "123456",
//   port: 3306,
//   database: "project_way",
// };

const app = express();

const router = require("./routes/routes.js");

const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: false }));

app.use("/", express.static("./public"));

// app.use(
//   session({
//     secret: "secretkeyway",
//     resave: false,
//     saveUninitialized: true,
//     store: sessionStore,
//   })
// );

app.use(router);
// const httpsServer = https.createServer(options, app);
// httpsServer.listen(3003, function () {
//   console.log("HTTPS server listening on port " + 3003);
// });
// const certs = await httpsLocalhost.getCerts();
https.createServer(options, app).listen(3004, function () {});
http.createServer(app).listen(3003, function () {});
// http
//   .createServer(function (req, res) {
//     res.writeHead(301, {
//       Location: "https://" + req.headers["host"] + req.url,
//     });
//     res.end();
//   })
//   .listen(3003);
// app.listen(3003);
//3003-server, 3306-mysql, 5500-html
