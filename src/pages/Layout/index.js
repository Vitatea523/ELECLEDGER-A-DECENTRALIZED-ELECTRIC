import {Layout, Menu, Button, Popconfirm, Space, Modal, Tooltip} from "antd";

import {
    DollarCircleFilled,
    LogoutOutlined,
    HomeOutlined,
    PlusOutlined,
    BoldOutlined,
    DownOutlined,
    UserOutlined,
    CodepenCircleOutlined,
    ExclamationCircleOutlined
} from "@ant-design/icons";

import {Outlet, Routes, Link, useLocation, useNavigate} from "react-router-dom";
import "./index.scss";
import {Dropdown, message} from "antd";
import {useStore} from "@/store";
import {useEffect, useState} from "react";
import {observer} from 'mobx-react-lite'
import profileActiveKeyStore from "@/store/profileActiveKey.Store";

const {Header, Sider} = Layout;
const {confirm} = Modal;


const ElecLayout = () => {

    const navigate = useNavigate()
    const {pathname} = useLocation();
    const {userStore, loginStore, profileActiveKeyStore} = useStore();
    const [username, setUsername] = useState('');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    
    const handleMenuClick = (e) => {
        // console.log("click", e);
    };
    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you sure to logout?',
            icon: <ExclamationCircleOutlined/>,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                ok()
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const ok = (e) => {
        loginStore.loginOut()
        setUsername('')
        navigate('/')
        message.info('Logout successfully');
    };
    const loginMenu = (
            <Menu
                onClick={handleMenuClick}
                items={[
                    {
                        label: (
                            <Link to={"/account/login"}>Login/Register</Link>
                        ),
                        key: "1",
                        icon: <UserOutlined/>,

                    }
                ]}
            />
        )
    ;

    function changeKey(){
        profileActiveKeyStore.changeActiveKey("1")
    }

    const menu = (
        <Menu
            onClick={handleMenuClick}

            items={[
                {
                    label: (
                        <Link to={"/profile"} onClick={changeKey}>

                            Profile

                        </Link>
                    ),
                    key: "1",
                    icon: <UserOutlined/>,

                }, {
                    label: (<a onClick={showDeleteConfirm} type="dashed">
                        Logout
                    </a>),
                    key: "2",
                    icon: <LogoutOutlined/>,
                }
            ]}
        />
    );
    const [currentMenu, setCurrentMenu] = useState(loginMenu);

    const updateDMenu=()=>{
        if(username==''){
            setCurrentMenu(loginMenu)
        }else{
            setCurrentMenu(menu)
        }
    }
    // 获取用户数据
    useEffect(() => {
        try {
            //must use then to async?
            userStore.getUserInfo().then(r => {
                setUsername(userStore.userInfo.data.user.name)
            })
        } catch {
        }
    }, [userStore])

    const changeOrg = ()=>{
        let curTheme = localStorage.getItem('theme')
        let dataSource = localStorage.getItem('dataSource')
        if(curTheme === 'dark' || !curTheme ){
            setTheme('light')
            localStorage.setItem('theme', 'light')
        }else{
            setTheme('dark')
            localStorage.setItem('theme', 'dark')
        }
        // change dataSource
         if(dataSource === 'dataSource' || !dataSource ){
            localStorage.setItem('dataSource', 'source')
        }else{
            localStorage.setItem('dataSource', 'dataSource')
        }

    }
    return (
        <Layout>
            <Header style={{backgroundColor:theme ==='light'?"#fff": '#001529'}}  className="header">
                <Space>
                    <CodepenCircleOutlined spin style={{fontSize: '150%', paddingLeft: '10px'}}/>
                    <div className="logo">
                    </div>
                </Space>

                <Tooltip title="change organization by click this button">
                    <Button onClick={changeOrg} style={{marginLeft:16}}>Organization</Button>
                </Tooltip>
                
                <span style={{marginLeft:16, color: theme ==='light'?'#333': '#fff'}}>Organization {theme ==='light'?'B':'A'}</span>

                <div className="user-info">
          <span className="user-name">
            <Dropdown overlay={currentMenu} onClick={updateDMenu}>
              <Button icon={<UserOutlined/>}>
                <Space>
                    {username}
                    <DownOutlined/>
                </Space>
              </Button>
            </Dropdown>

          </span>

                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme={theme}
                        selectedKeys={[pathname]}
                        style={{height: "100%", borderRight: 0}}
                    >
                        <Menu.Item icon={<HomeOutlined/>} key="/">
                            <Link to={"/"}>Homepage</Link>
                        </Menu.Item>
                        <Menu.Item icon={<DollarCircleFilled/>} key="/sell">
                            <Link to={"/sell"}>Sell</Link>
                        </Menu.Item>
                        <Menu.Item icon={<BoldOutlined/>} key="/buy">
                            <Link to={"/buy"}>Buy</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="layout-content" style={{padding: 20}}>
                    <Outlet/>
                </Layout>
            </Layout>
        </Layout>
    )
        ;
};
//need data to effect view
export default observer(ElecLayout);