import {observer} from "mobx-react-lite";
import Dashboard from "../components/Dashboard/components/Dashboard";
import {useParams} from "react-router-dom";
import RealObjectStore from "../components/RealObjects/store/realObject.store";
import {runInAction} from "mobx";
import SelectedClassInfoStore from "../stores/selectedClassInfo.store";
import DashboardStore from "../components/Dashboard/store/dashboard.store";
import {lazy, useEffect} from "react";
import {ReactComponent as Widgets} from "../assets/icons/Widgets.svg";
import {ReactComponent as Chart} from "../assets/icons/Chart.svg";
import {ReactComponent as Clouds} from "../assets/icons/Clouds.svg";
import AirQuality from "../components/AirQuality/components/AirQuality";

const WidgetTemplate = lazy(() => import("../components/Widgets/templates/WidgetTemplate"))
const Charts = lazy(() => import("../components/Charts/components/Charts"))

const RealObjectPage = observer(() => {
    const card = SelectedClassInfoStore.currentClass?.card
    const tabItems = [
        {
            title: "Виджеты",
            content: <WidgetTemplate data={card?.props} />,
            link: "widgets",
            getParam: true,
            icon: Widgets
        },
        {
            title: "Графики",
            content: <Charts data={card?.props}/>,
            link: "charts",
            getParam: true,
            icon: Chart
        },
        {
            title: "Качество воздуха",
            content: <AirQuality card={card}/>,
            link: "aqi",
            getParam: true,
            icon: Clouds
        },
    ]

    let {objectType, objectId} = useParams()

    objectType = objectType.toUpperCase().replace(/-/g, "_")

    useEffect(() => {
        runInAction(() => {
            RealObjectStore.id = objectId
            RealObjectStore.type = objectType

            DashboardStore.initDashboardObject(RealObjectStore)

        })
    }, [objectId, objectType])

    return (
        <Dashboard
            tabItems={tabItems}
            homeLink={"/object"}
        />
    )
})

export default RealObjectPage