import {ReactComponent as Swimmer} from "../../../assets/icons/Swimmer.svg";
import cc from "classcat";
import {Fragment} from "react";
import Indications from "../../Indications/components/Indications";
import BathingComfortStore from "../store/bathingComfort.store";

export default function BathingComfort({
                                           bathingComfort,
                                           isOpen,
                                           rounded = false,
                                           classes = "",
                                           showDescription = false,
                                           cardIndications = null
                                       }) {

    if (!bathingComfort[0])
        return null

    let bathingComfortObject = new BathingComfortStore(cardIndications)
    let colorClasses = bathingComfort.map((item) => {
        let bathingComfortType = bathingComfortObject.bathingComfortType[item]

        return bathingComfort.length > 1 ? bathingComfortType.gradient : bathingComfortType.classes
    })


    return (
        <>
            {
                !isOpen ?
                    <div className={cc([
                        "flex justify-center items-center w-full p-3 uppercase text-danger font-bold bg-gray-200 border border-gray-300",
                        {"rounded-xl shadow-lg": rounded},
                        classes,
                    ])}>
                        Пляж закрыт
                    </div> :
                    <div className={cc([
                        "flex justify-center items-center gap-3 w-full p-3",
                        colorClasses,
                        classes,
                        {"rounded-xl shadow-lg": rounded},
                        {"bg-gradient-to-r": bathingComfort.length > 1}
                    ])}>
                        {
                            bathingComfort.map((item) => {
                                let bathingComfortType = bathingComfortObject.bathingComfortType[item]
                                let Icon = bathingComfortType.icon ?? Swimmer

                                return (
                                    <Fragment key={item}>
                                        {bathingComfortType.showIcon ?? <Icon className={"fill-white"}/>}
                                        <div className={bathingComfortType.textClasses ?? "text-white"}>
                                            {bathingComfortType.text}
                                        </div>
                                    </Fragment>
                                )
                            })
                        }
                    </div>
            }
            {
                showDescription &&
                bathingComfortObject.bathingComfortIndications.map((item, idx) => {
                    return (
                        <div key={idx} className={"flex gap-2 items-center"}>
                            <Indications
                                data={cardIndications}
                                indications={[item.indication]}
                            />
                            <div>
                                {item.text}
                            </div>
                        </div>
                    )
                })

            }
        </>

    )
}