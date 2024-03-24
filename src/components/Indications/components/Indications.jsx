import {observer} from "mobx-react-lite";
import {Tooltip} from "@material-tailwind/react";
import IndicationsStore from "../store/indications.store";
import cc from "classcat";
import {forwardRef, Fragment, useRef} from "react";


const Indications = observer(forwardRef((
    {
        data,
        indications = Object.values(IndicationsStore.indications),
        fixedValue = false,
        classes = "",
        noTooltip = false,
        oneLine = false,
        showPdk = false
    }, ref
) => {
    let TooltipComponent = noTooltip ? Fragment : Tooltip
    // let headerEl = useRef(null)
    let bodyEl = useRef(null)
    let cardIndications = Object.keys(data)
    let indicationNames = indications.map(indication => indication.indicationName)
    let hasNewIndications = Object.values(IndicationsStore.indications).filter(indication => !indicationNames.includes(indication.indicationName))
    let defaultBackgroundColor = "bg-gray-300"

    if( hasNewIndications.length === 0 )
        cardIndications.forEach(item => {
            if( !indicationNames.includes(item) )
                indications.push({
                    id: indications.length,
                    background: defaultBackgroundColor,
                    indicationName: item,
                    name: item
                })
        })

    return (
        <div className={cc([classes, {
            "overflow-hidden h-[50px] transition-[height]": oneLine
        }])}
             ref={ref}
             onMouseEnter={() => {
                 if (oneLine)
                     ref.current.style.height = bodyEl.current.offsetHeight + "px"
             }}
            // onMouseLeave={() => {
            //     if (oneLine)
            //         headerEl.current.style.height = "50px"
            // }}
        >
            <div
                ref={bodyEl}
                className={cc(["flex flex-wrap  gap-2 items-center"])}>
                {
                    indications.map((indication) => {
                        if (!indication || !data[indication.indicationName]) return false

                        let indicationValue = data[indication.indicationName].value ?? data[indication.indicationName]
                        let Icon = indication.icon
                        let tooltipProps = !noTooltip && {
                            content: indication.name || indication.indicationName,
                            placement: "bottom",
                        }
                        let defaultComponentProps = {
                            key: indication.id,
                            ...tooltipProps
                        }

                        if (indication.alias)
                            indicationValue = indication.alias[indicationValue]

                        return (
                            indicationValue !== undefined &&
                            <TooltipComponent {...defaultComponentProps}>
                                <div className={cc([
                                    "rounded-xl relative",
                                    indication.background || defaultBackgroundColor
                                ])}>
                                    {showPdk &&
                                        indicationValue > indication.pdk &&
                                        // <Tooltip className={"bg-danger"} content={"Превышение ПДК"}>
                                        //     <div className={"absolute top-0 left-0 w-full h-[4px] bg-danger"}></div>
                                        // </Tooltip>
                                        <Tooltip className={"bg-danger"} content={"Превышение ПДК"}>
                                            <div className={"absolute -top-1 -right-1 w-3 h-3 rounded-full bg-danger"}></div>
                                        </Tooltip>

                                    }
                                    <div className={"flex items-center gap-2 whitespace-nowrap px-5 sm:px-3  h-12 sm:h-11"}>
                                        {indication.icon && <Icon className={cc([indication.color || "fill-white", "sm:w-6 sm:h-6"])}/>}
                                        <span className={"sm:text-sm"}>
                                        {
                                            fixedValue && indication.type !== "string" ?
                                                indicationValue.toFixed(1) :
                                                indicationValue
                                        }{indication.units}
                                    </span>
                                    </div>

                                </div>
                            </TooltipComponent>
                        )
                    })
                }
            </div>
        </div>
    )
}))

export default Indications