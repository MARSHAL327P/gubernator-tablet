import {makeAutoObservable} from "mobx";
import {ReactComponent as Water} from "../../../assets/icons/Water.svg";
import {ReactComponent as Temperature} from "../../../assets/icons/Temperature.svg";
import {ReactComponent as Wind} from "../../../assets/icons/Wind.svg";
import {ReactComponent as Humidity} from "../../../assets/icons/Humidity.svg";
import {ReactComponent as Pressure} from "../../../assets/icons/Pressure.svg";
import {ReactComponent as Wave} from "../../../assets/icons/Wave.svg";
import {ReactComponent as Blob} from "../../../assets/icons/Blob.svg";
import {ReactComponent as AirQuality} from "../../../assets/icons/AirQuality.svg";
import {ReactComponent as Sun} from "../../../assets/icons/Sun.svg";
import WidgetTemperature from "../../Widgets/components/WidgetTemperature";
import WidgetHumidity from "../../Widgets/components/WidgetHumidity";
import WidgetPressure from "../../Widgets/components/WidgetPressure";
import WidgetSolarRadiation from "../../Widgets/components/WidgetSolarRadiation";
import parse from 'html-react-parser';

class IndicationsStore {
    windAngleNames = [
        "C",
        "ССВ",
        "СВ",
        "ВСВ",
        "В",
        "ВЮВ",
        "ЮВ",
        "ЮЮВ",
        "Ю",
        "ЮЮЗ",
        "ЮЗ",
        "ЗЮЗ",
        "З",
        "ЗСЗ",
        "СЗ",
        "ССЗ",
    ];
    defaultIndications = {
        t_surf: {
            name: "Температура воды",
            color: "fill-primary",
            background: "bg-primary/20",
            icon: Water,
            units: "°",
            unitsFull: "C°",
        },
        temperature: {
            name: "Температура воздуха",
            color: "fill-warning",
            background: "bg-warning/20",
            text: "text-warning",
            icon: Temperature,
            units: "°",
            unitsFull: "C°",
            widget: WidgetTemperature
        },
        wind: {
            name: "Ветер",
            color: "fill-danger",
            background: "bg-danger/20",
            icon: Wind,
            units: " м/с",
        },
        humidity: {
            name: "Влажность",
            color: "fill-info",
            background: "bg-info/20",
            text: "text-info",
            icon: Humidity,
            units: "%",
            widget: WidgetHumidity
        },
        pressure: {
            name: "Давление",
            color: "fill-success",
            background: "bg-success/20",
            text: "text-success",
            icon: Pressure,
            units: " мм.рт.ст",
            widget: WidgetPressure
        },
        Honf: {
            name: "Средняя высота 10% наибольших волн (м)",
            color: "fill-primary",
            background: "bg-primary/20",
            icon: Wave,
            units: " м",
        },
        turbidity: {
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
        },
        aqi: {
            name: "Качество воздуха",
            color: "fill-success",
            background: "bg-success/20",
            icon: AirQuality,
            units: "",
            unitsFull: "Баллов",
        },
        solarRadiation: {
            name: "Солнечная радиация",
            color: "fill-warning",
            background: "bg-warning/20",
            text: "text-warning",
            icon: Sun,
            units: parse(" Вт/м<sup>2</sup>"),
            widget: WidgetSolarRadiation
        }
    }

    get indications(){
        let indications = {}

        Object.entries(this.defaultIndications).forEach(([name, values], idx) => {
            indications[name] = {
                id: idx,
                indicationName: name,
                ...values
            }
        })

        return indications
    }

    getWindDirectionName(angle) {
        if (angle < 0) angle = 360 - (Math.abs(angle) % 360);
        else angle = angle % 360;

        let w = parseInt(angle / 22.5);
        return this.windAngleNames[w];
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default IndicationsStore = new IndicationsStore()