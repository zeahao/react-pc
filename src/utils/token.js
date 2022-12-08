// 封装存取token
const key = 'react-pc'

export const getToken = ()=>{
    return window.localStorage.getItem(key)
}

export const setToken = (token)=>{
    return window.localStorage.setItem(key,token)
}

export const delToken = ()=>{
    return window.localStorage.removeItem(key)
}