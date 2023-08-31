import {observer} from "mobx-react-lite";
import cc from "classcat";
import RealObjectStore from "../store/realObject.store";
import MapStore from "../../Map/store/map.store";
import UiStore from "../../../stores/ui.store";
import {Transition} from "@headlessui/react";

const RealObjectPlacemarker = observer(({data, realObject, indicationData, isOpen}) => {
    let mapIndication = data + indicationData.units
    let realObjectType = RealObjectStore.realObjectTypes[realObject.type]
    let Icon = realObjectType.icon

    return (
        <>
            <div
                className={cc(["relative shadow-lg rounded-xl " +
                "py-4 px-5 text-white inline-flex text-sm transition scale-marker", realObjectType.bgColor])}
            >
                {
                    data ?
                        <>
                            <div className={cc(["absolute -top-3 -left-3 p-2 rounded-full", realObjectType.bgColor])}>
                                <Icon className={"fill-white w-5 h-5"}/>
                            </div>
                            {mapIndication}
                        </> :
                        <Icon className={"fill-white w-5 h-5"}/>
                }

            </div>
            <Transition
                show={isOpen}
                {...UiStore.transitionOpacity}
            >
                <div className={cc([MapStore.markerTextClasses, "absolute top-[65px] left-0 z-30"])}>
                    {realObject.name}
                </div>
            </Transition>
        </>

    )
})

export default RealObjectPlacemarker