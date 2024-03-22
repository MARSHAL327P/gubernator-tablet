import {makeAutoObservable} from "mobx";
import {ReactComponent as Water} from "../../../assets/icons/Water.svg";
import {ReactComponent as Temperature} from "../../../assets/icons/Temperature.svg";
import {ReactComponent as Wind} from "../../../assets/icons/Wind.svg";
import {ReactComponent as Humidity} from "../../../assets/icons/Humidity.svg";
import {ReactComponent as Pressure} from "../../../assets/icons/Pressure.svg";
import {ReactComponent as Wave} from "../../../assets/icons/Wave.svg";
import {ReactComponent as Wave10Percent} from "../../../assets/icons/Wave10Percent.svg";
import {ReactComponent as Blob} from "../../../assets/icons/Blob.svg";
import {ReactComponent as AirQuality} from "../../../assets/icons/AirQuality.svg";
import {ReactComponent as Sun} from "../../../assets/icons/Sun.svg";
import {ReactComponent as Excitement} from "../../../assets/icons/Excitement.svg";
import TemperatureWidget from "../../Widgets/components/TemperatureWidget";
import HumidityWidget from "../../Widgets/components/HumidityWidget";
import PressureWidget from "../../Widgets/components/PressureWidget";
import SolarRadiationWidget from "../../Widgets/components/SolarRadiationWidget";
import WindWidget from "../../Widgets/components/WindWidget";
import TempSurfWidget from "../../Widgets/components/TempSurfWidget";
import HonfWidget from "../../Widgets/components/HonfWidget";
import DefaultWidget from "../../Widgets/templates/DefaultWidget";
import parse from 'html-react-parser';

class IndicationsStore {
    windAngleNames = [
        "Cеверный",
        "Северо-Восточный",
        "Восточный",
        "Юго-Восточный",
        "Южный",
        "Юго-Западный",
        "Западный",
        "Северо-Западный",
    ];
    defaultIndications = {
        t_surf: {
            name: "Температура воды",
            color: "fill-primary",
            background: "bg-primary/20",
            text: "text-primary",
            icon: Water,
            units: "°",
            unitsFull: "C°",
            widget: TempSurfWidget,
            nclName: "SST",
        },
        temperature: {
            name: "Температура воздуха",
            color: "fill-warning",
            background: "bg-warning/20",
            text: "text-warning",
            hexColor: "#FCC33F",
            icon: Temperature,
            units: "°",
            unitsFull: "C°",
            widget: TemperatureWidget,
            nclName: "T2",
            showOnChart: true,
        },
        wind: {
            name: "Ветер",
            color: "fill-danger",
            background: "bg-danger/20",
            text: "text-danger",
            stroke: "stroke-danger",
            icon: Wind,
            units: " м/с",
            widget: WindWidget,
            nclName: "WIND"
        },
        humidity: {
            name: "Влажность",
            color: "fill-info",
            background: "bg-info/20",
            text: "text-info",
            icon: Humidity,
            units: "%",
            widget: HumidityWidget,
            chartDomain: [0, 100],
            showOnChart: true,
        },
        pressure: {
            name: "Давление",
            color: "fill-success",
            background: "bg-success/20",
            text: "text-success",
            icon: Pressure,
            units: " мм.рт.ст",
            widget: PressureWidget,
            nclName: "PSFC",
            showOnChart: true,
        },
        Honf: {
            oldName: "honf",
            name: "Средняя высота 10% наибольших волн (м)",
            color: "fill-primary",
            background: "bg-primary/20",
            text: "text-primary",
            icon: Wave10Percent,
            units: " м",
            widget: HonfWidget,
        },
        Hsignf: {
            oldName: "honf",
            name: "Высота волны",
            color: "fill-primary",
            background: "bg-primary/20",
            text: "text-primary",
            icon: Wave,
            units: " м",
            widget: HonfWidget,
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
            widget: SolarRadiationWidget
        },
        excitement: {
            name: "Волнение моря",
            color: "fill-info",
            background: "bg-info/20",
            icon: Excitement,
            units: "",
            unitsFull: "Волна (м)",
        },
        fe: {
            oldName: "fe",
            name: "Железо",
            units: parse(" мг/дм<sup>3</sup>"),
            widget: DefaultWidget
        },
        hg: {
            name: "Ртуть",
            widget: DefaultWidget
        },
        petroleumHydrocarbons: {
            name: "Нефтяные углеводороды",
            widget: DefaultWidget
        },
        cu: {
            name: "Медь",
            widget: DefaultWidget
        },
        so2: {
            name: "SO2",
            widget: DefaultWidget,
            showOnChart: true,
        },
        no2: {
            name: "NO2",
            widget: DefaultWidget,
            showOnChart: true,
            pdk: 200,
        },
        o3: {
            name: "O3 (Озон)",
            widget: DefaultWidget,
            showOnChart: true,
            pdk: 160,
        },
        co: {
            name: "CO",
            widget: DefaultWidget,
            showOnChart: true,
            pdk: 5000,
        },
        co2: {
            name: "CO2",
            widget: DefaultWidget,
            showOnChart: true,
            pdk: 5000,
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

        let w = parseInt(angle / 45);
        return this.windAngleNames[w];
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default IndicationsStore = new IndicationsStore()