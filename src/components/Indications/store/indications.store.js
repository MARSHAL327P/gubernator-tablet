import {makeAutoObservable} from "mobx";
import {ReactComponent as Water} from "../../../assets/icons/Water.svg";
import {ReactComponent as Temperature} from "../../../assets/icons/Temperature.svg";
import {ReactComponent as Wind} from "../../../assets/icons/Wind.svg";
import {ReactComponent as Humidity} from "../../../assets/icons/Humidity.svg";
import {ReactComponent as Pressure} from "../../../assets/icons/Pressure.svg";
import {ReactComponent as Wave} from "../../../assets/icons/Wave.svg";
import {ReactComponent as Blob} from "../../../assets/icons/Blob.svg";

class IndicationsStore {
    indications = {
        t_surf: {
            id: 1,
            indicationName: "t_surf",
            name: "Температура воды",
            color: "fill-primary",
            background: "bg-primary/20",
            icon: Water,
            units: "°",
        },
        temperature: {
            id: 2,
            indicationName: "temperature",
            name: "Температура воздуха",
            color: "fill-warning",
            background: "bg-warning/20",
            icon: Temperature,
            units: "°",
        },
        windSpeed: {
            id: 3,
            indicationName: "windSpeed",
            name: "Скорость ветра",
            color: "fill-danger",
            background: "bg-danger/20",
            icon: Wind,
            units: " м/с",
        },
        humidity: {
            id: 4,
            indicationName: "humidity",
            name: "Влажность",
            color: "fill-info",
            background: "bg-info/20",
            icon: Humidity,
            units: " %",
        },
        pressure: {
            id: 5,
            indicationName: "pressure",
            name: "Давление",
            color: "fill-success",
            background: "bg-success/20",
            icon: Pressure,
            units: " мм.рт.ст",
        },
        Honf: {
            id: 6,
            indicationName: "Honf",
            name: "Средняя высота 10% наибольших волн (м)",
            color: "fill-primary",
            background: "bg-primary/20",
            icon: Wave,
            units: " м",
        },
        turbidity: {
            id: 7,
            indicationName: "turbidity",
            name: "Мутность",
            color: "fill-success",
            background: "bg-success/20",
            icon: Blob,
            units: "",
            type: "string",
            alias: {
                clear: "Чисто",
                mudity: "Мутно",
            }
        }
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default IndicationsStore = new IndicationsStore()