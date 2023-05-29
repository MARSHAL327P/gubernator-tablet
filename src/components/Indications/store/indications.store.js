import {makeAutoObservable} from "mobx";
import {ReactComponent as Water} from "../../../assets/icons/Water.svg";
import {ReactComponent as Temperature} from "../../../assets/icons/Temperature.svg";
import {ReactComponent as Wind} from "../../../assets/icons/Wind.svg";

class IndicationsStore {
    indicationTypes = {
        WATER_TEMP: "waterTemp",
        AIR_TEMP: "airTemp",
        WIND_SPEED: "windSpeed",
    }
    indications = {
        waterTemp: {
            name: "Температура воды",
            color: "fill-primary",
            background: "bg-primary/20",
            icon: Water,
            units: "°",
        },
        airTemp: {
            name: "Температура воздуха",
            color: "fill-warning",
            background: "bg-warning/20",
            icon: Temperature,
            units: "°",
        },
        windSpeed: {
            name: "Скорость ветра",
            color: "fill-danger",
            background: "bg-danger/20",
            icon: Wind,
            units: " м/с",
        }
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default IndicationsStore = new IndicationsStore()