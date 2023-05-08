import { observer } from "mobx-react-lite";

const WidgetTemperature = observer(({ color }) => {
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
            <div className={`text-${color} text-center font-bold text-6xl mb-3`}>
                {"18.5°"}
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