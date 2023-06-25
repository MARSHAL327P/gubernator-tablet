import {ReactComponent as Swimmer} from "../../../assets/icons/Swimmer.svg";
import BeachLocalStore from "../store/beachLocal.store";
import cc from "classcat";
import {Fragment} from "react";

export default function BathingComfort({bathingComfort, classes = ""}) {
    if (!bathingComfort[0])
        return null

    let colorClasses = bathingComfort.map((item) => {
        let bathingComfortObject = BeachLocalStore.bathingComfortType[item]

        return bathingComfort.length > 1 ? bathingComfortObject.gradient : bathingComfortObject.classes
    })

    return (
        <div className={cc([
            "flex justify-center items-center gap-3 w-full p-3",
            colorClasses,
            classes,
            {"bg-gradient-to-r": bathingComfort.length > 1}
        ])}>
            {
                bathingComfort.map((item) => {
                    let bathingComfortObject = BeachLocalStore.bathingComfortType[item]
                    let Icon = bathingComfortObject.icon ?? Swimmer

                    return (
                        <Fragment key={item}>
                            {bathingComfortObject.showIcon ?? <Icon className={"fill-white"}/>}
                            <div className={bathingComfortObject.textClasses ?? "text-white"}>
                                {bathingComfortObject.text}
                            </div>
                        </Fragment>
                    )
                })
            }

        </div>
    )
}