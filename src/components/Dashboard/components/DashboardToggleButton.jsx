import {observer} from "mobx-react-lite";
import {Button} from "@material-tailwind/react";
import DashboardStore from "../store/dashboard.store";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import cc from "classcat";
import MapControls from "../../Map/components/MapControls/MapControls";

const DashboardToggleButton = observer(() => {
    return (
        <div className={"absolute -top-20 right-0 w-full"}>
            <Button
                color={"white"}
                className={"relative shadow-lg bottom-5 mx-auto z-20 px-4 rounded-xl w-fit"}
                onClick={DashboardStore.toggleOpen.bind(DashboardStore)}
            >
                <ChevronDownIcon
                    strokeWidth={2.5}
                    className={cc(["h-5 w-5 transition-transform", {
                        "rotate-180": !DashboardStore.isOpen
                    }])}
                />
                {DashboardStore.isOpen ? "Скрыть" : "Раскрыть"}
            </Button>
            <MapControls/>
        </div>
    )
})

export default DashboardToggleButton