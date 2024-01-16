import {Card, Form, Input, Button, Checkbox, message} from 'antd'
import logo from '../../assets/logo.png'
import './index.scss'
import {useStore} from '@/store'
import { useNavigate} from "react-router-dom";
import {useState} from "react";


function ResetPwd() {

    const navigate = useNavigate()
    const {resetPwdStore}=useStore()
    const [pwd,setPwd]=useState('')
    const updatePwd = (event) => {
        setPwd(event.target.value);
    };
    const onFinish = async values => {
        try {
            const res=await resetPwdStore.resetPwd(values)
            console.log("success"+JSON.stringify(res))
            if(res.code===200){
                message.success('Reset successfully!')
                navigate('/account/login')
            }else {
                message.error('Register fail! '+ res.msg)
            }
        } catch (failMsg) {
            message.error('Register fail! '+failMsg.response.data.msg)
            console.log("Error msg:" +failMsg.response.data.msg)
        }



    }
    const validPwd = (rule, value, callback) => {
        if (!value) {
            callback('Password cannot be empty')
        } else if (value.length < 6) {
            callback('The password contains at least six characters')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('The password must contain English, digits, or underscores')
        } else {
            callback()
        }
    }
    const checkPwd = (rule, value, callback) => {
        if (!value) {
            callback('Please repeat your password.')
        } else if (value !== pwd) {
            callback('Two passwords are inconsistent')
        } else {
            callback()
        }
    }


    return (
        <div className="resetPwd">
            <Card className="resetPwd-container">
                <img className="resetPwd-logo" src={logo} alt=""/>

                <Form
                    validateTrigger={['onBlur', 'onChange']}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name='telephone'
                        label="Telephone"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter correct number',
                                pattern: /^[0-9]+$/,
                                len: 9
                            },
                        ]}

                    >
                        <Input placeholder="Please enter your telephone number."
                               size="large"/>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {  required: true,validator: validPwd }
                        ]}

                    >
                        <Input.Password
                            onChange = {updatePwd}
                            size="large" placeholder="Please set your password here"/>
                    </Form.Item>
                    <Form.Item
                        label="Repeat"
                        name="repeatPsd"
                        rules={[

                            { required: true,validator:checkPwd}
                        ]}
                    >
                        <Input.Password

                            size="large"
                            placeholder="Please repeat your password."
                        />

                    </Form.Item>
                    <Form.Item>
                        <a href="/account/login">Go to Login page. </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            Reset Password
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
};
export default ResetPwd;
