const express = require("express");
const cors = require("cors");
const axios = require("axios");

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

// 获取飞机选座模型svg
app.get("/getOthersUrlSvg", (req, res) => {
  const ROOT_PATH = "https://echarts.apache.org/examples";
  console.log("正在处理请求...");
  axios.get(ROOT_PATH + "/data/asset/geo/flight-seats.svg").then((resl) => {
    res.send({
      code: 0,
      message: "success",
      data: {
        svg: resl.data,
      },
    });
  });
});
app.listen(3007, () => {
  console.log("服务开启在3007端口");
});
