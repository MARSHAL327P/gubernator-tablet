import { observer } from "mobx-react-lite";

const WidgetHumidity = observer(() => {
    const params = [
        {
            name: "Вчера было",
            value: "62%"
        },
    ]

    return (
        <>
            <div className="text-info text-center font-bold text-6xl mb-3">
                {"70%"}
            </div>
            <div className={"flex"}>
                {params.map((item, i) => {
                    return (
                        <div className={"px-2" + (params.length > 1 && i === 0 ? " border-r" : "")}>
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