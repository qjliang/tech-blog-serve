import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import indexRoute from "./routes/index";
import adminRoute from "./routes/admin";
import authRoute from "./routes/auth";

const app = express();
//设置跨域访问
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods","POST,GET,PUT,OPTIONS,DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type,X-Requested-With,token,id");
//   res.header("Access-Control-Request-Headers: Origin,X-Requested-With,Content-Type,Accept,Authorization,token");
//   // res.header("X-Powered-By",' 3.2.1')

//   // res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

app.use(cors());

app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api", indexRoute);

// app.use('/admin', express.static(__dirname + '/admin'))
// app.use('/uploads', express.static(__dirname + '/uploads'))

// Error
app.use((err, _req, res, _next) => {
  if (err.name === "UnauthorizedError") {
    return res.sendStatus(401);
  }
  console.error("api route error", err);
  res.sendStatus(err.statusCode || 500);
});

app.listen(3001, () => {
  console.log("http://192.168.31.63:3001");
});
