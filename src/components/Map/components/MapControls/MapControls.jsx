import {observer} from "mobx-react-lite";
import AdditionalLayerBtns from "./AdditionalLayerBtns";
import BathingComfortGradeBlock from "./BathingComfortGradeBlock";
import HeatmapGradeBlock from "./HeatmapGradeBlock";
import {Fragment} from "react";
import cc from "classcat";
import DashboardStore from "../../../Dashboard/store/dashboard.store";
import SidebarStore from "../../../Sidebar/store/sidebar.store";

const MapControls = observer((
    {
        components = [
            <BathingComfortGradeBlock/>,
            <HeatmapGradeBlock/>,
            <AdditionalLayerBtns/>
        ],
        classes = ""
    }
) => {
    return (
        <div className={cc([classes, "absolute bottom-8 right-5 lg:right-0 grid lg:flex " +
        "lg:justify-between lg:w-full gap-5 lg:gap-2 justify-items-end z-10 lg:pl-1 lg:pr-3", {
            "lg:bottom-[210px]": !DashboardStore.isDashboard(),
        }])}>
            {
                components.map((component, idx) => <Fragment key={idx}>{component}</Fragment>)
            }
        </div>
    )
})

export default MapControls