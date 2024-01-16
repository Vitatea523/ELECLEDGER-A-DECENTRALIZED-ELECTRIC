import './index.scss';
// tabs
import {Button, Tabs} from 'antd';
import React, {useEffect, useState} from 'react';
import {Sticky, StickyContainer} from 'react-sticky';

import {AuthComponent} from "@/components/AuthComponent";
// avatar
import {Image} from 'antd';

// descriptions
import {Descriptions} from 'antd';
import {Typography} from 'antd';
import {useStore} from "@/store";

//Tab component
import ManageInfo from "@/pages/Profile/manage";
import Created from "@/pages/Profile/created/index";
import Create from "@/pages/Profile/create";
import Transaction from "@/pages/Profile/transaction";

const {TabPane} = Tabs;

const renderTabBar = (props, DefaultTabBar) => (
    <Sticky bottomOffset={80}>
        {({style}) => (
            <DefaultTabBar {...props} className="site-custom-tab-bar" style={{...style}}/>
        )}
    </Sticky>
);

const {Paragraph} = Typography;

function Profile() {
    const {userStore} = useStore();

    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [userId, setUserId] = useState('');
    const [moneyBalance, setMoneyBalance] = useState(0);
    const [electricityBalance, setElectricityBalance] = useState(0);
    const {profileActiveKeyStore} = useStore();


    useEffect(() => {
        try {
            userStore.getUserInfo().then(r => {
                    setUsername(userStore.userInfo.data.user.name)
                    setUserId(userStore.userInfo.data.user.id)
                    setEmail(userStore.userInfo.data.user.email)
                    setTelephone(userStore.userInfo.data.user.telephone)
                    setMoneyBalance(userStore.userInfo.data.user.money_balance)
                    setElectricityBalance(userStore.userInfo.data.user.electricity_balance)
                }
            )


        } catch {
        }
    }, [])
    return (
        <AuthComponent>
            <Descriptions
                title="User Info"
                bordered
                labelStyle={{fontWeight: "bold"}}
                className="desItem">
                <Descriptions.Item style={{backgroundColor: "rgb(0 0 0 / 5%)"}}
                                   label="Username">{userName}</Descriptions.Item>
                <Descriptions.Item style={{backgroundColor: "rgb(0 0 0 / 5%)"}} label="id">
                    <Paragraph copyable>{userId}</Paragraph>
                </Descriptions.Item>
                <Descriptions.Item style={{backgroundColor: "rgb(0 0 0 / 5%)"}} label="Telephone" >
                    {telephone}
                </Descriptions.Item>
                <Descriptions.Item style={{backgroundColor: "rgb(0 0 0 / 5%)"}}
                                   label="Money Balance">{moneyBalance}</Descriptions.Item>
                <Descriptions.Item style={{backgroundColor: "rgb(0 0 0 / 5%)"}}
                                   label="Electricity Balance">{electricityBalance}</Descriptions.Item>

                <Descriptions.Item style={{backgroundColor: "rgb(0 0 0 / 5%)"}} label="Email"
                                   span={2}>{email}</Descriptions.Item>
            </Descriptions>

            <StickyContainer>
                <Tabs destroyInactiveTabPane defaultActiveKey={profileActiveKeyStore.key} renderTabBar={renderTabBar}>
                    <TabPane
                        tab="Manage profile"
                        key="1"
                    >
                        <ManageInfo/>
                    </TabPane>
                    <TabPane tab="Create" key="2">
                        <Create/>
                    </TabPane>
                    <TabPane tab="Done" key="3">
                        <Transaction/>
                    </TabPane>
                    <TabPane tab="Pending" key="4">
                        <Created/>
                    </TabPane>
                </Tabs>
            </StickyContainer>
        </AuthComponent>


    );
}

export default Profile;