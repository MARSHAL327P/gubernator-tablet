import {observer} from "mobx-react-lite";
import FilterStore from "../store/filter.store";
import {useRef, useState} from "react";
import {Accordion, AccordionHeader, AccordionBody, List, ListItem} from "@material-tailwind/react";
import FixedHeader from "../../FixedHeader/FixedHeader";
import {Button} from "@material-tailwind/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {classNames} from "../../../Utils";
import {Transition} from '@headlessui/react'
import {ReactComponent as Star} from "../../../assets/icons/Star.svg";
import {FilterInputs} from "./FilterInputs";
import BeachLocalStore from "../../BeachCard/store/beachLocal.store";
import SidebarStore from "../../Sidebar/store/sidebar.store";
import cc from "classcat";
import {toJS} from "mobx";

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

const Filter = observer(({filterInputs}) => {
    let filterEl = useRef(null)
    let [elOffset, setElOffset] = useState(0)
    const icons = {
        rating: <Star className={"fill-warning mt-[2px]"}/>
    }

    return (
        <div ref={filterEl}
             className={cc({
                 "h-full bg-white transition absolute top-0 left-0": true,
                 "active": FilterStore.isOpen,
             })}
            style={{
                transform: `translateX(})`
            }}
        >
            <FixedHeader elOffset={elOffset} classes={"p-7 items-center justify-between h-[104px]"}>
                <div className={"text-title"}>
                    {SidebarStore.selectedTabClass && SidebarStore.selectedTabClass.filterName}
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
                    <span className={"hover:cursor-pointer"} onClick={() => FilterStore.clearFilter()}>
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
                <List className={"p-0"}>
                    {FilterStore.filterInputs && Object.keys(FilterStore.filterInputs).map((inputName) => {
                        let inputParams = FilterStore.filterInputs[inputName]

                        if (!hasVariants(inputParams)) return false

                        return (
                            <Accordion
                                key={inputName}
                                open={inputParams.open}
                                icon={
                                    <ChevronDownIcon
                                        strokeWidth={2.5}
                                        className={`mx-auto h-5 w-5 transition-transform ${inputParams.open ? "rotate-180" : ""}`}
                                    />
                                }>
                                <ListItem className="p-0 active:bg-transparent bg-transparent"
                                          selected={inputParams.open}>
                                    <AccordionHeader
                                        onClick={() => {
                                            inputParams.open = !inputParams.open
                                        }}
                                        className={"border-b-0 p-3"}
                                    >
                                        <div className="flex gap-2">
                                            {icons[inputName]}
                                            {inputParams.name}
                                        </div>
                                    </AccordionHeader>
                                </ListItem>
                                <AccordionBody
                                    className={cc(
                                        {
                                            "p-0 mb-3": true,
                                            "pl-3": inputParams.type !== FilterStore.filterTypes.checkbox.type
                                        }
                                    )}>
                                    <FilterInputs
                                        inputName={inputName}
                                        inputParams={inputParams}
                                    />
                                </AccordionBody>
                            </Accordion>
                        )
                    })}
                </List>
            </div>
        </div>
    )
})

export default Filter