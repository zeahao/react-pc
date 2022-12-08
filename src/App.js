import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom"
import LayoutPC from "@/pages/Layout"
import Login from "@/pages/Login";
import 'antd/dist/reset.css'
import AuthComponent from "@/components/AuthComponent";
import './App.scss'
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";
import {Button, Result} from "antd";

function App() {
    const navigate = useNavigate()
    return (
        <div className="App">
            <Routes>
                {/*需要鉴权的路由*/}
                <Route path="/" element={
                    <AuthComponent>
                        <LayoutPC/>
                    </AuthComponent>
                }>
                    <Route path={''} element={<Home/>}></Route>
                    <Route path={'article'} element={<Article/>}></Route>
                    <Route path={'publish'} element={<Publish/>}></Route>
                </Route>
                {/*不需要鉴权的路由*/}
                <Route path={'/login'} element={<Login/>}></Route>
                <Route path={'*'} element={<Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary" onClick={() => navigate('/')}>Back Home</Button>}
                />}></Route>
            </Routes>
        </div>
    );
}

export default App
