import CreateStore from'./create.Store'
import LoginStore from "./login.Store";
import RegisterStore from "./register.Store";
// import UserStore from "./user.Store"
import React from "react";
import UserStore from "@/store/user.Store";
import EditStore from "@/store/edit.Store";
import ResetPwdStore from "@/store/resetPwd.Store";
import EmailStore from "@/store/email.Store";
import profileActiveKeyStore from "@/store/profileActiveKey.Store";

class RootStore {
    // initialization
    constructor() {
        // two attributes = instance objects from sub components
        this.registerStore=new RegisterStore()
        this.createStore = new CreateStore()
        this.loginStore = new LoginStore()
        this.userStore = new UserStore()
        this.editStore = new EditStore()
        this.emailStore = new EmailStore()
        this.resetPwdStore = new ResetPwdStore()
        this.profileActiveKeyStore = new profileActiveKeyStore()
    }
}

// instantiated root
const rootStore = new RootStore()
const context = React.createContext(rootStore)

const useStore = () => React.useContext(context)
//export

export { useStore }