import {observer} from "mobx-react-lite";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import BeachLocalStore from "../../BeachCard/store/beachLocal.store";
// import {ReactComponent as MarkerCircleIcon} from '../../../assets/icons/MarkerCircle.svg'
import {ReactComponent as MarkerSmile} from '../../../assets/icons/MarkerSmile.svg'
import {ReactComponent as MarkerNeutral} from '../../../assets/icons/MarkerNeutral.svg'
import {ReactComponent as MarkerSad} from '../../../assets/icons/MarkerSad.svg'
import cc from "classcat";

const BathingComfortGradeBlock = observer(({classes}) => {
    const bathingComfortGrades = [
        {
            title: "Комфортно",
            color: "fill-success",
            icon: MarkerSmile,
        },
        {
            title: "Средняя комфортность",
            color: "fill-warning",
            icon: MarkerNeutral,
        },
        {
            title: "Запрещено",
            color: "fill-danger",
            icon: MarkerSad,
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
                        let Icon = bathingComfort.icon

                        return (
                            <div key={idx} className={"flex gap-2 items-center"}>
                                <Icon className={cc([bathingComfort.color, "w-8 h-8"])}/>
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