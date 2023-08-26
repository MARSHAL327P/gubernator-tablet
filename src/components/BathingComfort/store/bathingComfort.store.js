import {makeAutoObservable} from "mobx";
import IndicationsStore from "../../Indications/store/indications.store";
import parse from "html-react-parser";
import { ReactComponent as Wave } from "../../../assets/icons/Wave.svg";
import { ReactComponent as Water } from "../../../assets/icons/Water.svg";

class BathingComfortStore{
    bathingComfortType = {
        GOOD: {
            text: "Комфортно",
            classes: "bg-success",
        },
        NO_BATHING: {
            text: "Купание запрещено",
            classes: "bg-danger",
        },
        COLD_WATER: {
            text: "Холодная вода",
            classes: "bg-primary",
            gradient: "from-primary",
            icon: Water
        },
        COOL_WATER: {
            text: "Прохладная вода",
            classes: "bg-info",
            gradient: "from-info",
            icon: Water
        },
        MEDIUM_WAVE: {
            text: "Средние волны",
            classes: "bg-[#007FA1]",
            gradient: "to-[#007FA1]",
            icon: Wave
        },
        HIGH_WAVE: {
            text: "Высокие волны",
            classes: "bg-[#001658]",
            gradient: "to-[#001658]",
            icon: Wave
        },
        BEACH_CLOSE: {
            text: "ПЛЯЖ ЗАКРЫТ",
            classes: "bg-white border-y border-gray-200",
            showIcon: false,
            textClasses: "text-danger font-bold"
        }
    }

    temperatureTextValues = [
        {
            lessThan: 17,
            text: "холодная"
        },
        {
            lessThan: 20,
            text: "прохладная"
        },
        {
            lessThan: 25,
            text: "тепловатая"
        },
        {
            lessThan: 27,
            text: "теплая"
        }
    ]
    cardIndications = null


    get temperatureText(){
        return this.temperatureTextValues.find((item) => item.lessThan > this.cardIndications.t_surf)
            .text
    }

    get bathingComfortIndications(){
        return [
            {
                indication: IndicationsStore.indications.Honf,
                text: parse(`Средняя высота 10% значительных волн <span class="font-bold">${this.cardIndications.Honf} м.</span>`)
            },
            {
                indication: IndicationsStore.indications.t_surf,
                text: parse(`Вода <span class="font-bold">${this.temperatureText}</span>`)
            },
            {
                indication: IndicationsStore.indications.turbidity,
                text: parse(`Мутность воды: <span class='font-bold'>${IndicationsStore.indications.turbidity.alias[this.cardIndications.turbidity]}</span>`)
            }
        ]
    }


    constructor(cardIndications) {
        makeAutoObservable(this)

        this.cardIndications = cardIndications
    }
}

export default BathingComfortStore