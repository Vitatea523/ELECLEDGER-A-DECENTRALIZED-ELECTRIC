// create module
import {makeAutoObservable} from "mobx";
import {http, getToken} from '../utils'

class CreateStore {
    token = getToken() || ''

    constructor() {
        // response
        makeAutoObservable(this)
    }

    create = async (value) => {
        // call interface
        console.log(value)
        const res = await http.post('http://3.26.47.174:3001/create', {
            // user,
            // transaction,
            // description
            value
        })
        // const jsonValue = JSON.stringify(value)
        // console.log(jsonValue)
        // await http.post('http://3.26.47.174:3001/create', jsonValue)
        // save to token

        // save to local storage
        // setToken(this.token)
        this.token = res.data.token
    }
}

export default CreateStore