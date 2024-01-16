import { makeAutoObservable } from "mobx"
import { http, setToken, getToken, removeToken} from '../utils'
import axios from "axios";
import {message} from "antd";

class LoginStore {
    token = getToken() || ''
    constructor() {
        makeAutoObservable(this)
    }
    login = async (values) => {
        const formData = new FormData();
        formData.append("telephone", values.telephone);
        formData.append("password", values.password);
        const res = await http.post('api/account/login', formData)
        console.log(res.data.data.token)
        this.token = res.data.data.token
        setToken(this.token)

        // cannot use if for navigate
        // http.post('http://54.66.212.187:8080/account/login', formData).then((res)=>{
        //     console.log(res)
        //     if(res.data.code === "200"){
        //         navigate('/', { replace: true })
        //         message.success('Login successfully')
        //     }else{
        //         navigate('/login', { replace: true })
        //         message.error('Input correct userId or password please!')
        //     }
        // })
        // const formData = new FormData();
        //
        // formData.append("name", values.name);
        // formData.append("password", values.password);
        // // await loginStore.login({ userId, password })
        // axios.post('http://54.66.212.187:8080/account/login', formData).then((res)=> {
        //     console.log(res)
        //     this.token = res.data.data.token
        //     setToken(this.token)
        // })
    }
    loginOut = () => {
        this.token = ''
        removeToken()
    }

}
export default LoginStore