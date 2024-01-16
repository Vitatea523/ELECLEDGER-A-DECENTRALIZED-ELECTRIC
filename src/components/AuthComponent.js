// token?
// if yes, render; else: redirect to account/login

// Higher-order components: pass in a component as a parameter of another component, and return the new component after judgment
import {getToken} from "../utils";
import { Navigate } from "react-router-dom";
import {message} from "antd";

function AuthComponent ({children}) {
    const isToken = getToken()
    if (isToken) {
        return <>{children}</>
    } else{
        message.error('Please login first!')
        return <Navigate to="/account/login" replace></Navigate>
    }
}

// eg:
// <AuthComponent> <childrenComp></childrenComp> </AuthComponent>
// do if else

export {
    AuthComponent
}