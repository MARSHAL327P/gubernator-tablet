import { action, makeAutoObservable } from "mobx";
import { ReactComponent as Warning } from "../../../assets/icons/Warning.svg";
import { ReactComponent as Danger } from "../../../assets/icons/Danger.svg";
import BeachCardStore from "./beachCardStore";
import FilterStore from "../../Filter/store/filterStore";

class BeachLocalStore {
    beachList = []
    isLoading = false
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
        DANGER: {
            name: "Серъёзные проблемы",
            icon: <Danger className={"stroke-danger w-[25px] h-[25px]"} />,
        },
        WARNING: {
            name: "Незначительные проблемы",
            icon: <Warning className={"fill-warning w-[25px] h-[25px]"}/>,
        },
    }

    findBeach(beachCode){
        return this.beachList && this.beachList.find((beach) => beach.code === beachCode)
    }

    constructor() {
        makeAutoObservable(this);

        this.isLoading = true
        BeachCardStore
            .get()
            .then(
                action(data => {
                    this.beachList = data ?? []
                    FilterStore.fillFilterInputs()
                })
            )
            .finally(action(() => {
                this.isLoading = false
            }));
    }
}

export default BeachLocalStore = new BeachLocalStore()