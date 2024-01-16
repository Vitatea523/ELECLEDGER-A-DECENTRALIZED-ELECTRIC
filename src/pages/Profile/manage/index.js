import './index.scss';
import React from 'react';
import {useStore} from "@/store";
import './index.scss'
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from 'react';
import {Form, Input, Button, message} from 'antd';

const layout = {
    labelCol: {
        span: 2,
    },
    wrapperCol: {
        span: 16,
    },
};
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not validate email!',
    }
};


function Info() {
    const {userStore, editStore, emailStore} = useStore();
    const [form] = Form.useForm();
    useEffect(() => {
        setTimeout(() => {
            form.setFieldsValue({
                username: userStore.userInfo.data.user.name,
                telephone: userStore.userInfo.data.user.telephone,
                email: userStore.userInfo.data.user.email,
                password: ''
            });
        }, 500)
    }, []);
    const sendEmail = async () => {

        try {
            const res = await emailStore.sendEmail(userStore.userInfo.data.user.telephone)
            if (res) {
                if (res.data.code === 500) {
                    message.error('Edit fail! ' + res.msg)
                } else {
                    message.success('Please check your email to reset your password.');
                }
            }


        } catch (failMsg) {
            message.error('Edit fail! ' + failMsg.response.data.msg)
            console.log("Error msg:" + failMsg.response.data.msg)
        }
    }

    const onFinish = async values => {
        console.log(values);
        try {
            const formData = new FormData();
            if (values.username) {
                formData.append("name", values.username);
            }
            if (values.email !== userStore.userInfo.data.user.email) {
                formData.append("email", values.email);
            }
            if (values.telephone !== userStore.userInfo.data.user.telephone) {
                formData.append("telephone", values.telephone);
            }
            const res = await editStore.edit(formData)
            console.log("success" + JSON.stringify(res))
            if (res.code === 200) {
                message.success('Edit successfully!')
                window.location.reload()
            } else {
                message.error('Edit fail! ' + res.msg)
            }

        } catch (failMsg) {
            message.error('Edit fail! ' + failMsg.response.data.msg)
            console.log("Error msg:" + failMsg.response.data.msg)
        }
    };

    return (
        <Form name="manage"
              initialValues={{
                  username: '',
                  email: '',
                  telephone: '',
                  password: '',
              }}
              validateTrigger={['onChange']}
              onFinish={onFinish} validateMessages={validateMessages}
              form={form}>
            <Form.Item
                name='username'
                label="Username"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Please enter your username."
                />
            </Form.Item>
            <Form.Item
                name='email'
                label="Email"
                rules={[
                    {
                        required: true,
                        type: 'email',
                    },
                ]}
            >
                <Input/>
            </Form.Item>
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
                />
            </Form.Item>
            <Button onClick={sendEmail}>Change password</Button>
            <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>

            </Form.Item>
        </Form>
    );

}

export default Info;