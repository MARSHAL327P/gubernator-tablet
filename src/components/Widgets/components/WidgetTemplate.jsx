import {observer} from "mobx-react-lite";
import {ReactComponent as Chart} from "../../../assets/icons/Chart.svg";
import {ReactComponent as Share} from "../../../assets/icons/Share.svg";
import {Button, Tooltip} from "@material-tailwind/react";
import IndicationsStore from "../../Indications/store/indications.store";
import cc from "classcat";

const WidgetTemplate = observer((
    {
        data,
        indications = Object.values(IndicationsStore.indications),
        hasCharts = true
    }
) => {
    const buttons = [
        {
            name: "Поделиться",
            icon: Share
        },
    ]

    if( hasCharts )
        buttons.unshift({
            name: "Графики",
            icon: Chart
        })

    return (
        <div className={"flex gap-10 mx-auto w-[1640px] flex-wrap"}>
            {indications.map(indication => {
                let indicationValue = data[indication.indicationName]?.value || data[indication.indicationName]
                let Icon = indication.icon
                let Widget = indication.widget

                return indicationValue && Widget && (
                    <div
                        className="w-[380px] h-[380px] p-6 shadow-lg rounded-xl bg-white grid content-between"
                        key={indication.id}
                    >
                        <div className={"flex gap-2 justify-between"}>
                            <div className={"flex gap-2 items-center"}>
                                {indication.icon && <Icon className={cc([indication.color, "w-8 h-8"])}/>}
                                <span>{indication.name || indication.indicationName}</span>
                            </div>
                            {/*<div className={"flex gap-2"}>*/}
                            {/*    {buttons.map((btn, idx) => {*/}
                            {/*        let Icon = btn.icon*/}

                            {/*        return (*/}
                            {/*            <Tooltip key={idx} content={btn.name}>*/}
                            {/*                <Button className={"p-3 rounded-full w-[40px] h-[40px]"} size={"sm"}>*/}
                            {/*                    <Icon className={"fill-white"}/>*/}
                            {/*                </Button>*/}
                            {/*            </Tooltip>*/}
                            {/*        )*/}
                            {/*    })}*/}
                            {/*</div>*/}
                        </div>
                        <Widget data={data[indication.indicationName]} indication={indication}/>
                    </div>
                )
            })}
        </div>
    )
})

export default WidgetTemplate