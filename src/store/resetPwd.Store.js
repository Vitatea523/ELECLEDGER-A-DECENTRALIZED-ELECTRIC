import { makeAutoObservable } from "mobx"
import { http } from '../utils'


class ResetPwd {
    constructor() {
        // initial
        makeAutoObservable(this)
    }
    resetPwd = async (values) => {
        const formData = new FormData();
        formData.append("telephone", values.telephone);
        formData.append("password", values.password);
        const res = await http.post('api/account/resetPwd', formData)
        return res.data
    }

}
export default ResetPwd