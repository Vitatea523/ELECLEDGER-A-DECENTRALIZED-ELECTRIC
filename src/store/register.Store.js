import { makeAutoObservable } from "mobx"
import { http, setToken, getToken, removeToken } from '../utils'
import axios from "axios";
import { message } from "antd";

class registerStore {
    constructor() {
        // initial
        makeAutoObservable(this)
    }
    register = async (values) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("password", values.password);
        formData.append("publicKey", values.publicKey);
        formData.append("telephone", values.telephone);
        formData.append("email", values.email);
        const res = await http.post('api/account/register', formData)
        return res.data


    }

}
export default registerStore