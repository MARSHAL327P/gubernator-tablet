import {observer} from "mobx-react-lite";
import {ReactComponent as WindCircle} from "../../../assets/icons/WindCircle.svg";
import {ReactComponent as WindArrow} from "../../../assets/icons/WindArrow.svg";
import cc from "classcat";
import IndicationsStore from "../../Indications/store/indications.store";

const WindWidget = observer(({ data, indication }) => {
    let windArrowStyles = {
        height: "calc(100% + 20px)",
        transform: `rotate(${data.direction}deg)`
    }

    return (
        <>
            <div className={"justify-self-center relative"}>
                <WindCircle className={cc([indication.stroke])}/>
                <WindArrow style={windArrowStyles} className={"absolute top-[-10px] left-0 w-full"}/>
                <div className={"absolute top-0 left-0 w-full h-full text-center grid items-center"}>
                    <div className={"w-[100px] mx-auto"}>
                        <div className="font-bold text-4xl">
                            {data.value}
                        </div>
                        <div>
                            {indication.units}
                        </div>
                        <div className={cc([indication.text, "font-bold"])}>
                            {IndicationsStore.getWindDirectionName(data.direction)}
                        </div>
                    </div>

                </div>
            </div>
            <div className={"flex items-center justify-between"}>
                <div className={""}>
                    <div className={"text-gray-500 text-sm"}>
                        Сегодняшний пик
                    </div>
                    <div className={cc([indication.text, "text-xl font-bold"])}>
                        {data.todayMax}{indication.units}
                    </div>
                </div>

            </div>
        </>
    )
})

export default WindWidget