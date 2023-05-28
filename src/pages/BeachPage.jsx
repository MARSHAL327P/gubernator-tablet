import { observer } from "mobx-react-lite";
import Dashboard from "../components/Dashboard/components/Dashboard";
import WidgetTemplate from "../components/Widgets/components/WidgetTemplate";
import WidgetTemplateStore from "../components/Widgets/store/widget.store";

const BeachPage = observer(() => {
    const tabItems = [
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
    ]

    return (
        <Dashboard
            tabItems={tabItems}
            dashboardName={"Пляж"}
        />
    )
})

export default BeachPage