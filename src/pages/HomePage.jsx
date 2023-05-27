import Sidebar from "../components/Sidebar/components/Sidebar";
import Filter from "../components/Filter/components/Filter";
import {observer} from "mobx-react-lite";
import AdminBtn from "../components/AdminPanel/components/AdminBtn";

const HomePage = observer(() => {
    return (
        <>
            <div className={"flex drop-shadow-xl h-full transition absolute top-0 left-0"}>
                <Sidebar/>
                <Filter/>
            </div>
            <AdminBtn/>
        </>
    )
})

export default HomePage