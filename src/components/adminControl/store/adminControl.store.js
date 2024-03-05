import {makeAutoObservable} from "mobx";
import SidebarStore from "../../Sidebar/store/sidebar.store";
import {toPage} from "../../../Utils";

class AdminControl {
    roles = {
        USER: "user",
        ADMIN: "admin",
    }
    currentRole = this.roles.USER

    changeRole(navigate){
        this.currentRole = this.isAdmin ? this.roles.USER : this.roles.ADMIN
        localStorage.setItem("role", this.currentRole)

        if( this.isAdmin ){
            window.location.replace("/object")
        } else {
            window.location.replace("/")
        }

    }

    get isAdmin(){
        return this.currentRole === this.roles.ADMIN
    }

    constructor() {
        makeAutoObservable(this)

        const roleFromStorage = localStorage.getItem("role")

        if( roleFromStorage ){
            this.currentRole = roleFromStorage
        } else {
            localStorage.setItem("role", this.currentRole)
        }

    }
}

export default AdminControl = new AdminControl()