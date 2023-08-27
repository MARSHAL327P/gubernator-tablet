import {observer} from "mobx-react-lite";
import cc from "classcat";
import {Accordion, AccordionBody, AccordionHeader, List, ListItem, Tooltip, Typography} from "@material-tailwind/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {action} from "mobx";
import SkeletonCondition from "../../SkeletonCondition/components/SkeletonCondition";
import Skeleton from "react-loading-skeleton";

const WaterQuality = observer(({waterQualityData}) => {
    return (
        <div className={"w-[900px] lg:w-full mx-auto grid justify-items-center gap-8"}>
            <SkeletonCondition condition={!waterQualityData} skeleton={<Skeleton width={220} height={72}/>}>
                {() => (
                    <div
                        className={cc([waterQualityData.totalRating.color, "text-2xl py-5 px-8 rounded-xl font-bold text-white w-fit"])}>
                        {waterQualityData.totalRating.title}
                    </div>
                )}
            </SkeletonCondition>

            <div className={"grid gap-5 justify-items-center"}>
                <Typography variant={"h5"}>
                    Загрязняющие вещества в воде
                </Typography>
                <SkeletonCondition condition={!waterQualityData} skeleton={
                    <Skeleton count={8} inline={true} height={55} width={300} containerClassName={"grid grid-cols-2 sm:grid-cols-1 gap-4"}/>
                }>
                    {() => (
                        <List className={"p-0 grid grid-cols-2 lg:grid-cols-1 gap-4 text-base"}>
                            {Object.entries(waterQualityData.indications).map(([indicationName, indication]) => {
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
                                                <div className={"flex items-center justify-between w-full text-base"}>
                                                    <div className={"flex gap-3 items-center"}>
                                                        <Tooltip content={indication.levelTooltip}>
                                                            <div className={`w-3 h-3 rounded-full ${indication.color}`}></div>
                                                        </Tooltip>
                                                        <div className={"w-[240px]"}
                                                             dangerouslySetInnerHTML={{__html: indication.title}}></div>
                                                    </div>

                                                    <div>{indication.value} <span
                                                        className={"text-gray-400 font-normal"}>мг/дм<sup>3</sup></span></div>
                                                </div>
                                            </AccordionHeader>
                                        </ListItem>
                                        <AccordionBody>
                                            {typeof indication.description === "function" ? indication.description() : indication.description}
                                        </AccordionBody>
                                    </Accordion>
                                )
                            })}
                        </List>
                    )}
                </SkeletonCondition>

            </div>
        </div>
    )
})

export default WaterQuality