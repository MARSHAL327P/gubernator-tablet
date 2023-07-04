import {observer} from "mobx-react-lite";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import BeachLocalStore from "../../BeachCard/store/beachLocal.store";
import {ReactComponent as MarkerCircleIcon} from '../../../assets/icons/MarkerCircle.svg'
import cc from "classcat";

const BathingComfortGradeBlock = observer(({classes}) => {
    const bathingComfortGrades = [
        {
            title: "Комфортно",
            color: "fill-success"
        },
        {
            title: "Не рекомендуется",
            color: "fill-warning"
        },
        {
            title: "Запрещено",
            color: "fill-danger"
        }
    ]

    return (
        SelectedClassInfoStore.currentClass === BeachLocalStore &&
        <div className={cc(["absolute bottom-24 z-10 right-5 bg-white/50 backdrop-blur p-6 shadow-lg rounded-xl border-2 border-white w-72", classes])}>
            <div className={"text-xl font-bold mb-4"}>
                Комфортность купания
            </div>
            <div className={"flex flex-col gap-2"}>
                {
                    bathingComfortGrades.map((bathingComfort, idx) => {
                        return (
                            <div key={idx} className={"flex gap-2 items-center"}>
                                <MarkerCircleIcon className={cc([bathingComfort.color, "w-8 h-8"])}/>
                                {bathingComfort.title}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
})

export default BathingComfortGradeBlock