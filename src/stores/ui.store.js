import {makeAutoObservable} from "mobx";
import Notification from "../components/Notification/components/Notification";

class UiStore{
    notification(content){
        return <Notification content={content}/>
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default UiStore = new UiStore()