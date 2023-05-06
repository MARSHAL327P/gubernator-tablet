import { observer } from "mobx-react-lite";
import FilterStore from "../store/filterStore";
import { useEffect, useRef, useState } from "react";
import { Accordion, AccordionHeader, AccordionBody, Checkbox, Input, List, ListItem } from "@material-tailwind/react";
import FixedHeader from "../../FixedHeader/FixedHeader";
import { Button } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../../Utils";
import Ripple from "../../RedefinedTags/Ripple/Ripple";
import { Transition } from '@headlessui/react'

function findSelectedItem(inputName, item) {
    return FilterStore.filterInputs[inputName].selected.indexOf(item)
}

function setCheckedItems(item, inputName, inputParams) {
    let findItemIndex = findSelectedItem(inputName, item)

    if (findItemIndex === -1) {
        inputParams.selected.push(item)
    } else {
        inputParams.selected.splice(findItemIndex, 1)
    }

    FilterStore.filterInputs[inputName] = inputParams
}

function setSelectFromToItem(e, inputName){
    FilterStore.filterInputs[inputName].selected[e.target.name] = e.target.value
}

function inputValues(inputName, inputParams) {
    switch (inputParams.type) {
        case FilterStore.filterTypes.selectFromTo.type:
            let defaultParams = {
                min: inputParams.from,
                max: inputParams.to,
                step: 0.2,
                type: "number",
                variant: "standard",
                label: "",
                onInput: (e) => setSelectFromToItem(e, inputName)
            }

            return (
                <div className={"flex gap-5"}>
                    <Input
                        {...defaultParams}
                        value={inputParams.selected.from ?? ""}
                        name={"from"}
                        placeholder={"От " + inputParams.from}
                    />
                    <Input
                        {...defaultParams}
                        value={inputParams.selected.to ?? ""}
                        name={"to"}
                        placeholder={"До " + inputParams.to}
                    />
                </div>
            )
        default:
            return (
                <div className={"flex flex-col"}>
                    {inputParams.variants.map((item, i) => {
                        let id = inputName + "-" + i

                        return (
                            <div
                                key={id}
                                className={"overflow-hidden relative rounded-md hover:cursor-pointer hover:bg-gray-100 transition duration-150"}
                                onClick={setCheckedItems.bind(null, item, inputName, inputParams)}
                            >
                                <Checkbox
                                    readOnly
                                    id={id}
                                    className={"checked:bg-primary checked:border-primary checked:before:bg-primary"}
                                    label={item}
                                    name={inputName}
                                    checked={findSelectedItem(inputName, item) !== -1}
                                />
                                <Ripple color={"rgba(161,161,161,0.69)"} />
                            </div>

                        )
                    })}
                </div>
            )
    }
}

const Filter = observer(() => {
    let filterEl = useRef(null)
    let [elOffset, setElOffset] = useState(0)

    useEffect(() => {
        FilterStore.fillFilterInputs()
    }, [])

    return (
        <div ref={filterEl}
             className={"h-full bg-white transition absolute top-0 left-0" + (FilterStore.isOpen ? " translate-x-full" : "")}>
            <FixedHeader elOffset={elOffset} classes={"p-7 items-center justify-between h-[104px]"}>
                <div className={"text-title"}>Фильтр пляжей</div>
                <Transition
                    show={FilterStore.filterIsChanged}
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
                    {Object.keys(FilterStore.filterInputs).map((inputName) => {
                        let inputParams = FilterStore.filterInputs[inputName]

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
                                <ListItem className="p-0 active:bg-transparent bg-transparent" selected={inputParams.open}>
                                    <AccordionHeader
                                        onClick={() => {
                                            inputParams.open = !inputParams.open
                                        }}
                                        className={"border-b-0 p-3"}
                                    >
                                        <div className="flex gap-2">
                                            {inputParams.icon}
                                            {inputParams.name}
                                        </div>
                                    </AccordionHeader>
                                </ListItem>
                                <AccordionBody
                                    className={classNames(
                                        "p-0 mb-3",
                                        inputParams.type !== FilterStore.filterTypes.checkbox.type  ? "pl-3" : ""
                                    )}>
                                    {inputValues(inputName, inputParams)}
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