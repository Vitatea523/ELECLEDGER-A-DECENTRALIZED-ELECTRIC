// 用户模块
import { makeAutoObservable } from "mobx"
import { http } from '@/utils'

class UserStore {
    userInfo = {}
    constructor() {
        makeAutoObservable(this)
    }
    async getUserInfo() {
        const res = await http.get('api/account/info')
        this.userInfo = res.data
        return this.userInfo
    }
}

export default UserStore