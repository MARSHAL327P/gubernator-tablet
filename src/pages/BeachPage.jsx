import { observer } from "mobx-react-lite";
import Dashboard from "../components/Dashboard/components/Dashboard";
import WidgetTemplate from "../components/Widgets/components/WidgetTemplate";
import WidgetTemplateStore from "../components/Widgets/store/widgetTemplateStore";

const BeachPage = observer(() => {
    const tabItems = [
        {
            title: "Информация",
            content: "Информация",
        },
        {
            title: "Отзывы",
            content: "Отзывы",
        },
        {
            title: "Виджеты",
            content: <WidgetTemplate
                widgets={[
                    WidgetTemplateStore.widgets.TEMPERATURE,
                    WidgetTemplateStore.widgets.HUMIDITY,
                    WidgetTemplateStore.widgets.PRESSURE,
                ]}
            />
        },
    ]

    return (
        <Dashboard
            tabItems={tabItems}
            dashboardName={"Пляж"}
        />
    )
})

export default BeachPage