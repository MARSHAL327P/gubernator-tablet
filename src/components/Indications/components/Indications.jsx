import {observer} from "mobx-react-lite";
import {Tooltip} from "@material-tailwind/react";
import IndicationsStore from "../store/indications.store";
import cc from "classcat";
import {toJS} from "mobx";

const Indications = observer(({data, indications = Object.values(IndicationsStore.indications), fixedValue = false, classes = ""}) => {

    return (
        <div className={cc(["flex flex-wrap gap-2 items-center", classes])}>
            {
                indications.map((indication) => {
                    let hasIndications = data[indication.indicationName] !== undefined && data[indication.indicationName] !== null
                    let Icon = indication.icon

                    return (
                        hasIndications &&
                        <Tooltip key={indication.id} content={indication.name} placement={"bottom"}>
                            <div className={cc([
                                "flex items-center gap-2 whitespace-nowrap px-5 rounded-xl h-12",
                                indication.background
                            ])}>
                                <Icon className={indication.color}/>
                                <span>{fixedValue ?
                                    data[indication.indicationName].toFixed(1) :
                                    data[indication.indicationName]}{indication.units}</span>
                            </div>
                        </Tooltip>
                    )
                })
            }
        </div>
    )
})

export default Indications