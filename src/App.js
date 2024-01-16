import {BrowserRouter, Routes, Route} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Layout from "./pages/Layout";
import Buy from "./pages/Buy";
import Create from "./pages/Create";
import Sell from "./pages/Sell";
import Profile from "./pages/Profile";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPwd from "@/pages/ResetPwd";
import { HistoryRouter, history } from './utils/history'

import {AuthComponent} from "./components/AuthComponent";

function App() {
    return (
        //config the route
        // <HistoryRouter history={history}>
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={
                            // <AuthComponent>
                                <Layout/>
                            // </AuthComponent>
                        }
                    >
                        {/* 二级路由默认页面 */}
                        <Route index element={<Homepage/>}/>
                        <Route path="buy" element={<Buy/>}/>
                        <Route path="sell" element={<Sell/>}/>
                        <Route path="create" element={<Create/>}/>
                        <Route path="profile" element={<Profile/>}/>
                    </Route>
                    <Route
                        path="/account/register"
                        element={
                            <Register/>
                        }
                    ></Route>
                    <Route
                        path="/account/login"
                        element={
                            <Login/>
                        }
                    ></Route>
                    <Route
                        path="/account/resetPwd"
                        element={
                            <ResetPwd/>
                        }
                    ></Route>

                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
