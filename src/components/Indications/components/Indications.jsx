import {observer} from "mobx-react-lite";
import {Tooltip} from "@material-tailwind/react";
import IndicationsStore from "../store/indications.store";
import cc from "classcat";
import {Fragment, useRef} from "react";


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

    return (
        <div className={cc([classes, {
            "overflow-hidden h-[50px] transition-[height]": oneLine
        }])}
             ref={headerEl}
             onMouseEnter={() => {
                 headerEl.current.style.height = bodyEl.current.offsetHeight + "px"
             }}
             onMouseLeave={() => {
                 headerEl.current.style.height = "50px"
             }}
        >
            <div
                ref={bodyEl}
                className={cc(["flex flex-wrap  gap-2 items-center"])}>
                {
                    indications.map((indication) => {
                        let hasIndications = data[indication.indicationName] !== undefined && data[indication.indicationName] !== null
                        let Icon = indication.icon
                        let tooltipProps = !noTooltip && {
                            content: indication.name,
                            placement: "bottom",
                        }
                        let defaultProps = {
                            key: indication.id,
                            ...tooltipProps
                        }

                        return (
                            hasIndications &&
                            <TooltipComponent {...defaultProps}>
                                <div className={cc([
                                    "flex items-center gap-2 whitespace-nowrap px-5 rounded-xl h-12",
                                    indication.background
                                ])}>
                                    <Icon className={indication.color}/>
                                    <span>{fixedValue ?
                                        data[indication.indicationName].toFixed(1) :
                                        data[indication.indicationName]}{indication.units}</span>
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