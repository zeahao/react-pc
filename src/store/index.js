import {makeAutoObservable} from "mobx";
import userStore from "@/store/userStore";
import {createContext, useContext} from "react";

class Store {
    constructor() {
        makeAutoObservable(this)
        this.userStore = new userStore()
    }
}

// 将Store挂载在context上
const context = createContext(new Store())

const useStore = () => useContext(context)

export default useStore