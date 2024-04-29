const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// 请求用户信息
app.get("/api/usersInfo", (req, res) => {
  res.send({
    username: "ww",
    age: 18,
    profession: "Frontend programmers",
  });
});

app.listen(3006, () => {
  console.log("服务开启在3006端口");
});
