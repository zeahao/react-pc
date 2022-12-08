import {Button, Card, Checkbox, Form, Input, message} from "antd";
import logo from "@/assets/logo.png"
import './index.scss'
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import useStore from "@/store";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";

const Login = () => {
    const navigate = useNavigate()
    const {userStore} = useStore()
    const onFinish = async (values) => {
        try {
            await userStore.login({
                mobile: values.username,
                code: values.password
            })
            // 路由到主页
            navigate('/')
            message.success('登陆成功')
        } catch (e) {
            message.success(`登录失败(${e.message})`)
        }
    }
    return (<div className={'login'}>
        <Card className="login-container">
            <img className="login-logo" src={logo} alt=""/>
            {/* 登录表单 */}
            <Form
                validateTrigger={'onBlur'}
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    initialValue={'13811111111'}
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名',
                        }
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    initialValue={'246810'}
                    rules={[
                        {
                            required: true,
                            message: '请输入密码!',
                        },
                        {
                            min: 6,
                            message: '密码长度必须大于等于6',
                            validateTrigger: 'onBlur'
                        }
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName={"checked"} noStyle>
                        <Checkbox>同意用户协议</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        忘记密码？
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Login
                    </Button>
                    Or <a href="">register now!</a>
                </Form.Item>
            </Form>
        </Card>
    </div>)
}

export default observer(Login)