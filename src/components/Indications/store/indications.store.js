import {makeAutoObservable} from "mobx";
import {ReactComponent as Water} from "../../../assets/icons/Water.svg";
import {ReactComponent as Temperature} from "../../../assets/icons/Temperature.svg";
import {ReactComponent as Wind} from "../../../assets/icons/Wind.svg";
import {ReactComponent as Humidity} from "../../../assets/icons/Humidity.svg";
import {ReactComponent as Pressure} from "../../../assets/icons/Pressure.svg";
import {ReactComponent as Wave} from "../../../assets/icons/Wave.svg";

class IndicationsStore {
    indicationTypes = {
        WATER_TEMP: "t_surf",
        AIR_TEMP: "temperature",
        WIND_SPEED: "windSpeed",
        HUMIDITY: "humidity",
        PRESSURE: "pressure",
        HONF: "Honf",
    }
    indications = {
        t_surf: {
            name: "Температура воды",
            color: "fill-primary",
            background: "bg-primary/20",
            icon: Water,
            units: "°",
        },
        temperature: {
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
        },
        humidity: {
            name: "Влажность",
            color: "fill-info",
            background: "bg-info/20",
            icon: Humidity,
            units: " %",
        },
        pressure: {
            name: "Давление",
            color: "fill-success",
            background: "bg-success/20",
            icon: Pressure,
            units: " мм.рт.ст",
        },
        Honf: {
            name: "Средняя высота 10% наибольших волн (м)",
            color: "fill-primary",
            background: "bg-primary/20",
            icon: Wave,
            units: " м",
        }
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default IndicationsStore = new IndicationsStore()