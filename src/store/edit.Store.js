import { makeAutoObservable } from "mobx"
import { http, setToken, getToken, removeToken } from '../utils'


class editStore {
    constructor() {
        // initial
        makeAutoObservable(this)


    }
    edit = async (values) => {
        // const formData = new FormData();
        // if (values.username) {
        //     formData.append("name", values.username);
        // }
        // if (values.email ) {
        //     formData.append("email", values.email);
        // }
        // if (values.telephone ) {
        //     formData.append("telephone", values.telephone);
        // }

        // formData.append("telephone", values.telephone);
        // // if(values.email!=userStore.userInfo.data.user.email){
        //     formData.append("email", values.email);
        // }

        const res = await http.post('api/account/edit_info', values)
        console.log('res'+res)
        return res.data
    }

}
export default editStore