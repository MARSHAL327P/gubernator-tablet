import {observer} from "mobx-react-lite";
import {Accordion, AccordionBody, AccordionHeader, List, ListItem, Tooltip} from "@material-tailwind/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import cc from "classcat";
import {action} from "mobx";

const AQIValues = observer(({airQualityData}) => {
    return (
        <div>
            <List className={"p-0 grid grid-cols-2 sm:grid-cols-1 gap-4 text-base w-full"}>
                {Object.entries(airQualityData.indications).map(([indicationName, indication]) => {
                    return (
                        <Accordion
                            key={indicationName}
                            open={indication.open}
                            icon={
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={cc(["mx-auto h-5 w-5 transition-transform", {
                                        "rotate-180": indication.open
                                    }])}
                                />
                            }>
                            <ListItem className="p-0 active:bg-transparent bg-transparent"
                                      selected={indication.open}>
                                <AccordionHeader
                                    onClick={action(() => {
                                        indication.open = !indication.open
                                    })}
                                    className={"border border-gray-400 rounded-lg p-3"}
                                >
                                    <div className={"flex items-center justify-between w-full"}>
                                        <div className={"flex gap-3 items-center"}>
                                            <Tooltip content={indication.levelTooltip}>
                                                <div className={`w-3 h-3 rounded-full ${indication.color}`}></div>
                                            </Tooltip>
                                            <div dangerouslySetInnerHTML={{__html: indication.title}}></div>
                                        </div>

                                        <div>{indication.value} <span
                                            className={"text-gray-400 font-normal"}>µg/m³</span></div>
                                    </div>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody>
                                {indication.description}
                            </AccordionBody>
                        </Accordion>
                    )
                })}
            </List>
        </div>
    )
})

export default AQIValues