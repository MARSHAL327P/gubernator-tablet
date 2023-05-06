import { observer } from "mobx-react-lite";
import { ReactComponent as Chart } from "../../../assets/icons/Chart.svg";
import { ReactComponent as Share } from "../../../assets/icons/Share.svg";
// import Button from "../../RedefinedTags/Button/Button";
import { Button } from "@material-tailwind/react";

const WidgetTemplate = observer(({ widgets = [] }) => {
    const buttons = [Chart, Share]

    return (
        <div className={"flex gap-10"}>
            {widgets.map(widget => {
                return (
                    <div
                        className="min-w-[380px] h-[380px] p-6 shadow-lg rounded-xl bg-white flex flex-col justify-between">
                        <div className={"flex justify-between"}>
                            <div className={"flex gap-2 items-center"}>
                                {widget.icon}
                                <span>{widget.name}</span>
                            </div>
                            <div className={"flex gap-2"}>
                                {buttons.map(Item => {
                                    return (
                                        <Button className={"p-3 rounded-full w-[40px] h-[40px]"} size={"sm"}>
                                            <Item className={"fill-white"}/>
                                        </Button>
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