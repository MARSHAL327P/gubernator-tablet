import {observer} from "mobx-react-lite";
import AdditionalLayerBtns from "./AdditionalLayerBtns";
import BathingComfortGradeBlock from "./BathingComfortGradeBlock";
import HeatmapGradeBlock from "./HeatmapGradeBlock";
import {Fragment} from "react";
import cc from "classcat";
import DashboardStore from "../../../Dashboard/store/dashboard.store";
import FastFilter from "../../../Filter/components/FastFilter";
import useWindowSize from "../../../../hooks/useWindowSize";

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
    let [width] = useWindowSize()

    return (
        <div className={cc(["absolute bottom-8 right-5 lg:right-0 grid lg:flex lg:items-center " +
        "lg:justify-between lg:w-full gap-5 lg:gap-2 justify-items-end z-10 lg:px-3", classes, {
            "lg:bottom-[165px]": !DashboardStore.isDashboard(),
        }])}>
            {
                width <= 1024 && <FastFilter classes={"gap-3"} itemClasses={"bg-white"}/>
            }
            {
                components.map((component, idx) => <Fragment key={idx}>{component}</Fragment>)
            }
        </div>
    )
})

export default MapControls