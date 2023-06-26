import {observer} from "mobx-react-lite";
import cc from "classcat";
import {Accordion, AccordionBody, AccordionHeader} from "@material-tailwind/react";
import Ripple from "../../RedefinedTags/Ripple/Ripple";
import {useState} from "react";
import {ReactComponent as Chevron} from "../../../assets/icons/Chevron.svg";
import BeachCardProps from "./BeachCardProps";

const Comfort = observer(({cardProps}) => {
    let [comfortOpen, setComfortOpen] = useState(false)

    return (
        <Accordion
            className="bg-gray-200 rounded-b-xl overflow-hidden"
            open={comfortOpen}
            icon={
                <Chevron className={cc({
                    "transition": true,
                    "-rotate-90": !comfortOpen,
                    "rotate-90": comfortOpen
                })}/>
            }>
            <AccordionHeader
                className={"text-sm text-black border-0 px-6 py-3 font-medium justify-center"}
                onClick={() => setComfortOpen(comfortOpen = !comfortOpen)}
            >
                Удобства
                <Ripple color={"rgba(0, 0, 0, .2)"}/>
            </AccordionHeader>
            <AccordionBody className={"px-6 py-3 flex gap-1"}>
                <BeachCardProps cardProps={cardProps} />
            </AccordionBody>
        </Accordion>
    )
})

export default Comfort