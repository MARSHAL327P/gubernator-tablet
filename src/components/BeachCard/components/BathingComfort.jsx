import { ReactComponent as Swimmer } from "../../../assets/icons/Swimmer.svg";
import BeachLocalStore from "../store/beachLocalStore";

export default function BathingComfort({ bathingComfort }){
    let classes = "flex justify-center items-center gap-3 w-full p-3"
    let textColor = "text-white"
    let bathingComfortObject = BeachLocalStore.bathingComfortType[bathingComfort]

    return bathingComfortObject && (
        <div className={classes + bathingComfortObject.classes}>
            { bathingComfortObject.showIcon ?? <Swimmer className={"fill-white"}/>}
            <span className={bathingComfortObject.textClasses ?? textColor }>{bathingComfortObject.text}</span>
        </div>
    )
}