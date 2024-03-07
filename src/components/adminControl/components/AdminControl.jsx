import {observer} from "mobx-react-lite";
import cc from "classcat";
import MapStore from "../../Map/store/map.store";
import {Switch} from "@material-tailwind/react";
import AdminControlStore from "../store/adminControl.store";
import {useNavigate} from "react-router-dom";


const AdminControl = observer(() => {
    let navigate = useNavigate()

    return (
        <div className={cc([MapStore.blurBackgroundClasses, "absolute top-5 right-5 py-2 px-3"])}>
            <Switch
                defaultChecked={AdminControlStore.currentRole === AdminControlStore.roles.ADMIN}
                label={AdminControlStore.currentRole === AdminControlStore.roles.USER ? "Пользователь" : "Админ"}
                onClick={AdminControlStore.changeRole.bind(AdminControlStore, navigate)}
            />
        </div>
    )
})

export default AdminControl