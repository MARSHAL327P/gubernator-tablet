import {observer} from "mobx-react-lite";
import MapStore from "../store/map.store";
import cc from "classcat";

const HeatmapGradeBlock = observer(() => {
    if (!MapStore.selectedAdditionalLayer?.gradeRange) return

    let gradientValues = Object.values(MapStore.selectedAdditionalLayer.options.gradient)

    return (
        <div className={cc([MapStore.blurBackgroundClasses, "py-4 !relative w-fit"])}>
            <div className="flex gap-4">
                <div className={"flex flex-col gap-1"}>
                    <div className={"flex justify-between font-bold gap-3"}>
                        {MapStore.selectedAdditionalLayer.gradeRange.map((rangeValue, idx) => <div
                            key={idx}>{rangeValue}</div>)}
                    </div>
                    <div
                        className={cc(["h-2 min-w-[200px] rounded-full"])}
                        style={{
                            background: `linear-gradient(90deg, ${gradientValues.join(", ")})`
                        }}
                    >
                    </div>
                </div>
                {
                    MapStore.selectedAdditionalLayer.indicationData.unitsFull &&
                    <div className={"font-bold"}>
                        {MapStore.selectedAdditionalLayer.indicationData.unitsFull}
                    </div>
                }
            </div>
        </div>
    )

})

export default HeatmapGradeBlock