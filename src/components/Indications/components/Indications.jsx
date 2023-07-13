import {observer} from "mobx-react-lite";
import {Tooltip} from "@material-tailwind/react";
import IndicationsStore from "../store/indications.store";
import cc from "classcat";
import {Fragment, useRef} from "react";
import {toJS} from "mobx";


const Indications = observer((
    {
        data,
        indications = Object.values(IndicationsStore.indications),
        fixedValue = false,
        classes = "",
        noTooltip = false,
        oneLine = false
    }
) => {
    let TooltipComponent = noTooltip ? Fragment : Tooltip
    let headerEl = useRef(null)
    let bodyEl = useRef(null)
    let cardIndications = Object.keys(data)
    let indicationNames = indications.map(indication => indication.indicationName)

    cardIndications.forEach(item => {
        if( !indicationNames.includes(item) )
            indications.push({
                id: indications.length,
                background: "bg-gray-400",
                indicationName: item,
                name: item
            })
    })

    return (
        <div className={cc([classes, {
            "overflow-hidden h-[50px] transition-[height]": oneLine
        }])}
             ref={headerEl}
             onMouseEnter={() => {
                 if (oneLine)
                     headerEl.current.style.height = bodyEl.current.offsetHeight + "px"
             }}
             onMouseLeave={() => {
                 if (oneLine)
                     headerEl.current.style.height = "50px"
             }}
        >
            <div
                ref={bodyEl}
                className={cc(["flex flex-wrap  gap-2 items-center"])}>
                {
                    indications.map((indication) => {
                        if (!indication) return false

                        let indicationValue = data[indication.indicationName]?.value || data[indication.indicationName]
                        let Icon = indication.icon
                        let tooltipProps = !noTooltip && {
                            content: indication.name,
                            placement: "bottom",
                        }
                        let defaultComponentProps = {
                            key: indication.id,
                            ...tooltipProps
                        }

                        if (indication.alias)
                            indicationValue = indication.alias[indicationValue]

                        return (
                            indicationValue &&
                            <TooltipComponent {...defaultComponentProps}>
                                <div className={cc([
                                    "flex items-center gap-2 whitespace-nowrap px-5 rounded-xl h-12",
                                    indication.background
                                ])}>
                                    {indication.icon && <Icon className={indication.color}/>}
                                    <span>
                                        {
                                            fixedValue && indication.type !== "string" ?
                                                indicationValue.toFixed(1) :
                                                indicationValue
                                        }{indication.units}
                                    </span>
                                </div>
                            </TooltipComponent>
                        )
                    })
                }
            </div>
        </div>
    )
})

export default Indications