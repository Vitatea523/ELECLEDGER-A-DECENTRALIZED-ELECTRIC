import './index.scss';
import React, {useEffect, useState} from 'react';
import {useStore} from "@/store";
import {Divider, Space, Table} from 'antd';
import {http} from "@/utils";

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
        title: 'Amount Expected',
        dataIndex: 'Value',
        sorter: (a, b) => a.amount - b.amount,
    },
    {
        title: 'Amount Dealed',
        dataIndex: 'Amount',
        sorter: (a, b) => a.amount - b.amount,
    },
    {
        title: 'Price Expected',
        dataIndex: 'Price',
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: 'Price Dealed',
        dataIndex: 'DealPrice',
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
    },
    // {
    //     title: 'Transaction Time',
    //     dataIndex: 'orderTime',
    //     sorter: (a, b) => a.time - b.time,
    // }
];


function Transaction() {
    const data = [
        {
            title: 'sell',
            transactionId: '0001',
            amount: 11,
            price: 22,
            category: 'green',
            transactionTime: '2022-01-01 11:11:11',
            orderTime: '2022-01-01 01:01:01'
        }
    ]
    const [transaction, setTransaction] = useState([])
    const dataSourceApi = localStorage.getItem('dataSource') || 'dataSource'
    useEffect(()=>{
        http.get(`/${dataSourceApi}/history/1012`).then( (res) =>{
            let data = JSON.parse(res.data)
            // console.log(data)
            let _data = data.map(e => ({...e.Value})).filter(e=>e.DealPrice)
            // console.log(_data)
            setTransaction(_data)
        })
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
                dataSource={transaction}
                pagination={false}
                style={{ marginTop: "10px" }}
            />
        </div>


    );
}

export default Transaction;