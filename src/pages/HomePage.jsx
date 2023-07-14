import Sidebar from "../components/Sidebar/components/Sidebar";
import Filter from "../components/Filter/components/Filter";
import {observer} from "mobx-react-lite";
import FilterStore from "../components/Filter/store/filter.store";
import cc from "classcat";
import {ReactComponent as Chevron} from "../assets/icons/Chevron.svg";
import {useState} from "react";
import Ripple from "../components/RedefinedTags/Ripple/Ripple";
import {Tooltip} from "@material-tailwind/react";

const HomePage = observer(({tabItems}) => {
    let [hideSidebar, setHideSidebar] = useState(false)
    let filterStyles = {
        transform: !FilterStore.isOpen ? "translateX(0)" : "translateX(calc(100% - 21px))",
    }

    return (
        <>
            <div className={cc(["flex drop-shadow-xl h-full transition absolute top-0 left-0 z-20", {
                "translate-x-0": !FilterStore.isOpen && !hideSidebar,
                "-translate-x-full": !FilterStore.isOpen && hideSidebar,
                "-translate-x-[200%]": FilterStore.isOpen && hideSidebar
            }])}>
                <Sidebar tabItems={tabItems}/>
                <div style={filterStyles} className={cc(["transition flex absolute h-full"])}>
                    <Filter/>
                    <Tooltip content={hideSidebar ? "Открыть боковую панель" : "Скрыть боковую панель"}>
                        <div
                            className={cc(["overflow-hidden rotate-0 relative left-5 top-7 bg-white hover:bg-gray-200 " +
                            "hover:cursor-pointer transition rounded-xl py-4 px-3 h-fit", {
                                "rotate-180": hideSidebar
                            }])}
                            onClick={() => setHideSidebar(hideSidebar => !hideSidebar)}
                        >
                            <Chevron/>
                            <Ripple color={"rgba(0,0,0,.6)"}/>
                        </div>
                    </Tooltip>
                </div>
            </div>
            {/*<AdminBtn/>*/}
        </>
    )
})

export default HomePage