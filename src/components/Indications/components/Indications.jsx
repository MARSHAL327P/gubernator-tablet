import {observer} from "mobx-react-lite";
import {Tooltip} from "@material-tailwind/react";
import IndicationsStore from "../store/indications.store";
import cc from "classcat";

const Indications = observer(({data, indications = Object.keys(IndicationsStore.indications), fixedValue = false, classes = ""}) => {

    return (
        <div className={cc(["flex flex-wrap gap-2 items-center", classes])}>
            {
                indications.map((indication, idx) => {
                    let hasIndications = data[indication] !== undefined && data[indication] !== null
                    let indicationData = IndicationsStore.indications[indication]
                    let Icon = indicationData.icon

                    return (
                        hasIndications &&
                        <Tooltip key={idx} content={indicationData.name} placement={"bottom"}>
                            <div className={cc([
                                "flex items-center gap-2 whitespace-nowrap px-5 rounded-xl h-12",
                                indicationData.background
                            ])}>
                                <Icon className={indicationData.color}/>
                                <span>{fixedValue ? parseInt(data[indication]).toFixed(1) : data[indication]}{indicationData.units}</span>
                            </div>
                        </Tooltip>
                    )
                })
            }
        </div>
    )
})

export default Indications