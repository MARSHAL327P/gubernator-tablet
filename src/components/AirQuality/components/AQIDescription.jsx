import {observer} from "mobx-react-lite";
import {Accordion, AccordionBody, AccordionHeader, List, ListItem, Tooltip} from "@material-tailwind/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import cc from "classcat";
import {action} from "mobx";

const AQIDescription = observer(({airQualityData}) => {
    return airQualityData.ratingLevels.map((ratingLevel, i) => {
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
})

export default AQIDescription