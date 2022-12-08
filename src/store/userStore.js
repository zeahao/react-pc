import {makeAutoObservable} from "mobx";
import {delToken, getToken, http, setToken} from "@/utils";

class UserStore {
    token = getToken() || ''
    userInfo = {}

    constructor() {
        makeAutoObservable(this)
    }

    login = async ({mobile, code}) => {
        let res = await http.post('authorizations', {
            mobile,
            code
        })
        if (Math.floor(res.status/100) === 2) {
            this.token = res.data.data.token
            // 存入缓存
            setToken(this.token)
        }else {
            return Promise.reject(new Error('失败'))
        }
    }

    // 退出登录
    logout=()=>{
        this.token = ''
        delToken()
    }

    // 获取用户信息
    getUserInfo = async ()=>{
        let res = await http.get('/user/profile')
        if (Math.floor(res.status/100) === 2) {
            this.userInfo = res.data.data
        }else {
            // 获取用户信息失败
            return Promise.reject(new Error())
        }
    }
}

export default UserStore