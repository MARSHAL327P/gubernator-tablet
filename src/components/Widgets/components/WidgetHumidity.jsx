import { observer } from "mobx-react-lite";
import cc from "classcat";

const WidgetHumidity = observer(({ data, indication }) => {
    const params = [
        {
            name: "Вчера было",
            value: "62%"
        },
    ]

    return (
        <>
            <div className={cc([indication.text, "text-center font-bold text-6xl mb-3"])}>
                {data}{indication.units}
            </div>
            <div className={"flex justify-center"}>
                {params.map((item, idx) => {
                    return (
                        <div key={idx} className={"px-2" + (params.length > 1 && idx === 0 ? " border-r" : "")}>
                            <div className={"text-gray-500"}>{item.name}</div>
                            <div className={"text-center"}>{item.value}</div>
                        </div>
                    )
                })}
            </div>
        </>
    )
})

export default WidgetHumidity