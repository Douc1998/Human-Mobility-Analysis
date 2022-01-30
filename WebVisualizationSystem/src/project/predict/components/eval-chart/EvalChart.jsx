import React, { useRef, useEffect} from 'react';
import * as echarts from 'echarts'; // ECharts
import './eval-chart.css';
import { Radio } from 'antd';

function EvalChart(props) {
  const data = props.data || [
    [
      // 最小值、下四分位数、中位数（或均值）、上四分位数、最大值
      [184.5482672, 194.7216927, 232.065749, 240.2851626, 279.5832308],
      [153.6616283, 193.6552168, 195.7163699, 215.9794666, 237.7711115],
      [149.2742643, 176.8391645, 183.8172753, 208.0798938, 218.3602863],
      [130.7790709, 151.5336446, 156.7595902, 171.2391371, 182.7401095],
      [138.8233638, 149.9194367, 164.5974294, 184.7417205, 190.371495],
    ],
    [
      [0.026908477, 0.033655203, 0.036981394, 0.038704986, 0.047054311],
      [0.025042236, 0.028022257, 0.032609011, 0.035652383, 0.040175786],
      [0.021111026, 0.023502903, 0.025920372, 0.028249607, 0.030729717],
      [0.017219147, 0.018872621, 0.02063995, 0.022203034, 0.024060754],
      [0.014978528, 0.02046308, 0.020532454, 0.024388994, 0.02608638],
    ],
    [
      [936.5132623, 954.7785212, 1096.98735, 1142.861646, 1257.461438],
      [693.265787, 788.0225607, 915.7815034, 1064.258465, 1138.29722],
      [813.3890622, 888.4791003, 1064.316931, 1264.207968, 1315.244801],
      [752.6643987, 822.9369154, 901.1340052, 1008.66907, 1049.603612],
      [968.57097, 1004.605138, 1058.176599, 1135.56508, 1147.782228],
    ],
  ];
  const ref = useRef(null); // 容器对象
  const myChart = useRef(null); // ECharts实例

  // 静态配置项
  const option = {
    title: [
      {
        text: '模型精度评估 - MAE',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      }
    ],
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params) => {
        // 计算当前这组数据在第一个有效数字前有几个0，使得显示位数可以自适应
        let count = 0;
        let temp = params.data[1];
        while (temp < 1) {
          temp = temp * 10;
          count++;
        }
        return `
        模型 ${params.data[0] + 1}<br/>
        <ul style="margin:0;padding-left:15px;list-style:initial">
          <li>最大值: ${params.data[5].toFixed(count + 2)}</li>
          <li>上四分位数: ${params.data[4].toFixed(count + 2)}</li>
          <li>均值: ${params.data[3].toFixed(count + 2)}</li>
          <li>下四分位数: ${params.data[2].toFixed(count + 2)}</li>
          <li>最小值: ${params.data[1].toFixed(count + 2)}</li>
        </ul>
        `;
      }
    },
    grid: {
      left: '0%',
      right: '10%',
      bottom: '0%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      nameGap: 30,
      splitArea: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        formatter: (value) => {
          return '模型' + (value * 1 + 1);
        },
        color: '#fff'
      }
    },
    yAxis: {
      type: 'value',
      splitArea: {
        show: true
      },
      axisLabel: {
        formatter: (value) => {
          // 计算当前这组数据在第一个有效数字前有几个0，使得显示位数可以自适应
          let count = 0;
          let temp = value;
          while (temp < 1) {
            temp = temp * 10;
            count++;
          }
          return value.toFixed(count + 1);
        },
        color: '#fff'
      },
      nameTextStyle: {
        color: '#fff'
      },
      min: function (value) {
        return value.min * 0.9;
      },
      max: function (value) {
        return value.max * 1.1;
      }
    },
    emphasis: {
      focus: 'self',
      blurScope: 'coordinateSystem'
    },
    series: [
      {
        type: 'boxplot',
        data: data[0]
      }
    ]
  };

  useEffect(() => {
    myChart.current = echarts.init(ref.current);
    // console.log("echarts.init事件启动")
    // window.addEventListener("resize", function () {
    //   console.log("window.resize事件启动")
    //   myChart.current.resize();
    // })
    return () => {
      myChart.current.dispose();
      myChart.current = null;
    }
  }, [])

  useEffect(() => {
    // console.log("由于data更新，驱动图表更新")
    myChart.current.setOption(option);
    // return () => {
    //   myChart.current.dispose();
    //   myChart.current = null;
    // }
  }, [data])

  function handle(index){
    const titles = ['模型精度评估 - MAE','模型精度评估 - MRE','模型精度评估 - RMSE'];
    return ()=>{
      option.series[0].data = data[index];
      option.title[0].text = titles[index];
      myChart.current.setOption(option); 
    }
  }

  return (
    <div className='eval-chart-container'>
      <div ref={ref} style={{ width: '100%', height: '250px', ...props.style }}></div>
      <Radio.Group size={"small"} style={{ width: '100%', display: 'flex' }} buttonStyle="solid" defaultValue="mae">
        <Radio.Button style={{ width: '100%', textAlign: 'center' }} value="mae" onClick={handle(0)}>MAE</Radio.Button>
        <Radio.Button style={{ width: '100%', textAlign: 'center' }} value="mre" onClick={handle(1)}>MRE</Radio.Button>
        <Radio.Button style={{ width: '100%', textAlign: 'center' }} value="rmse" onClick={handle(2)}>RMSE</Radio.Button>
      </Radio.Group>
    </div>
  )
}

export default EvalChart;