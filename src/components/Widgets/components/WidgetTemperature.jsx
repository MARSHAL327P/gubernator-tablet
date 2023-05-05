import { observer } from "mobx-react-lite";

const WidgetTemperature = observer(() => {
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
            <div className="text-warning text-center font-bold text-6xl mb-3">
                {"18.5°"}
            </div>
            <div className={"flex"}>
                {tempParams.map((item, i) => {
                    return (
                        <div className={"px-2" + (i === 0 ? " border-r" : "")}>
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