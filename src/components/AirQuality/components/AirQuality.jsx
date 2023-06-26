import {observer} from "mobx-react-lite";
import AirQualityIndicator from "../../AirQualityIndicator/AirQualityIndicator";
import {Accordion, AccordionBody, AccordionHeader, List, ListItem, Tooltip} from "@material-tailwind/react";
import {action} from "mobx";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import cc from "classcat";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";

const AirQuality = observer(({ airQualityData = SelectedClassInfoStore.currentClass.card.airQuality }) => {
    return (
        <div className={"flex w-[1300px] mx-auto gap-10"}>
            <div className={"flex flex-col gap-14"}>
                <div className={"flex gap-7 h-fit items-center"}>
                    <AirQualityIndicator value={airQualityData.totalRating}/>
                    <div className={"flex flex-col gap-2"}>
                        <div className={"text-4xl font-bold"}>
                            {airQualityData.currentRatingLevel.title}
                        </div>
                        {airQualityData.currentRatingLevel.description}
                    </div>
                </div>
                <div>
                    <div className={"text-2xl font-bold mb-4"}>
                        Загрязняющие вещества в воздухе
                    </div>

                    <div>
                        <List className={"p-0 grid grid-cols-2 gap-4 text-base w-[700px]"}>
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
                </div>
            </div>

            <div>
                <div className={"text-2xl font-bold"}>
                    Подробнее о значениях AQI
                </div>
                <div className={"w-[350px]"}>
                    {
                        airQualityData.ratingLevels.map((ratingLevel, i) => {
                            let prevLevel = 0

                            if (i !== 0) {
                                prevLevel = airQualityData.ratingLevels[i - 1].level + 1
                            }

                            return (
                                <Accordion
                                    key={ratingLevel.level}
                                    open={ratingLevel.open}
                                    icon={
                                        <ChevronDownIcon
                                            strokeWidth={2.5}
                                            className={cc(["mx-auto h-5 w-5 transition-transform", {
                                                "rotate-180": ratingLevel.open
                                            }])}
                                        />
                                    }>
                                    <AccordionHeader
                                        className={""}
                                        onClick={action(() => {
                                            ratingLevel.open = !ratingLevel.open
                                        })}
                                    >
                                        <div className={"flex gap-3 items-center"}>
                                            <div className={`w-3 h-3 rounded-full ${ratingLevel.color}`}></div>
                                            {ratingLevel.title} ({prevLevel} - {ratingLevel.level})
                                        </div>

                                    </AccordionHeader>
                                    <AccordionBody>
                                        {ratingLevel.description}
                                    </AccordionBody>
                                </Accordion>
                            )
                        })
                    }
                </div>


            </div>
        </div>
    )
})

export default AirQuality