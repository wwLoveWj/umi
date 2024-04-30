import * as echarts from "echarts";
import axios from "axios";
import react, { useEffect } from "react";
import request from "@/utils/request";
const ROOT_PATH = "https://echarts.apache.org/examples";

const Index = () => {
  const takenSeatNames = ["26E", "26D", "26C", "25D", "23C", "21A", "20F"];
  function makeTakenRegions(takenSeatNames: string[]) {
    var regions = [];
    for (var i = 0; i < takenSeatNames.length; i++) {
      regions.push({
        name: takenSeatNames[i],
        silent: true,
        itemStyle: {
          color: "#bf0e08",
        },
        emphasis: {
          itemStyle: {
            borderColor: "#aaa",
            borderWidth: 1,
          },
        },
        select: {
          itemStyle: {
            color: "#bf0e08",
          },
        },
      });
    }
    return regions;
  }
  const option = {
    tooltip: {},
    geo: {
      map: "flight-seats",
      roam: true,
      selectedMode: "multiple",
      layoutCenter: ["50%", "50%"],
      layoutSize: "300%",
      tooltip: {
        show: true,
      },
      itemStyle: {
        color: "#fff",
      },
      emphasis: {
        itemStyle: {
          color: undefined,
          borderColor: "green",
          borderWidth: 2,
        },
        label: {
          show: false,
        },
      },
      select: {
        itemStyle: {
          color: "green",
        },
        label: {
          show: false,
          textBorderColor: "#fff",
          textBorderWidth: 2,
        },
      },
      regions: makeTakenRegions(takenSeatNames),
    },
  };

  const execEcharts = async () => {
    const chartContainer = document.getElementById("a1");
    const myChart = echarts.init(chartContainer, null, {
      renderer: "svg", // 必须使用 SVG 模式
      width: 600, // 需要指明高和宽
      height: 800,
    });
    await request.get("/getOthersUrlSvg").then((res) => {
      //使用DOMParser将SVG字符串转换成DOM结构
      //   var parser = new DOMParser();
      //   var svgDoc = parser.parseFromString(res.svg, "image/svg+xml");
      //   // 获取转换后的SVG元素
      //   var svgElement = svgDoc.getElementsByTagName("svg")[0];
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(res.svg, "text/xml");
      console.log(xmlDoc, typeof xmlDoc);
      echarts.registerMap("flight-seats", {
        svg: xmlDoc,
      });
    });

    // 创建和配置 ECharts 表格
    myChart.setOption(option);
    myChart.on("geoselectchanged", function (params: any) {
      const selectedNames: string[] = params.allSelected[0].name.slice();

      // Remove taken seats.
      for (var i = selectedNames.length - 1; i >= 0; i--) {
        if (takenSeatNames.indexOf(selectedNames[i]) >= 0) {
          selectedNames.splice(i, 1);
        }
      }

      console.log("selected", selectedNames);
    });
  };
  useEffect(() => {
    execEcharts();
  }, []);
  return (
    <div>
      <div className="dsfjdk" id="a1"></div>
      <p>Index</p>
    </div>
  );
};

export default Index;
