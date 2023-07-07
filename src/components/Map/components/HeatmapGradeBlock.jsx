import {observer} from "mobx-react-lite";
import MapStore from "../store/map.store";
import cc from "classcat";

const HeatmapGradeBlock = observer(() => {
    if (!MapStore.selectedAdditionalLayer?.gradeRange) return

    let gradientClass = []
    let gradientValues = Object.values(MapStore.selectedAdditionalLayer.options.gradient)

    gradientValues.forEach((item, idx) => {
        switch (idx) {
            case 0:
                gradientClass.push(`from-[${item}]`)
                break;
            case gradientValues.length - 1:
                gradientClass.push(`to-[${item}]`)
                break;
            default:
                gradientClass.push(`via-[${item}]`)
        }
    })

    return (
        <div className={cc([MapStore.blurBackgroundClasses])}>
            <div className="flex gap-4">
                <div className={"flex flex-col gap-1"}>
                    <div className={"flex justify-between font-bold"}>
                        {MapStore.selectedAdditionalLayer.gradeRange.map((rangeValue, idx) => <div
                            key={idx}>{rangeValue}</div>)}
                    </div>
                    <div className={cc(["h-2 w-[200px] rounded-full bg-gradient-to-r", ...gradientClass])}></div>
                </div>
                <div className={"font-bold"}>
                    °C
                </div>
            </div>
        </div>
    )

})

export default HeatmapGradeBlock