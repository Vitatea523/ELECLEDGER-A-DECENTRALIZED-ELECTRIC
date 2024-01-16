import React, { useEffect } from 'react' 
// var echarts = require('echarts') 
import * as echarts from 'echarts/core';



function useChart(chartRef, options) { 
    let myChart = null 
    function renderChart() { 
        
        const chart = echarts.getInstanceByDom(chartRef.current) 
        
        if (chart) { 
            myChart = chart 
        } else { 
            myChart = echarts.init(chartRef.current) 
        } 
        console.log('chart', myChart)
        myChart.setOption(options) 
    } 
    useEffect(() => { 
        renderChart() 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]) 
    useEffect(() => { 
        return () => { myChart && myChart.dispose() } 
    }, []) 
    return 
} 
    
export default useChart
