import React, { useEffect, useRef } from "react";
import "./index.scss";
import {Divider, Card, Col, Row, Tag,Descriptions, Button} from "antd";
import {Link, useNavigate} from "react-router-dom";
import LineChat from '../../components/LineChat'
import {useStore} from "@/store";


const {Meta} = Card;

function Homepage() {
    const {profileActiveKeyStore} = useStore();
    function changeKey(){
        profileActiveKeyStore.changeActiveKey("2")
        console.log(profileActiveKeyStore.key)
    }


    return (
        <div className="home">
            {/* Introduction  */}
            <Divider orientation="left">Introduction</Divider>
            <div className="introduction ">
                <div className="site-card-border-less-wrapper">
                    <Card title="Discover, buy and sell electricity." bordered={false}>
                        <p>Elecledger is a distributed electricity transaction system. The aim is to address the
                            shortcomings of centralized energy trading, an improved blockchain and smart contract will
                            be used to improve the security and privacy issues of the traditional distributed power
                            trading system. Based on blockchain's tamper resistance, anonymity, traceability and
                            multi-node nature, this system create a highly secure and low energy consumption electricity
                            trading platform. </p>
                        <p>In order to enable users to compare electricity prices from various sellers in real time, we
                            intend to offer an advanced distributed electricity trading system based on blockchain and
                            smart contracts. At the same time, our system will be able to protect user information,
                            enabling them to view real-time prices, independently buy and sell electricity, and look up
                            previous transaction histories, among other things.</p>
                    </Card>
                </div>
                <Divider orientation="left">Features</Divider>
                <div>
                    <Tag color="magenta">Show the price in real time.</Tag>
                    <br/> <br/>
                    <Tag color="cyan">Users can buy or buy electricity.</Tag>
                    <br/> <br/>
                    <Tag color="red">Users can see the history of energy transactions.</Tag>
                    <br/><br/>
                    <Tag color="geekblue">After the transaction is successful, the system can store the electricity energy
                        transaction information.</Tag>
                    <br/> <br/>
                    <Tag color="purple">The information is true and complete.</Tag>
                    <br/> <br/>
                    <Tag color="gold">The user's information is confidential.</Tag>
                </div>
            </div>
            <Divider>
                <Button
                    type="primary" shape="round" size="large"
                    onClick={changeKey}>
                    <Link to={"/profile"}>
                            CREATE ORDER
                    </Link>
                    </Button>
            </Divider>
            {/* line-chat */}
            <LineChat/>
            {/* Instruction */}
            <Divider orientation="left">Instruction</Divider>
            <div className="instruction">
                <Divider orientation="left">For buyer</Divider>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="Step1">Set up your wallet</Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Step2" bordered={false}>
                            Create your electricity buy order
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Step3" bordered={false}>
                            Check your transaction
                        </Card>
                    </Col>
                </Row>
                <Divider orientation="left">For Seller</Divider>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="Step1">Set up your wallet</Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Step2" bordered={false}>
                            Create your electricity resources(type, amount)
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Step3" bordered={false}>
                            Check your transaction
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* About */}
            <Divider orientation="left">About</Divider>
            <div className="about">
                <Descriptions title="Developer Info">
                    <Descriptions.Item label="Mahuirong Du">madu66998@uni.sydney.edu.au</Descriptions.Item>
                    <Descriptions.Item label="Mingcheng Yu">yson0332@uni.sydney.edu.au</Descriptions.Item>
                    <Descriptions.Item label="Yunhui Song">Hangzhou, Zhejiang</Descriptions.Item>
                    <Descriptions.Item label="Weibin Li">weli4997@uni.sydney.edu.au</Descriptions.Item>
                    <Descriptions.Item label="Junyuan Zhang">
                        jzha7546@uni.sydney.edu.au
                    </Descriptions.Item>
                    <Descriptions.Item label="Xingjian Li">
                        xili9453@uni.sydney.edu.au
                    </Descriptions.Item>
                </Descriptions>
            </div>
        </div>
    );
}

export default Homepage;
