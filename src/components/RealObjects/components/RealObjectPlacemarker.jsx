import {observer} from "mobx-react-lite";
import cc from "classcat";
import RealObjectStore from "../store/realObject.store";

const RealObjectPlacemarker = observer(({data, type}) => {
    let realObject = RealObjectStore.realObjectTypes[type]
    let Icon = realObject.icon

    return (
        <div className={cc(["relative shadow-lg rounded-xl left-[-28px] top-[-26px] font-bold " +
        "py-4 px-5 text-white inline-flex transition scale-marker", realObject.bgColor])}>
            <div className={cc(["absolute -top-3 -left-3 p-2 rounded-full", realObject.bgColor])}>
                <Icon className={"fill-white w-5 h-5"}/>
            </div>
            {data}
        </div>
    )
})

export default RealObjectPlacemarker