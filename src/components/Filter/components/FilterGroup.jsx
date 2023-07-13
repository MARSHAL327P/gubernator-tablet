import {observer} from "mobx-react-lite";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import {Accordion, AccordionBody, AccordionHeader, List, ListItem} from "@material-tailwind/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import cc from "classcat";
import FilterInputSection from "./FilterInputSection";
import {action} from "mobx";

const FilterGroup = observer(() => {
    let selectedFastFilter = SelectedClassInfoStore.currentClass.fastFilter?.selected

    return SelectedClassInfoStore.currentClass?.filterGroup ?
        (
            <List className={"p-0"}>
                {
                    Object.entries(SelectedClassInfoStore.filterInputs).map(([filterGroupName, filterGroup]) => {
                        if (selectedFastFilter.length > 0 && !selectedFastFilter.includes(filterGroupName))
                            return false

                        let Icon = filterGroup.icon

                        if (Object.keys(filterGroup.defaultFilterInputs).length <= 0)
                            return false

                        return (
                            <Accordion
                                key={filterGroupName}
                                open={filterGroup.filterOpen}
                                icon={
                                    <ChevronDownIcon
                                        strokeWidth={2.5}
                                        className={cc(["mx-auto h-5 w-5 transition-transform", {
                                            "rotate-180": filterGroup.filterOpen
                                        }])}
                                    />
                                }>
                                <ListItem
                                    className="p-0 active:bg-transparent bg-transparent"
                                    selected={filterGroup.filterOpen}>
                                    <AccordionHeader
                                        onClick={action(() => {
                                            filterGroup.filterOpen = !filterGroup.filterOpen
                                        })}
                                        className={"border-b-0 p-3 bg-gray-200 hover:bg-gray-300 rounded-xl"}
                                    >
                                        <div className={cc(["flex items-center gap-2"])}>
                                            <div
                                                className={cc(["flex items-center rounded-full p-2", filterGroup.bgColor])}>
                                                <Icon className={"w-4 h-4 fill-white"}/>
                                            </div>

                                            {filterGroup.name}
                                        </div>
                                    </AccordionHeader>
                                </ListItem>
                                <AccordionBody
                                    className={cc(
                                        {
                                            "p-0 my-3": true,
                                        }
                                    )}>
                                    <FilterInputSection
                                        filterInputs={filterGroup.defaultFilterInputs}
                                        filterGroupName={filterGroupName}
                                    />
                                </AccordionBody>
                            </Accordion>
                        )
                    })
                }
            </List>
        ) :
        <FilterInputSection/>
})

export default FilterGroup