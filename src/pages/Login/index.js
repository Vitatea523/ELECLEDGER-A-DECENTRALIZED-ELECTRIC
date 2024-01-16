import { Card, Form, Input, Button, message, Modal} from 'antd'
import logo from '../../assets/logo.png'
import './index.scss'
import { useStore } from '@/store'
import {useNavigate} from "react-router-dom";
import React, { useState } from 'react';


function Login() {
    //const navigate = useNavigate()
    const { loginStore, emailStore } = useStore()
    const navigate = useNavigate()
    const onFinish = async values => {
        console.log(values)
        try{
            await loginStore.login(values)
            navigate('/')
            message.success('Login successfully!')
        }catch(failMsg){
            // console.log(failMsg) // TypeError: Cannot read properties of null (reading 'token')
            message.error('Input correct telephone and password please!')
            console.log("Error msg:" +failMsg.response.data.msg)
        }

        // await loginStore.login(values)
        // axios.post('http://34.116.87.205:8080/account/login', values).then((res)=>{
        //     console.log(res)})
        //     if(res.data !== ''){
        //         navigate('/', { replace: true })
        //         message.success('Login successfully')
        //     }else{
        //         navigate('/login', { replace: true })
        //         message.error('Input correct userId or password please!')
        //     }
        // })
    }

    const myFunction = async () => {
        //Todo send email backend
        // console.log("success" + userStore.userInfo.data.user.telephone)
        var person=prompt("Please enter your phone number");

        try {
            const res = await emailStore.sendEmail(person)
            if(res){
                if (res.data.code === 500) {
                    message.error('Edit fail! ' + res.msg)
                }else{
                    message.success('Please check your email to reset your password.');
                    // console.log("success" + JSON.stringify(res))
                    // loginStore.loginOut()
                    //Todo 跳转不跳转

                    // navigate('/account/login',{ replace: true })
                }
            }


        } catch (failMsg) {
            message.error('Edit fail! ' + failMsg.response.data.msg)
            console.log("Error msg:" + failMsg.response.data.msg)
        }
    }


    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />

                <Form
                    validateTrigger={['onBlur', 'onChange']}
                    // initialValues={{
                    //     remember: true,
                    //     mobile: '13811111111',
                    //     code: '246810'
                    // }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="telephone"
                        rules={[
                            {
                                required: true,
                                message: 'please input your telephone here',
                            }
                        ]}
                    >
                        <Input size="large" placeholder="please input your telephone here" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'please input your password here',
                            }
                        ]}
                    >
                        <Input.Password size="large" placeholder="please input your password here" />
                    </Form.Item>
                    {/*<Form.Item*/}
                    {/*    name="remember"*/}
                    {/*    valuePropName="checked"*/}

                    {/*>*/}
                    {/*    <Checkbox className="login-checkbox-label">*/}
                    {/*        I have read and agree to the User Agreement and Privacy Policy.*/}
                    {/*    </Checkbox>*/}
                    {/*</Form.Item>*/}
                    <Form.Item>
                        Do not have the account?<a href="/account/register">Register here!</a>
                        <br/>
                        <Button onClick={()=>myFunction()}>Forget password?</Button>
                        {/*Forget your password?<a href="/account/resetPwd">Reset here!</a>*/}
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            Login
                        </Button>
                    </Form.Item>
                </Form>

            </Card>



        </div>
    )
}
export default Login
