import {observer} from "mobx-react-lite";
import cc from "classcat";
import RealObjectStore from "../store/realObject.store";
import MapStore from "../../Map/store/map.store";

const RealObjectPlacemarker = observer(({data, realObject}) => {
    let realObjectType = RealObjectStore.realObjectTypes[realObject.type]
    let Icon = realObjectType.icon

    return (
        <div className={"hover-marker"}>
            <div className={cc(["relative shadow-lg rounded-xl left-[-28px] top-[-26px] font-bold " +
            "py-4 px-5 text-white inline-flex transition scale-marker", realObjectType.bgColor])}>
                <div className={cc(["absolute -top-3 -left-3 p-2 rounded-full", realObjectType.bgColor])}>
                    <Icon className={"fill-white w-5 h-5"}/>
                </div>
                {data}
            </div>
            <div className={cc([MapStore.markerTextClasses, "hover-marker__body left-[-35px] top-[28px]"])}>
                {realObject.name}
            </div>
        </div>

    )
})

export default RealObjectPlacemarker