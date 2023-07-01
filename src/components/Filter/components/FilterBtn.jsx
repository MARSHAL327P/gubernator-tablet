import {observer} from "mobx-react-lite";
import FilterStore from "../store/filter.store";
import {Button, Tooltip} from "@material-tailwind/react";
import {action} from "mobx";
import {AdjustmentsVerticalIcon, XMarkIcon} from "@heroicons/react/24/solid";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";

const FilterBtn = observer(() => {
    const iconStyles = "fill-white w-7 h-7"
    let tooltip = FilterStore.isOpen ? "Закрыть фильтр" : "Открыть фильтр"
    if( !SelectedClassInfoStore.filteredCards || SelectedClassInfoStore.currentClass?.isLoading )
        tooltip = "Фильтр недоступен"

    return (
        <Tooltip
            content={tooltip}>
            <Button
                className={"flex items-center px-4 max-h-[48px]"}
                onClick={action(() => {
                    if (SelectedClassInfoStore.filteredCards !== null && !SelectedClassInfoStore.currentClass.isLoading)
                        FilterStore.isOpen = !FilterStore.isOpen
                })}
            >
                {
                    FilterStore.isOpen ?
                        <XMarkIcon className={iconStyles}/> :
                        <AdjustmentsVerticalIcon className={iconStyles}/>
                }
            </Button>
        </Tooltip>
    )
})

export default FilterBtn