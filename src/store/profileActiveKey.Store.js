import {makeAutoObservable} from "mobx";
import {http, getToken} from '../utils'

class profileActiveKeyStore {
    key = "1"
    constructor() {
        // response
        makeAutoObservable(this)
    }

    changeActiveKey = (key) => {
        this.key = key
        // console.log(this.key)
    }
}

export default profileActiveKeyStore