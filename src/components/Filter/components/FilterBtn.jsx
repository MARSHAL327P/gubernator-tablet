import {observer} from "mobx-react-lite";
import FilterStore from "../store/filter.store";
import {Button, Tooltip} from "@material-tailwind/react";
import {action} from "mobx";
import {AdjustmentsVerticalIcon, XMarkIcon} from "@heroicons/react/24/solid";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import useWindowSize from "../../../hooks/useWindowSize";
import {Fragment} from "react";
import SidebarStore from "../../Sidebar/store/sidebar.store";

const FilterBtn = observer(() => {
    const iconStyles = "fill-white w-7 h-7"
    let [width] = useWindowSize()
    let tooltip = FilterStore.isOpen ? "Закрыть фильтр" : "Открыть фильтр"
    if (!SelectedClassInfoStore.filteredCards || SelectedClassInfoStore.currentClass?.isLoading)
        tooltip = "Фильтр недоступен"
    let Component = width <= 1024 ? Fragment : Tooltip
    let componentProps = width <= 1024 ? {} : {
        content: tooltip
    }

    return (
        <Component {...componentProps}>
            <Button
                className={"flex items-center px-4 max-h-[48px]"}
                onClick={action(() => {
                    if (SelectedClassInfoStore.filteredCards !== null && !SelectedClassInfoStore.currentClass.isLoading) {
                        if (width <= 1024 && SidebarStore.mobileHideCards)
                            SidebarStore.mobileHideCards = true

                        FilterStore.isOpen = !FilterStore.isOpen
                    }

                })}
            >
                {
                    FilterStore.isOpen ?
                        <XMarkIcon className={iconStyles}/> :
                        <AdjustmentsVerticalIcon className={iconStyles}/>
                }
            </Button>
        </Component>
    )
})

export default FilterBtn