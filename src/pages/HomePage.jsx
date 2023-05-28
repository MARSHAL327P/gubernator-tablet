import Sidebar from "../components/Sidebar/components/Sidebar";
import Filter from "../components/Filter/components/Filter";
import {observer} from "mobx-react-lite";
import AdminBtn from "../components/AdminPanel/components/AdminBtn";
// import SidebarStore from "../components/Sidebar/store/sidebar.store";
// import {useStores} from "../stores/global.store";
import BeachLocalStore from "../components/BeachCard/store/beachLocal.store";
import BeachCard from "../components/BeachCard/components/BeachCard";

const HomePage = observer(() => {
    // const { sidebarStore } = useStores();

    let tabItems = [
        {
            title: "Пляжи",
            loadingText: "Загрузка пляжей",
            data: BeachLocalStore,
            component: BeachCard,
            link: "/",
        },
        {
            title: "Объекты",
            loadingText: "Загрузка объектов",
            data: BeachLocalStore,
            component: BeachCard,
            link: "/objects",
        },
        {
            title: "Архитектура",
            loadingText: "Загрузка архитектуры",
            data: BeachLocalStore,
            component: BeachCard,
            link: "/architecture",
        },
    ]

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