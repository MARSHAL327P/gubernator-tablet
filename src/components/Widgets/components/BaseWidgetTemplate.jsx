import {observer} from "mobx-react-lite";
import cc from "classcat";

const BaseWidgetTemplate = observer(({data, indication, params}) => {
    return (
        <>
            <div>
                <div className={cc([indication.text, "text-center font-bold text-6xl mb-3"])}>
                    {data}{indication.units}
                </div>
                <div className={"flex justify-center"}>
                    {params.map((item, idx) => {
                        return (
                            <div key={idx} className={cc(["px-2 text-center", {
                                "border-r": params.length > 1 && idx === 0
                            }])}>
                                <div className={"text-gray-500"}>{item.name}</div>
                                <div className={"text-center"}>{item.value}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div></div>
        </>

    )
})

export default BaseWidgetTemplate