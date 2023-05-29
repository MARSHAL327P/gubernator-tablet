import {observer} from "mobx-react-lite";
import {Tooltip} from "@material-tailwind/react";
import IndicationsStore from "../store/indications.store";
import cc from "classcat";

const Indications = observer(({data, indications}) => {

    return (
        <div className={"flex gap-2 items-center justify-around"}>
            {
                indications.map((indication, idx) => {
                    let indicationData = IndicationsStore.indications[indication]
                    let Icon = indicationData.icon

                    return (
                        data[indication] &&
                        <Tooltip key={idx} content={indicationData.name} placement={"bottom"}>
                            <div className={cc([
                                "flex items-center gap-2 whitespace-nowrap px-5 rounded-xl h-12",
                                indicationData.background
                            ])}>
                                <Icon className={indicationData.color}/>
                                <span>{data[indication]}{indicationData.units}</span>
                            </div>
                        </Tooltip>
                    )
                })
            }
        </div>
    )
})

export default Indications