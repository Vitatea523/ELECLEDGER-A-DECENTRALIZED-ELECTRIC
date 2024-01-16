import React, {useEffect, useState} from 'react';
import {useStore} from "@/store";
import {useNavigate} from "react-router-dom";
import {Button, Form, Input, InputNumber, Radio, Typography, Select, message} from 'antd';
import {http} from "@/utils";
import axios from "axios";



/* eslint-enable no-template-curly-in-string */
function Create() {
    const {Option} = Select;
    const {Title} = Typography;

    const layout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 16,
        },
    };


    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    const {createStore, userStore} = useStore()
    const navigate = useNavigate()

    async function onFinish (values) {

        // values.ID = "0004"// 有接口后改userStore.userInfo.data.user.id
        values.Owner = userStore.userInfo.data.user.name
        // console.log(values);
        // try {
        //     //navigate and message should be hold after async finished
        //     await createStore.create(values)
        // } catch(e){
        //     message.error(e.response?.data?.message || 'createPage getToken failed')
        // }
        // const jsonValue = JSON.stringify(values)
        // console.log(jsonValue)
        const dataSourceApi = localStorage.getItem('dataSource') || 'dataSource'
        axios.post(`/${dataSourceApi}/create`, values).then((res)=>{
            navigate('/', {replace: true})
            message.success('New order created successfully!')
        })




        // navigate to home page


    }

    const [data, setData] =  useState()

    useEffect(() => {
        http.get('/api/history/all_history').then(res=>{

            let data = res.data.data
            // console.log(typeof data.all_histories[data.all_histories.length-1].Price.toString())
            console.log('data', data.all_histories[data.all_histories.length-1].Price.toString())
            setData(data.all_histories[data.all_histories.length-1].Price.toString())
        })
    }, []);

    // const tips = 'Current suggested: AUD $5.00/kWh'
    const tips='Suggested Price: $' + data + '/kWh' || ''
    /* eslint-disable no-template-curly-in-string */

    return (
        <Form {...layout} name="nest-messages"
              onFinish={onFinish}
              validateMessages={validateMessages}
              // initialValues={{
              //     ID: "468",
              //     Owner: "lydia"
              // }}
        >
            {/*<Title level={3}>Your Balance: AUD$0.00</Title>*/}
            <Title level={4}>Create Transaction</Title>
            {/*<Form.Item*/}
            {/*    name={['title']}*/}
            {/*    label="Title"*/}
            {/*    rules={[*/}
            {/*        {*/}
            {/*            required: true,*/}
            {/*        },*/}
            {/*    ]}*/}
            {/*>*/}
            {/*    <Input/>*/}
            {/*</Form.Item>*/}
            {/*<Form.Item*/}
            {/*    name={['ID']}*/}
            {/*    label="ID (currently for testing)"*/}
            {/*>*/}
            {/*    <Input/>*/}
            {/*</Form.Item>*/}

            {/*<Form.Item*/}
            {/*    name={['Owner']}*/}
            {/*    label="Owner (currently for testing)"*/}
            {/*>*/}
            {/*    <Input/>*/}
            {/*</Form.Item>*/}
            <Form.Item
                name={['Transaction']}
                label="Identity"
                rules={[
                    {
                        required: true,
                        message: 'Please select your identity!'
                    },
                ]}
                >
                <Radio.Group>
                    <Radio value="sell"> I am a SELLER </Radio>
                    <Radio value="buy"> I am a BUYER </Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name={['Value']}
                label="Amount"
                rules={[
                    {
                        type: 'number',
                        min: 0,
                        required: true
                    },
                ]}
            >
                <InputNumber style={{
                    width: '30%',
                }}/>
            </Form.Item>
            <Form.Item
                name={['Price']}
                label="Unit Price"
                rules={[
                    {
                        type: 'number',
                        min: 0,
                        max: 999999,
                        required: true,
                    }
                ]}
                help={tips}
            >
                <InputNumber style={{
                    width: '30%',
                }}/>
            </Form.Item>
            <Form.Item
                name={['Category']}
                label="Category"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please select your category!',
                    },
                ]}
            >
                <Select placeholder="Please select a category"
                        style={{
                            width: '30%',
                        }}>
                    <Option value="clean">Clean Energy</Option>
                    <Option value="fossil">Fossil Energy</Option>
                </Select>
            </Form.Item>
            {/*<Form.Item*/}
            {/*    name="description"*/}
            {/*    label="Description"*/}
            {/*    rules={[*/}
            {/*        {*/}
            {/*            message: 'Describe something here',*/}
            {/*        },*/}
            {/*    ]}*/}
            {/*>*/}
            {/*    <Input.TextArea showCount maxLength={100}/>*/}
            {/*</Form.Item>*/}

            <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

        </Form>

    )
}

export default Create;