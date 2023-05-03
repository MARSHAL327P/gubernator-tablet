import { makeAutoObservable } from "mobx";
import { ReactComponent as Warning } from "../../../assets/icons/Warning.svg";
import { ReactComponent as Danger } from "../../../assets/icons/Danger.svg";
import { BeachCardStore } from "./beachCardStore";

class BeachLocalStore {
    beachList = []
    bathingComfortType = {
        GOOD: {
            text: "Комфортно",
            classes: " bg-success",
        },
        NO_BATHING: {
            text: "Купание запрещено",
            classes: " bg-danger",
        },
        BEACH_CLOSE: {
            text: "ПЛЯЖ ЗАКРЫТ",
            classes: " bg-white border-y border-gray-200",
            showIcon: false,
            textClasses: "text-danger font-bold"
        }
    }

    beachType = {
        CITY: "Городской",
        WILD: "Дикий",
    }

    beachProblemsType = {
        DANGER: <Danger className={"stroke-danger w-[25px] h-[25px]"} />,
        WARNING: <Warning className={"fill-warning w-[25px] h-[25px]"}/>,
    }

    constructor(data) {
        makeAutoObservable(this);

        this.beachList = BeachCardStore.get()
    }
}

export default BeachLocalStore = new BeachLocalStore()