import {makeAutoObservable} from "mobx";
import ComfortWidget from "../../Widgets/templates/ComfortWidget";
import {ReactComponent as Temperature} from "../../../assets/icons/Temperature.svg";
import parse from "html-react-parser";

class ComfortIndexStore {
    indexes = {
        eet: {
            id: 100,
            comfortIndex: true,
            haveNegativeValues: true,
            indicationName: "Эквивалентно-эффективная температура",
            widget: ComfortWidget,
            gradientColor: "from-warning to-warning/10",
            color: "fill-warning",
            text: "text-warning",
            background: "bg-warning",
            icon: Temperature,
            units: "°",
            comfortValues: [
                12, 24
            ],
            values: [
                {
                    value: [undefined, -24],
                    description: "Угроза обморожения"
                },
                {
                    value: [-24, -18],
                    description: "Очень холодно"
                },
                {
                    value: [-18, -12],
                    description: "Холодно"
                },
                {
                    value: [-12, -6],
                    description: "Умеренно холодно"
                },
                {
                    value: [-6, 0],
                    description: "Очень прохладно"
                },
                {
                    value: [0, 6],
                    description: "Умеренно прохладно"
                },
                {
                    value: [6, 12],
                    description: "Прохладно"
                },
                {
                    value: [12, 18],
                    description: "Комфорт (умеренно тепло)"
                },
                {
                    value: [18, 24],
                    description: "Комфорт (тепло)"
                },
                {
                    value: [24, 30],
                    description: "Тепловая нагрузка умеренная"
                },
                {
                    value: [30, undefined],
                    description: "Тепловая нагрузка сильная"
                }
            ],
            usedIndications: ["temperature", "windSpeed", "humidity"],
            // temperature - температура воздуха, °С; windSpeed – скорость ветра, м/с; humidity – относительная влажность, %
            calculate: (indications) => (
                37 - (37 - indications["temperature"] /
                    (0.68 - 0.0014 * indications["humidity"] +
                        (1 / (1.76 + 1.4 * Math.pow(indications["windSpeed"], 0.75)))
                    )
                    - 0.29 * indications["temperature"] * (1 - (indications["humidity"] / 100)))
            ),
        },
        heatPerception: {
            id: 101,
            comfortIndex: true,
            indicationName: "Комфорт теплоощущений",
            widget: ComfortWidget,
            gradientColor: "from-danger to-danger/10",
            color: "fill-danger",
            text: "text-danger",
            background: "bg-danger",
            icon: Temperature,
            units: parse(" мкал см⁻² с⁻¹"),
            comfortValues: [
                10, 50
            ],
            values: [
                {
                    value: [90, undefined],
                    description: "Очень дискомфортно"
                },
                {
                    value: [71, 90],
                    description: "Дискомфорт"
                },
                {
                    value: [51, 70],
                    description: "Относительный дискомфорт"
                },
                {
                    value: [31, 50],
                    description: "Относительно комфортно"
                },
                {
                    value: [11, 30],
                    description: "Умеренно комфортно"
                },
                {
                    value: [undefined, 10],
                    description: "Комфортно"
                },
            ],
            usedIndications: ["temperature", "windSpeed", "pressure", "humidity"],
            // temperature - температура воздуха, °С; windSpeed – скорость ветра, м/с; humidity – относительная влажность, %
            calculate: (indications) => {
                return 30
                // epsi - упругость водяного пара, гПа
                let epsi = indications["humidity"] / 100 * 6.112 * Math.exp(17.62 * indications["temperature"] / (243.12 + indications["temperature"]))
                let Hc = (0.13 + Math.pow(indications["windSpeed"], 0.5)) * (36.6 - indications["temperature"])

                console.log(Hc + (0.085 + 0.0102 * Math.pow(indications["windSpeed"], 0.3)) * Math.pow((6.11 - epsi), 0.75))
                return Hc + (0.085 + 0.0102 * Math.pow(indications["windSpeed"], 0.3)) * Math.pow((6.11 - epsi), 0.75)
            }
        }
    }

    calculateIndex(data, indication) {
        let usedIndicationsValues = {}

        indication.usedIndications.forEach(item => {
            usedIndicationsValues[item] = data[item].value
        })

        return indication.calculate(usedIndicationsValues)
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default ComfortIndexStore = new ComfortIndexStore()