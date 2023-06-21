import { ReactComponent as Swimmer } from "../../../assets/icons/Swimmer.svg";
import BeachLocalStore from "../store/beachLocal.store";
import cc from "classcat";

export default function BathingComfort({ bathingComfort }){
    let bathingComfortObject = BeachLocalStore.bathingComfortType[bathingComfort]

    return bathingComfortObject && (
        <div className={cc(["flex justify-center items-center gap-3 w-full p-3", bathingComfortObject.classes])}>
            { bathingComfortObject.showIcon ?? <Swimmer className={"fill-white"}/>}
            <span className={bathingComfortObject.textClasses ?? "text-white" }>{bathingComfortObject.text}</span>
        </div>
    )
}