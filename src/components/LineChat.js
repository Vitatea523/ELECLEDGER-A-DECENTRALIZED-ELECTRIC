import React, { useEffect, useRef, useState } from "react";
import useChat from './useChat'

import { http } from '../utils'

//将时间戳转换成日期格式
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());

    return Y+M+D+h+m+s;
}

function LineChat() {
    
    const chartRef = useRef()

    const [data, setData] =  useState([])

    useEffect(() => {
        http.get('/api/history/all_history').then(res=>{
            
            let data = res.data.data
            console.log('data', data)
            setData(data.all_histories)
        })
    }, []);
    
    const option = {
            title: {
                text: 'Beijing AQI',
                left: '1%'
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '5%',
                right: '1%',
                bottom: '10%'
            },
            xAxis: {
                data: data.map(function (item) {
                return timestampToTime(item.TransferTime);
                })
            },
            yAxis: {},
            toolbox: {
                right: 10,
                feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
                }
            },
            dataZoom: [
                {
                startValue: '2014-06-01'
                },
                {
                type: 'inside'
                }
            ],
            visualMap: {
                top: 50,
                right: 10,
                pieces: [
                {
                    gt: 0,
                    lte: 50,
                    color: '#93CE07'
                },
                {
                    gt: 50,
                    lte: 100,
                    color: '#FBDB0F'
                },
                {
                    gt: 100,
                    lte: 150,
                    color: '#FC7D02'
                },
                {
                    gt: 150,
                    lte: 200,
                    color: '#FD0100'
                },
                {
                    gt: 200,
                    lte: 300,
                    color: '#AA069F'
                },
                {
                    gt: 300,
                    color: '#AC3B2A'
                }
                ],
                outOfRange: {
                color: '#999'
                }
            },
            series: {
                name: 'Sell',
                type: 'line',
                data: data.map(function (item) {
                    return item.Price;
                }),
                markLine: {
                silent: true,
                lineStyle: {
                    color: '#333'
                },
                data: [
                    {
                    yAxis: 50
                    },
                    {
                    yAxis: 100
                    },
                    {
                    yAxis: 150
                    },
                    {
                    yAxis: 200
                    },
                    {
                    yAxis: 300
                    }
                ]
                }
            }
        }
    useChat(chartRef, option)

    return (
        <div style={{ width: '80%', height: '500px' }} ref={chartRef}></div>
    )

}


export default LineChat