import { makeAutoObservable } from "mobx";
import WidgetTemplate from "../../Widgets/components/WidgetTemplate";
import WidgetTemplateStore from "../../Widgets/store/widgetTemplateStore";

class SidebarStore {
    searchQuery = ""
    tabItems = [
        {
            title: "Пляжи",
            content: "Информация",
        },
        {
            title: "Объекты",
            content: "Отзывы",
        },
        {
            title: "Архитектура",
            content: <WidgetTemplate
                widgets={[
                    WidgetTemplateStore.widgets.TEMPERATURE,
                    WidgetTemplateStore.widgets.HUMIDITY,
                    WidgetTemplateStore.widgets.PRESSURE,
                ]}
            />
        },
    ]

    constructor(data) {
        makeAutoObservable(this);
    }
}

export default SidebarStore = new SidebarStore()