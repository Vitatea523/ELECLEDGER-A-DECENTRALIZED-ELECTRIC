// import all utils
// then export from here
// eg: import {http} from '@/utils'

import {http} from './http'
import {setToken,
    getToken,
    removeToken} from './token'

export {
    http,
    setToken,
    getToken,
    removeToken
}