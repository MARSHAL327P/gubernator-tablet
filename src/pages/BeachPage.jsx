import { observer } from "mobx-react-lite";
import Dashboard from "../components/Dashboard/components/Dashboard";
import WidgetTemplate from "../components/Widgets/components/WidgetTemplate";
import WidgetTemplateStore from "../components/Widgets/store/widget.store";
import {useParams} from "react-router-dom";
import SidebarStore from "../components/Sidebar/store/sidebar.store";
import RealObjectStore from "../components/RealObjects/store/realObject.store";
import {useEffect, useState} from "react";
import BeachLocalStore from "../components/BeachCard/store/beachLocal.store";
import AirQuality from "../components/AirQuality/components/AirQuality";

const BeachPage = observer(() => {
    let [card, setCard] = useState(null)

    const {beachCode} = useParams()
    const tabItems = card && [
        {
            title: "Информация",
            content: "Информация",
            link: "info",
            getParam: true,
        },
        {
            title: "Отзывы",
            content: "Отзывы",
            link: "reviews",
            getParam: true,
        },
        {
            title: "Качество воздуха",
            content: <AirQuality airQualityData={card.airQuality} />,
            link: "aqi",
            getParam: true,
        },
        {
            title: "Виджеты",
            content: <WidgetTemplate
                widgets={[
                    WidgetTemplateStore.widgets.TEMPERATURE,
                    WidgetTemplateStore.widgets.HUMIDITY,
                    WidgetTemplateStore.widgets.PRESSURE,
                ]}
                hasCharts={false}
            />,
            link: "widgets",
            getParam: true,
        },
    ]

    SidebarStore.selectedTabClass = BeachLocalStore

    useEffect(() => {
        setCard(SidebarStore.selectedTabClass.findCard(beachCode))
    }, [SidebarStore.selectedTabClass.list])

    return (
        card && <Dashboard
            card={card}
            tabItems={tabItems}
            dashboardName={"Пляж"}
        />
    )
})

export default BeachPage