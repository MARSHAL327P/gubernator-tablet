import {observer} from "mobx-react-lite";
import cc from "classcat";
import {Accordion, AccordionBody, AccordionHeader, List, ListItem, Tooltip, Typography} from "@material-tailwind/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {action} from "mobx";
import SkeletonCondition from "../../SkeletonCondition/components/SkeletonCondition";
import Skeleton from "react-loading-skeleton";
import WaterQualityStore from "../store/waterQuality.store";
import useWindowSize from "../../../hooks/useWindowSize";

const WaterQuality = observer(({card}) => {
    function indicationValueHtml(value, hasGray = true){
        return (
            <>
                {value} <span className={hasGray ? "text-gray-400 font-normal" : ""}>мг/дм<sup>3</sup></span>
            </>
        )
    }

    const [width] = useWindowSize()
    const valuePositionMediaQuery = 640

    if (card && !card.waterQuality)
        card.waterQuality = new WaterQualityStore(card.id)

    return (
        <div className={"w-[900px] lg:w-full mx-auto grid justify-items-center gap-8"}>
            <SkeletonCondition condition={!card?.waterQuality || card?.waterQuality.isLoading} skeleton={<Skeleton width={220} height={72}/>}>
                {() => (
                    <div
                        className={cc([card.waterQuality.totalRating.color, "text-2xl py-5 px-8 rounded-xl font-bold text-white w-fit"])}>
                        {card.waterQuality.totalRating.title}
                    </div>
                )}
            </SkeletonCondition>

            <div className={"grid gap-5 justify-items-center"}>
                <Typography variant={"h5"}>
                    Загрязняющие вещества в воде
                </Typography>
                <SkeletonCondition condition={!card?.waterQuality || card?.waterQuality.isLoading} skeleton={
                    <Skeleton count={8} inline={true} height={55} width={300} containerClassName={"grid grid-cols-2 sm:grid-cols-1 gap-4"}/>
                }>
                    {() => (
                        <List className={"p-0 grid grid-cols-2 lg:grid-cols-1 gap-4 text-base"}>
                            {Object.entries(card.waterQuality.indications).map(([indicationName, indication]) => {
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
                                                        <div className={"w-[240px]"}>
                                                            {indication.title} {width < valuePositionMediaQuery && <>({indicationValueHtml(indication.value, false)})</>}
                                                        </div>
                                                    </div>
                                                    {
                                                        width >= valuePositionMediaQuery && <div>{indicationValueHtml(indication.value)}</div>
                                                    }
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