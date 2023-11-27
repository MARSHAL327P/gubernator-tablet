import {observer} from "mobx-react-lite";
import MapStore from "../../Map/store/map.store";
import cc from "classcat";
import HeatmapStore from "../store/heatmap.store";

const HeatmapGradeBlock = observer(() => {
    if (!HeatmapStore.selectedAdditionalLayer?.gradeRange) return

    let indicationData = HeatmapStore.selectedAdditionalLayer.indicationData
    let jetGradient = "#000080, #0000FF, #0054FF, #00ADFF, #19FFDE, #60FF97, #A7FF50, #EEFF09, #FFAE00, #FF6000, #FA0F00, #960000"

    return (
        <div className={cc([
            MapStore.blurBackgroundClasses,
            "!p-0 relative !rounded-full w-fit flex gap-3 items-center lg:absolute lg:bottom-16 lg:right-3"
        ])}>
            <div className={"flex justify-between gap-4 text-white text-sm rounded-full py-1 px-4 min-w-[300px]"}
                 style={{
                     background: `linear-gradient(90deg, ${jetGradient})`
                 }}
            >
                {HeatmapStore.selectedAdditionalLayer.gradeRange.map((rangeValue, idx) =>
                    <div style={{
                        textShadow: "0px 0px 7px rgba(0, 0, 0, 1)"
                    }} className={""} key={idx}>
                        {rangeValue}
                    </div>
                )}

            </div>
            <div>
                {
                    indicationData.units &&
                    <div className={"font-bold mr-3"}>
                        {indicationData.unitsFull || indicationData.units}
                    </div>
                }
            </div>
        </div>
    )

})

export default HeatmapGradeBlock