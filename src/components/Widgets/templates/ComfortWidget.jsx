import {observer} from "mobx-react-lite";
import cc from "classcat";
import {Tooltip} from "@material-tailwind/react";
import {useState} from "react";

const ComfortWidget = observer(({data, indication}) => {
    const borderColor = "border-gray-600"
    const [currentValue, setCurrentValue] = useState(null)

    const barItemSize = 259 / indication.values.length
    let [filledBarItems, setFilledBarItems] = useState(0)

    function calculateBarHeight() {
        if (!currentValue) return

        let [from, to] = [currentValue.value[0], currentValue.value[1]]
        let barItemDifferent = to - from
        let barLastItemHeight = (to - data) * barItemSize / barItemDifferent

        if (!from || !to)
            barLastItemHeight = 0

        return filledBarItems * barItemSize + barLastItemHeight
    }

    return (
        <>
            <div className={"h-full mx-auto"}>
                <div className={cc(["relative min-h-[260px] w-24 mx-auto mb-2 border " +
                "rounded-xl grid overflow-hidden bg-gradient-to-t", indication.gradientColor, borderColor])}>
                    {indication.values.map((indicationValue, i) => {
                        let [from, to] = [indicationValue.value[0], indicationValue.value[1]]
                        let tooltipRangesContent = `от ${from}${indication.units} до ${to}${indication.units}`

                        if (
                            !currentValue && ((data >= from && data <= to) ||
                                (from === undefined && data <= to) ||
                                (data >= from && to === undefined))
                        ) {
                            setCurrentValue(indicationValue)
                            setFilledBarItems(i)
                        }


                        if (from === undefined) {
                            tooltipRangesContent = `менее ${to}${indication.units}`
                            from = to // Делаем это, чтобы правильно рассчитывались комфортные значения
                        }

                        if (to === undefined) {
                            tooltipRangesContent = `более ${from}${indication.units}`
                            to = from // Делаем это, чтобы правильно рассчитывались комфортные значения
                        }

                        return (
                            <Tooltip
                                content={`${indicationValue.description} ${indicationValue.fullDescription ? `(${indicationValue.fullDescription})` : ""} (${tooltipRangesContent})`}
                                placement={"right"}
                                key={i}
                            >
                                <div className={cc(["z-10", borderColor, {
                                    "border-t": i > 0,
                                    "border-r-4": from >= indication.comfortValues[0] && to <= indication.comfortValues[1]
                                }])}></div>
                            </Tooltip>
                        )
                    })}
                    {/*<div className={cc(["absolute w-[18%] h-1 top-0 left-0", indication.background])}></div>*/}
                    <div className={"bg-white absolute top-0 left-0 w-full"}
                         style={{height: `${calculateBarHeight()}px`}}></div>
                </div>
                <div className={cc(["text-md text-center font-bold", indication.text])}>
                    {currentValue?.description} ({data.toFixed(2)}{indication.units})
                </div>
            </div>
        </>

    )
})

export default ComfortWidget