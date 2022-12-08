import {Layout, Menu, message, Popconfirm} from "antd";
import {DiffOutlined, EditOutlined, HomeOutlined, LogoutOutlined} from "@ant-design/icons";
import './index.scss'
import useStore from "@/store";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";

const LayoutPC = () => {
    const {userStore} = useStore()
    const navigate = useNavigate()
    const logout = () => {
        //退出登录
        userStore.logout()
        window.location.reload()
    }
    // 获取当前路由path
    const {pathname} = useLocation()
    useEffect(() => {
        (async ()=>{
            try {
                await userStore.getUserInfo()
            } catch (e) {
                message.success('登录失效，请重新登录')
                userStore.logout()
                navigate('/login')
            }
        })()
    }, [userStore]);

    return (<Layout>
        <Layout.Header className="header">
            <div className="logo"/>
            <div className="user-info">
                <img style={{width:'20px'}} src={userStore.userInfo.photo}/>
                <span className="user-name">{userStore.userInfo.name}</span>
                <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={logout}>
              <LogoutOutlined/> 退出
            </Popconfirm>
          </span>
            </div>
        </Layout.Header>
        <Layout>
            <Layout.Sider width={200} className="site-layout-background">
                <Menu
                    mode="inline"
                    theme="dark"
                    defaultSelectedKeys={[pathname]}
                    style={{height: '100%', borderRight: 0}}
                >
                    <Menu.Item icon={<HomeOutlined/>}
                               key="/"
                               onClick={() => navigate('/')}>
                        数据概览
                    </Menu.Item>
                    <Menu.Item icon={<DiffOutlined/>} key="/article"
                               onClick={() => navigate('/article')}>
                        内容管理
                    </Menu.Item>
                    <Menu.Item icon={<EditOutlined/>} key="/publish"
                               onClick={() => navigate('/publish')}>
                        发布文章
                    </Menu.Item>
                </Menu>
            </Layout.Sider>
            <Layout className="layout-content" style={{padding: 20}}>
                {/*路由出口*/}
                <Outlet/>
            </Layout>
        </Layout>
    </Layout>)
}

export default observer(LayoutPC)