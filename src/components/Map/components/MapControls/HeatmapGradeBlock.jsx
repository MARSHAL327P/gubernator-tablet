import {observer} from "mobx-react-lite";
import MapStore from "../../store/map.store";
import cc from "classcat";

const HeatmapGradeBlock = observer(() => {
    if (!MapStore.selectedAdditionalLayer?.gradeRange) return

    let indicationData = MapStore.selectedAdditionalLayer.indicationData
    let jetGradient = "#000080, #0000FF, #0054FF, #00ADFF, #19FFDE, #60FF97, #A7FF50, #EEFF09, #FFAE00, #FF6000, #FA0F00, #960000"

    return (
        <div className={cc([MapStore.blurBackgroundClasses, "!p-0 !relative !rounded-full w-fit"])}>
            <div className={"flex gap-3 items-center relative"}>
                <div className={"flex justify-between gap-3 text-white rounded-full py-1 px-5 min-w-[300px]"}
                     style={{
                         background: `linear-gradient(90deg, ${jetGradient})`
                     }}
                >
                    {MapStore.selectedAdditionalLayer.gradeRange.map((rangeValue, idx) =>
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
        </div>
    )

})

export default HeatmapGradeBlock