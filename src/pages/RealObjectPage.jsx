import {observer} from "mobx-react-lite";
import Dashboard from "../components/Dashboard/components/Dashboard";
import WidgetTemplate from "../components/Widgets/components/WidgetTemplate";
import WidgetTemplateStore from "../components/Widgets/store/widget.store";
import {useParams} from "react-router-dom";
import SidebarStore from "../components/Sidebar/store/sidebar.store";
import RealObjectStore from "../components/RealObjects/store/realObject.store";
import {useEffect, useState} from "react";

const RealObjectPage = observer(() => {
    const tabItems = [
        {
            title: "Виджеты",
            content: <WidgetTemplate
                widgets={[
                    WidgetTemplateStore.widgets.TEMPERATURE,
                    WidgetTemplateStore.widgets.HUMIDITY,
                    WidgetTemplateStore.widgets.PRESSURE,
                ]}
            />,
            link: "widgets",
            getParam: true,
        },
        {
            title: "Графики",
            content: "Графики",
            link: "charts",
            getParam: true,
        },
    ]

    let {objectType, objectCode} = useParams()
    let [card, setCard] = useState(null)

    objectType = objectType.toUpperCase().replace(/-/g, "_")
    SidebarStore.selectedTabClass = RealObjectStore

    useEffect(() => {
        setCard(SidebarStore.selectedTabClass.findCard(objectType, objectCode))
    }, [SidebarStore.selectedTabClass.list])

    return (
        card && <Dashboard
            card={card}
            tabItems={tabItems}
            dashboardName={"Объект"}
            homeLink={"/object"}
        />
    )
})

export default RealObjectPage