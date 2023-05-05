import { observer } from "mobx-react-lite";
import { ReactComponent as Chart } from "../../../assets/icons/Chart.svg";
import { ReactComponent as Share } from "../../../assets/icons/Share.svg";
import Button from "../../RedefinedTags/Button/Button";

const WidgetTemplate = observer(({widgets = []}) => {

    return (
        <div className={"flex gap-10"}>
            {widgets.map(widget => {
                return (
                    <div className="min-w-[380px] h-[380px] p-6 shadow-lg rounded-xl bg-white flex flex-col justify-between">
                        <div className={"flex justify-between"}>
                            <div className={"flex gap-2 items-center"}>
                                {widget.icon}
                                <span>{widget.name}</span>
                            </div>
                            <div className={"flex gap-2"}>
                                <Button icon={Chart} rounded={"full"} size={"sm"}></Button>
                                <Button icon={Share} rounded={"full"} size={"sm"}></Button>
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