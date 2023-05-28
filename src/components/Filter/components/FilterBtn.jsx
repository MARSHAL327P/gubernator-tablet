import {observer} from "mobx-react-lite";
import FilterStore from "../store/filter.store";
import {Button, Tooltip} from "@material-tailwind/react";
import {action} from "mobx";
import {AdjustmentsVerticalIcon, XMarkIcon} from "@heroicons/react/24/solid";

const FilterBtn = observer(() => {
    const iconStyles = "fill-white w-7 h-7"

    return (
        <Tooltip
            content={FilterStore.isOpen ? "Закрыть фильтр" : FilterStore.filteredCards ? "Фильтр пляжей" : "Фильтр недоступен"}>

            <Button
                className={"flex items-center px-4 max-h-[48px]"}
                onClick={action(() => {
                    if (FilterStore.filteredCards !== null)
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