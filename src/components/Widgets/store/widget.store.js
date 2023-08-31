import { makeAutoObservable } from "mobx";
import { ReactComponent as Temperature } from "../../../assets/icons/Temperature.svg";
import { ReactComponent as Humidity } from "../../../assets/icons/Humidity.svg";
import { ReactComponent as Pressure } from "../../../assets/icons/Pressure.svg";
import TemperatureWidget from "../components/TemperatureWidget";
import HumidityWidget from "../components/HumidityWidget";
import PressureWidget from "../components/PressureWidget";

class WidgetStore {
    widgets = {
        TEMPERATURE: {
            id: 1,
            name: "Температура",
            icon: <Temperature className={"fill-warning"}/>,
            content: <TemperatureWidget color={{text: "text-warning"}}/>
        },
        HUMIDITY: {
            id: 2,
            name: "Влажность",
            icon: <Humidity className={"fill-info"}/>,
            content: <HumidityWidget color={{text: "text-info"}}/>
        },
        PRESSURE: {
            id: 3,
            name: "Давление",
            icon: <Pressure className={"fill-success"}/>,
            content: <PressureWidget color={{text: "text-success"}}/>
        },
    }
    comfort = {
        COMFORT: {
            value: "Комфортно",
            classes: "bg-success"
        },
        MEDIUM: {
            value: "Средняя комфортность",
            classes: "bg-warning"
        },
        BAD: {
            value: "Выше нормы",
            classes: "bg-danger"
        },
    }

    constructor() {
        makeAutoObservable(this);
    }
}

export default WidgetStore = new WidgetStore()