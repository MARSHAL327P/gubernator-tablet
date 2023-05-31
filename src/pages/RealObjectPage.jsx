import { observer } from "mobx-react-lite";
import Dashboard from "../components/Dashboard/components/Dashboard";
import WidgetTemplate from "../components/Widgets/components/WidgetTemplate";
import WidgetTemplateStore from "../components/Widgets/store/widget.store";
import {useParams} from "react-router-dom";
import SidebarStore from "../components/Sidebar/store/sidebar.store";

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
    objectType = objectType.toUpperCase().replace(/-/g, "_")
    let card = SidebarStore.selectedTabClass.findCard(objectType, objectCode)

    return (
        <Dashboard
            card={card}
            tabItems={tabItems}
            dashboardName={"Объект"}
        />
    )
})

export default RealObjectPage