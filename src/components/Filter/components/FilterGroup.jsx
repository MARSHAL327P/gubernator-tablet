import {observer} from "mobx-react-lite";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import {Accordion, AccordionBody, AccordionHeader, List, ListItem} from "@material-tailwind/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import cc from "classcat";
import FilterInputSection from "./FilterInputSection";
import {runInAction, action} from "mobx";

const FilterGroup = observer(() => {
    return SelectedClassInfoStore.currentClass?.filterGroup ?
        (
            <List className={"p-0"}>
                {
                    Object.entries(SelectedClassInfoStore.filterInputs).map(([filterSectionName, filterSection]) => {
                        let Icon = filterSection.icon

                        console.log(filterSection)
                        if (Object.keys(filterSection.defaultFilterInputs).length <= 0)
                            return false

                        return (
                            <Accordion
                                key={filterSectionName}
                                open={filterSection.filterOpen}
                                icon={
                                    <ChevronDownIcon
                                        strokeWidth={2.5}
                                        className={cc(["mx-auto h-5 w-5 transition-transform", {
                                            "rotate-180": filterSection.filterOpen
                                        }])}
                                    />
                                }>
                                <ListItem
                                    className="p-0 active:bg-transparent bg-transparent"
                                    selected={filterSection.filterOpen}>
                                    <AccordionHeader
                                        onClick={action(() => {
                                            filterSection.filterOpen = !filterSection.filterOpen
                                        })}
                                        className={"border-b-0 p-3 bg-gray-200 hover:bg-gray-300 rounded-xl"}
                                    >
                                        <div className={cc(["flex items-center gap-2"])}>
                                            <div
                                                className={cc(["flex items-center rounded-full p-2", filterSection.bgColor])}>
                                                <Icon className={"w-4 h-4"}/>
                                            </div>

                                            {filterSection.name}
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
                                        filterInputs={filterSection.defaultFilterInputs}
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