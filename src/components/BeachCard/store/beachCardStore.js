import { makeAutoObservable } from "mobx";
import { ReactComponent as Warning } from "../../../assets/icons/Warning.svg";
import { ReactComponent as DANGER } from "../../../assets/icons/Danger.svg";

class BeachCardStore {
    bathingComfort = {
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

    beachProblems = {
        DANGER: <DANGER className={"stroke-danger w-[25px] h-[25px]"} />,
        WARNING: <Warning className={"fill-warning w-[25px] h-[25px]"}/>,
    }

    constructor(data) {
        makeAutoObservable(this);
    }
}

export default BeachCardStore = new BeachCardStore()