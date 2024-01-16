import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/antd.min.css';
import './index.scss';
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import {
    BarChart, LineChart
} from 'echarts/charts';
// 引入直角坐标系组件，组件后缀都为 Component
import {
    GridComponent,
    TooltipComponent,
    VisualMapComponent,
    DataZoomComponent,
} from 'echarts/components';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {
    CanvasRenderer
} from 'echarts/renderers';

// 注册必须的组件
echarts.use(
    [GridComponent, BarChart, LineChart, TooltipComponent,VisualMapComponent, DataZoomComponent, CanvasRenderer]
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

