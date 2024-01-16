import { makeAutoObservable } from "mobx"
import {getToken, http, setToken} from '@/utils'

class EmailStore {
    constructor() {
        makeAutoObservable(this)
    }
    async sendEmail(values) {
        setToken('')
        const formData = new FormData();
        formData.append("telephone", values);
        const res = await http.post('api/edit/password', formData)
        return res
    }
}

export default EmailStore