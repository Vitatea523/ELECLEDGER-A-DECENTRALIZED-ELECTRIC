import './index.scss';
import React, { useEffect, useState } from 'react';
import { useStore } from "@/store";
import {Divider, Space, Table, Collapse, Descriptions, Spin, Button} from 'antd';
import { http } from "@/utils";
//import ListItem from './nest';
import { CaretRightOutlined } from '@ant-design/icons';




function Created() {
    const { userStore } = useStore()
    const [orders, setOrders] = useState([])
    const [datas, setDatas] = useState([])
    const [objectList, setObjectList] = useState([])
    const text = 'hh'
    const owner = userStore.userInfo.data.user.name
    const [loading, setLoading] = useState(false)
    const dataSourceApi = localStorage.getItem('dataSource') || 'dataSource'
    // useEffect(() => {
    //     setLoading(true)
    //     http.get(`/${dataSourceApi}/getasset/` + owner + '/pending').then((res) => {
    //         let data = JSON.parse(res.data)
    //         var vals = [];
    //         for (var i = 0; i < data.length; i++) {
    //             vals.push(data[i].Record);
    //         }
    //         // console.log(vals)
    //         setOrders(vals)
    //         // console.log(vals)
    //         setLoading(false)
    //     })
    //
    // }, [])
    useEffect(() => {
        setLoading(true)
        http.get(`/${dataSourceApi}/getasset/` + owner + '/pending').then((res) => {
            let data = JSON.parse(res.data)
            var vals = [];
            var objectList = []  // [A,B,C]
            for (var i = 0; i < data.length; i++) {
                // ABC级的id，datalist
                var currentObject = {}  // A
                currentObject.id = data[i].Record.ID  // A.id
                currentObject.dataList = []  // A.datalist([])
                // console.log(data[i])
                objectList.push(currentObject)  // [A]

                vals.push(data[i].Record);
                console.log(vals)
            }
            setObjectList(objectList)  // [ABC]
            // console.log(vals)
            //console.log(objectList)
            setOrders(vals)
            // console.log(vals)
            setLoading(false)
        })

    }, [])
    function dateFormat(date) {
        if (date.length === 10){
            let da = new Date(parseInt(date)*1000)
            let year = da.getFullYear()
            let month = da.getMonth() + 1
            let day = da.getDate()
            let hours = da.getHours()
            let minutes = da.getMinutes()
            let seconds = da.getSeconds()
            return year+'-' +'-'+month < 10 ? "0" + month : month+'-'+(day < 10 ? "0" + day : day) + " " + (hours < 10 ? "0" + hours : hours)+':'+ (minutes < 10 ? "0" + minutes : minutes)+':'+ (seconds < 10 ? "0" + seconds : seconds)
        }else{
            let da = new Date(parseInt(date))
            let year = da.getFullYear()
            let month = da.getMonth() + 1
            let day = da.getDate()
            let hours = da.getHours()
            let minutes = da.getMinutes()
            let seconds = da.getSeconds()
            return year+'-' +'-'+month < 10 ? "0" + month : month+'-'+(day < 10 ? "0" + day : day) + " " + (hours < 10 ? "0" + hours : hours)+':'+ (minutes < 10 ? "0" + minutes : minutes)+':'+ (seconds < 10 ? "0" + seconds : seconds)
        }

    }
    // function apiCall(id, e) {
    //     e.preventDefault();
    //     http.get(`/${dataSourceApi}/history/` + id).then((res) => {
    //         let data = JSON.parse(res.data)
    //         var valus = [];
    //         for (var i = 1; i < data.length - 1; i++) {
    //             data[i].Value.time = data[i].Timestamp.seconds
    //             // 把时间进去  .time
    //             valus.push(data[i].Value);
    //         }
    //         console.log(valus)
    //         setDatas(valus)
    //         //console.log(datas)
    //         //console.log(datas)
    //     })
    // }
    function apiCall(id, e) {
        e.preventDefault();
        http.get(`/${dataSourceApi}/history/` + id).then((res) => {

            // ObjectList中id=A的项的dataList <= res    O.id == A?

            let data = JSON.parse(res.data)
            // console.log(data)
            var valus = [];
            for (var i = 0; i < data.length - 1; i++) {
                data[i].Value.time = data[i].Timestamp.seconds
                // console.log(data[i].Value.time)
                // 把时间进去  .time
                valus.push(data[i].Value);
                // console.log(valus)
            }

            var tempObject = {
                id: id,
                dataList: valus
            }
            // console.log(valus)

            setObjectList([...objectList, tempObject])
            console.log(objectList)
            // setObjectList([...new Set(objectList)])
            // console.log(objectList)

            // console.log(valus)
            setDatas(valus)
            // console.log(datas)
            //console.log(datas)
        })
    }

    //
    // function state(datas) {
    //     let data = JSON.parse(datas)
    //
    // }

    return (
        // <div></div>

        <div>
            <Spin tip="Loading..." spinning={loading}>
            {/*collapse*/}
            <Collapse
                // bordered={false}
                // defaultActiveKey={['1']}
                // expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                // className="site-collapse-custom-collapse"
                // activeKey={orders.map(order => order.ID)}
                bordered={false}
                accordion
            >


                {
                    orders.map(order => (
                        <Collapse.Panel header={

                            <Descriptions title={"Order ID: "+order.ID}>
                                {/*<Descriptions.Item label="Category">{order.Category}</Descriptions.Item>*/}
                                <Descriptions.Item label="Created Time">{dateFormat(order.CreatedTime)}</Descriptions.Item>
                                <Descriptions.Item label="Expected Price">${order.Price}</Descriptions.Item>
                                <Descriptions.Item label="Transaction">{order.Transaction}</Descriptions.Item>
                                {/*<Descriptions.Item label="Value">{order.DealAmount}</Descriptions.Item>*/}

                            </Descriptions>

                        } key={order.ID}>

                            <div className="panels">

                                <Descriptions>
                                    <Descriptions.Item label="Category">{order.Category}</Descriptions.Item>
                                    {/*<Descriptions.Item label="Expected Price">{order.Price}</Descriptions.Item>*/}
                                    {/*<Descriptions.Item label="Transaction">{order.Transaction}</Descriptions.Item>*/}
                                    <Descriptions.Item label="Value">{order.Total}kW/h</Descriptions.Item>
                                    {/*<Descriptions.Item label="Created Time">{dateFormat(order.CreatedTime)}</Descriptions.Item>*/}

                                </Descriptions>

                                <Button type="primary" ghost
                                        onClick={(e) => apiCall(order.ID, e)}
                                        values="1">
                                    Get Transaction Details
                                </Button>

                                </div>
                                <div className="panels" id="history">
                                    {/*{()=>state(datas)}*/}
                                    {/*{console.log(objectList.filter(e=>e.id == order.ID) ? objectList.filter(e=>e.id == order.ID)[0]: '')}*/}
                                    {objectList.filter(e=>e.id === order.ID)===undefined?'':
                                        (objectList.filter(e=>e.id === order.ID)[objectList.filter(e=>e.id === order.ID).length-1].dataList.map(a=>(

                                                //     .dataList.map(a=>(
                                                // console.log(a)
                                                <div>
                                                    <p>
                                                        <Divider orientation="left">Deal Time: {dateFormat(a.time)}</Divider>
                                                    </p>
                                                    <Descriptions>
                                                        {/*<Descriptions.Item label="Deal Time">{dateFormat(a.time)}</Descriptions.Item>*/}
                                                        <Descriptions.Item label="Deal Price">${a.DealPrice}</Descriptions.Item>
                                                        <Descriptions.Item label="Deal Amount">{a.DealAmount}kW/h</Descriptions.Item>
                                                    </Descriptions>
                                                </div>

                                            )

                                        ))
                                    }


                            </div>


                        </Collapse.Panel>

                    ))
                }
                {/*/!*<p>You don not have pending order currently</p>*!/*/}
                {/*{*/}
                {/*    // orders===[]?'No pending orders':(*/}
                {/*        orders.map(order => (*/}

                {/*            <Collapse.Panel header={*/}

                {/*                <Descriptions title={"Order ID: "+order.ID}>*/}
                {/*                    /!*<Descriptions.Item label="Category">{order.Category}</Descriptions.Item>*!/*/}
                {/*                    <Descriptions.Item label="Created Time">{dateFormat(order.CreatedTime)}</Descriptions.Item>*/}
                {/*                    <Descriptions.Item label="Expected Price">${order.Price}</Descriptions.Item>*/}
                {/*                    <Descriptions.Item label="Transaction">{order.Transaction}</Descriptions.Item>*/}
                {/*                    /!*<Descriptions.Item label="Value">{order.DealAmount}</Descriptions.Item>*!/*/}

                {/*                </Descriptions>*/}

                {/*            } key={order.ID}>*/}
                {/*                */}
                {/*                */}
                {/*                */}
                {/*            */}
                {/*            <div key={order.ID}>*/}
                {/*                <p>*/}
                {/*                    <Divider orientation="left">Order ID: {order.ID}</Divider>*/}
                {/*                </p>*/}
                {/*                <Descriptions>*/}
                {/*                    <Descriptions.Item label="Category">{order.Category}</Descriptions.Item>*/}
                {/*                    <Descriptions.Item label="Expected Price">${order.Price}</Descriptions.Item>*/}
                {/*                    <Descriptions.Item label="Transaction">{order.Transaction}</Descriptions.Item>*/}
                {/*                    <Descriptions.Item label="Value">{order.Value}kW/h</Descriptions.Item>*/}
                {/*                    <Descriptions.Item label="Created Time">{dateFormat(order.CreatedTime)}</Descriptions.Item>*/}
                {/*                </Descriptions>*/}
                {/*            </div>*/}


                {/*        ))*/}
                {/*    // )*/}


                {/*}*/}

            </Collapse>
            </Spin>
        </div>


    );
}

export default Created;