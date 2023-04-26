import { ReactComponent as Swimmer } from "../../../assets/icons/Swimmer.svg";
import BeachCardStore from "../store/beachCardStore";

export default function BathingComfort({ bathingComfort }){
    let classes = "flex justify-center items-center gap-3 w-full p-3"
    let textColor = "text-white"
    let bathingComfortObject = BeachCardStore.bathingComfort[bathingComfort]

    return (
        <div className={classes + bathingComfortObject.classes}>
            { bathingComfortObject.showIcon ?? <Swimmer className={"fill-white"}/>}
            <span className={bathingComfortObject.textClasses ?? textColor }>{bathingComfortObject.text}</span>
        </div>
    )
}