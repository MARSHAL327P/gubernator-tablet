import { observer } from "mobx-react-lite";
import { ReactComponent as Chart } from "../../../assets/icons/Chart.svg";
import { ReactComponent as Share } from "../../../assets/icons/Share.svg";
// import Button from "../../RedefinedTags/Button/Button";
import { Button, Tooltip } from "@material-tailwind/react";

const WidgetTemplate = observer(({ widgets = [], hasCharts = true }) => {
    const buttons = [
         {
            name: "Графики",
            icon: Chart
        },
        {
            name: "Поделиться",
            icon: Share
        },
    ]

    return (
        <div className={"flex gap-10"}>
            {widgets.map(widget => {
                return (
                    <div
                        className="min-w-[380px] h-[380px] p-6 shadow-lg rounded-xl bg-white flex flex-col justify-between"
                        key={widget.id}
                    >
                        <div className={"flex justify-between"}>
                            <div className={"flex gap-2 items-center"}>
                                {widget.icon}
                                <span>{widget.name}</span>
                            </div>
                            <div className={"flex gap-2"}>
                                {buttons.map((btn, idx) => {
                                    let Icon = btn.icon

                                    return (
                                        <Tooltip key={idx} content={btn.name}>
                                            <Button className={"p-3 rounded-full w-[40px] h-[40px]"} size={"sm"}>
                                                <Icon className={"fill-white"}/>
                                            </Button>
                                        </Tooltip>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={"self-center"}>
                            {widget.content}
                        </div>
                        <div></div>
                    </div>
                )
            })}
        </div>
    )
})

export default WidgetTemplate