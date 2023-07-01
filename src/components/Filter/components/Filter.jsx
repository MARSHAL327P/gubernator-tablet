import {observer} from "mobx-react-lite";
import FilterStore from "../store/filter.store";
import {useRef, useState} from "react";
import {Accordion, AccordionHeader, AccordionBody, List, ListItem} from "@material-tailwind/react";
import FixedHeader from "../../FixedHeader/FixedHeader";
import {Button} from "@material-tailwind/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {Transition} from '@headlessui/react'

import {FilterInputs} from "./FilterInputs";
import SidebarStore from "../../Sidebar/store/sidebar.store";
import cc from "classcat";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import FilterInputSection from "./FilterInputSection";
import {toJS} from "mobx";
import FilterGroup from "./FilterGroup";

function hasVariants(filterInput) {
    switch (filterInput.type) {
        case FilterStore.filterTypes.selectFromTo.type:
            if (filterInput.from === Infinity || filterInput.to === -Infinity)
                return false;
            break;
        default:
            if (filterInput.variants.length <= 0)
                return false;
    }

    return true
}

const Filter = observer(() => {
    let filterEl = useRef(null)
    let [elOffset, setElOffset] = useState(0)

    return (
        <div ref={filterEl}
             className={cc({
                 "h-full bg-white transition w-[450px]": true,
             })}
        >
            <FixedHeader elOffset={elOffset} classes={"p-7 items-center justify-between h-[104px]"}>
                <div className={"text-title"}>
                    {SelectedClassInfoStore.currentClass?.filterName}
                </div>

                <Transition
                    show={FilterStore.numChangedParams > 0}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <span className={"hover:cursor-pointer"} onClick={() => FilterStore.clearAllFilter()}>
                    <Button variant={"text"} color={"white"}>
                        Очистить
                    </Button>
                </span>
                </Transition>

            </FixedHeader>
            <div
                className={"overflow-auto p-7 pt-0 transition filter"}
                onScroll={(e) => {
                    setElOffset(e.currentTarget.scrollTop)
                }}
            >
                <FilterGroup/>
            </div>
        </div>
    )
})

export default Filter