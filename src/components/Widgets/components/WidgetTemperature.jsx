import {observer} from "mobx-react-lite";
import cc from "classcat";

const WidgetTemperature = observer(({data, indication}) => {
    const tempParams = [
        {
            name: "Вчера было",
            value: "16.2°"
        },
        {
            name: "Ощущается как",
            value: "17.8°"
        }
    ]

    return (
        <>
            <div className={cc([indication.text, "text-center font-bold text-6xl mb-3"])}>
                {data}{indication.units}
            </div>
            <div className={"flex"}>
                {tempParams.map((item, idx) => {
                    return (
                        <div key={idx} className={"px-2" + (idx === 0 ? " border-r" : "")}>
                            <div className={"text-gray-500"}>{item.name}</div>
                            <div className={"text-center"}>{item.value}</div>
                        </div>
                    )
                })}
            </div>
        </>
    )
})

export default WidgetTemperature