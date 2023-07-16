import {observer} from "mobx-react-lite";
import {ReactComponent as MarkerSmile} from '../../../../assets/icons/MarkerSmile.svg'
import {ReactComponent as MarkerNeutral} from '../../../../assets/icons/MarkerNeutral.svg'
import {ReactComponent as MarkerSad} from '../../../../assets/icons/MarkerSad.svg'
import cc from "classcat";

const BathingComfortGrade = observer(({classes}) => {
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
        <div className={"flex flex-col gap-2"}>
            {
                bathingComfortGrades.map((bathingComfort, idx) => {
                    let Icon = bathingComfort.icon

                    return (
                        <div key={idx} className={"flex gap-2 items-center text-sm"}>
                            <Icon className={cc([bathingComfort.color, "w-7 h-7"])}/>
                            {bathingComfort.title}
                        </div>
                    )
                })
            }
        </div>
    )
})

export default BathingComfortGrade