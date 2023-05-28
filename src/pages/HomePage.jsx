import Sidebar from "../components/Sidebar/components/Sidebar";
import Filter from "../components/Filter/components/Filter";
import {observer} from "mobx-react-lite";
import AdminBtn from "../components/AdminPanel/components/AdminBtn";
// import SidebarStore from "../components/Sidebar/store/sidebar.store";
// import {useStores} from "../stores/global.store";
import BeachLocalStore from "../components/BeachCard/store/beachLocal.store";
import BeachCard from "../components/BeachCard/components/BeachCard";
import RealObjectCard from "../components/RealObjects/components/RealObjectCard";
import RealObjectStore from "../components/RealObjects/store/realObject.store";

const HomePage = observer(({tabItems}) => {
    // const { sidebarStore } = useStores();

    return (
        <>
            <div className={"flex drop-shadow-xl h-full transition absolute top-0 left-0"}>
                <Sidebar tabItems={tabItems}/>
                <Filter/>
            </div>
            <AdminBtn/>
        </>
    )
})

export default HomePage