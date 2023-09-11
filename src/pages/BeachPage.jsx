import { observer } from "mobx-react-lite";
import Dashboard from "../components/Dashboard/components/Dashboard";
import WidgetTemplate from "../components/Widgets/templates/WidgetTemplate";
import {useParams} from "react-router-dom";
import BeachLocalStore from "../components/BeachCard/store/beachLocal.store";
import AirQuality from "../components/AirQuality/components/AirQuality";
import SelectedClassInfoStore from "../stores/selectedClassInfo.store";
import {runInAction} from "mobx";
import BeachInfo from "../components/BeachCard/components/BeachInfo";
import Reviews from "../components/Reviews/components/Reviews";
import WaterQuality from "../components/WaterQuality/components/WaterQuality";
import DashboardStore from "../components/Dashboard/store/dashboard.store";
import {useEffect} from "react";

const BeachPage = observer(() => {
    const card = SelectedClassInfoStore.currentClass?.card
    const {beachCode} = useParams()
    const tabItems = [
        {
            title: "Информация",
            content: <BeachInfo/>,
            link: "info",
            getParam: true,
        },
        {
            title: "Отзывы",
            content: <Reviews card={card}/>,
            link: "reviews",
            getParam: true,
        },
        {
            title: "Качество воздуха",
            content: <AirQuality card={card}/>,
            link: "aqi",
            getParam: true,
        },
        {
            title: "Качество воды",
            content: <WaterQuality card={card}/>,
            link: "wqi",
            getParam: true,
        },
        {
            title: "Виджеты",
            content: <WidgetTemplate
                data={card?.indications}
                hasCharts={false}
            />,
            link: "widgets",
            getParam: true,
        },
    ]

    useEffect(() => {
        runInAction(() => {
            BeachLocalStore.code = beachCode

            DashboardStore.initDashboardObject(BeachLocalStore)
        })
    }, [beachCode])

    return (
        <Dashboard
            card={card}
            tabItems={tabItems}
        />
    )
})

export default BeachPage