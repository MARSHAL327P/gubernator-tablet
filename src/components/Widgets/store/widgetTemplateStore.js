import { makeAutoObservable } from "mobx";
import { ReactComponent as Temperature } from "../../../assets/icons/Temperature.svg";
import { ReactComponent as Humidity } from "../../../assets/icons/Humidity.svg";
import WidgetTemperature from "../components/WidgetTemperature";
import WidgetHumidity from "../components/WidgetHumidity";

class WidgetTemplateStore{
    widgets = {
        TEMPERATURE: {
            name: "Температура",
            icon: <Temperature className={"fill-warning"}/>,
            content: <WidgetTemperature/>
        },
        HUMIDITY: {
            name: "Влажность",
            icon: <Humidity className={"fill-info"}/>,
            content: <WidgetHumidity/>
        },
    }

    constructor() {
        makeAutoObservable(this);
    }
}

export default WidgetTemplateStore = new WidgetTemplateStore()