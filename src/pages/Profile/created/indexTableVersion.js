import './index.scss';
import React, {useEffect, useState} from 'react';
import {useStore} from "@/store";
import {Divider, Space, Table, Collapse} from 'antd';
import {http} from "@/utils";

import { CaretRightOutlined } from '@ant-design/icons';
const { Panel } = Collapse;

const columns = [
    {
        title: 'Title',
        dataIndex: 'Transaction',
        filters: [
            {
                text: 'sell',
                value: 'sell',
            },
            {
                text: 'buy',
                value: 'buy',
            }
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.Transaction.includes(value),
    },
    {
        title: 'Transaction ID',
        dataIndex: 'ID',
        sorter: (a, b) => a.transactionId - b.transactionId,
    },
    {
        title: 'Amount',
        dataIndex: 'Value',
        sorter: (a, b) => a.amount - b.amount,
    },
    {
        title: 'Price',
        dataIndex: 'Price',
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: 'Category',
        dataIndex: 'Category',
        filters: [
            {
                text: 'clean',
                value: 'clean',
            },
            {
                text: 'fossil',
                value: 'fossil',
            },
        ],
        onFilter: (value, record) => record.Category.includes(value),
    },
    {
        title: 'Order Time',
        dataIndex: 'Time',
        sorter: (a, b) => a.time - b.time,
    }
];


function Created() {
    const [order, setOrder] = useState([])
    const dataSourceApi = localStorage.getItem('dataSource') || 'dataSource'
    useEffect(()=>{
        http.get(`/${dataSourceApi}`).then( (res) =>{
            let data = JSON.parse(res.data)
            let _data = data.map(e => ({...e.Record})).filter(e=>e.Status==='created')
            setOrder(_data)
            console.log('111')})

    },[])


    return (
        <div>
            <div className="top">
                <Space direction="vertical">

                </Space>
            </div>
            <Divider />
            <Table
                columns={columns}
                dataSource={order}
                pagination={false}
                style={{ marginTop: "10px" }}
            />

            // collapse
        </div>


    );
}

export default Created;