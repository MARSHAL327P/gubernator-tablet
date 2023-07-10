import {observer} from "mobx-react-lite";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import BeachLocalStore from "../../BeachCard/store/beachLocal.store";
import {ReactComponent as MarkerSmile} from '../../../assets/icons/MarkerSmile.svg'
import {ReactComponent as MarkerNeutral} from '../../../assets/icons/MarkerNeutral.svg'
import {ReactComponent as MarkerSad} from '../../../assets/icons/MarkerSad.svg'
import cc from "classcat";
import MapStore from "../store/map.store";

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
        !MapStore.selectedAdditionalLayer &&
        <div className={cc([MapStore.blurBackgroundClasses, classes])}>
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