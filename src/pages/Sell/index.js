import React, { useEffect, useState } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import { Input, Space, Button, Divider, Table, Spin } from "antd";
import { http } from '../../utils'

const { Search } = Input;

const onSearch = (value) => {}//console.log(value);
const columns = [
    {
        title: "Owner",
        dataIndex: "Owner",
        key: "Owner",
    },
    {
        title: "Price",
        dataIndex: "Price",
        key: "price",
        sorter: (a, b) => a.Price - b.Price,
    },
    {
        title: "RemainingAmount",
        dataIndex: "Value",
        key: "Value",
    },
    {
        title: "Category",
        dataIndex: "Category",
        key: "Category",
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
    // {
    //     title: "Trade",
    //     key: "action",
    //     render: () => <Button type="danger">buy</Button>,
    // },
];

const Sell = () => {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const dataSourceApi = localStorage.getItem('dataSource') || 'dataSource'
    useEffect(() => {
        setLoading(true)
         http.get(`/${dataSourceApi}/asset/sell`)
         .then(res=>{
            let data = JSON.parse(res.data)            
              let _data = data.map(e=> ({...e.Record})).filter(e=>e.Transaction === "sell")
            setDataSource(_data)
            setLoading(false)
         })
    }, []);
    return (
        <div>
            {/* <div className="top">
                <Space direction="vertical">
                    <Search
                        // placeholder="input search text"
                        allowClear
                        onSearch={onSearch}
                        style={{ width: 400, margin: "-5px 100px 0 300px" }}
                    />
                </Space>
            </div> */}
            <Divider />
            <Spin tip="Loading..." spinning={loading}>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    style={{ marginTop: "10px" }}
                />
            </Spin>
            
        </div>
    );
};

export default Sell;
