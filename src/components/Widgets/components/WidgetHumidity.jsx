import { observer } from "mobx-react-lite";
import cc from "classcat";

const WidgetHumidity = observer(({ color }) => {
    const params = [
        {
            name: "Вчера было",
            value: "62%"
        },
    ]

    return (
        <>
            <div className={cc([color.text, "text-center font-bold text-6xl mb-3"])}>
                {"70%"}
            </div>
            <div className={"flex"}>
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