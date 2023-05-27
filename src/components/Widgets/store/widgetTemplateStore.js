import { makeAutoObservable } from "mobx";
import { ReactComponent as Temperature } from "../../../assets/icons/Temperature.svg";
import { ReactComponent as Humidity } from "../../../assets/icons/Humidity.svg";
import { ReactComponent as Pressure } from "../../../assets/icons/Pressure.svg";
import WidgetTemperature from "../components/WidgetTemperature";
import WidgetHumidity from "../components/WidgetHumidity";
import WidgetPressure from "../components/WidgetPressure";

class WidgetTemplateStore{
    widgets = {
        TEMPERATURE: {
            id: 1,
            name: "Температура",
            icon: <Temperature className={"fill-warning"}/>,
            content: <WidgetTemperature color={{text: "text-warning"}}/>
        },
        HUMIDITY: {
            id: 2,
            name: "Влажность",
            icon: <Humidity className={"fill-info"}/>,
            content: <WidgetHumidity color={{text: "text-info"}}/>
        },
        PRESSURE: {
            id: 3,
            name: "Давление",
            icon: <Pressure className={"fill-success"}/>,
            content: <WidgetPressure color={{text: "text-success"}}/>
        },
    }

    constructor() {
        makeAutoObservable(this);
    }
}

export default WidgetTemplateStore = new WidgetTemplateStore()