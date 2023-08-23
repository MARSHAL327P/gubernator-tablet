import {observer} from "mobx-react-lite";
import {QuestionMarkCircleIcon} from "@heroicons/react/24/solid";
import {Button, Popover, PopoverContent, PopoverHandler} from "@material-tailwind/react";
import BathingComfortGrade from "./BathingComfortGrade";
import cc from "classcat";
import MapStore from "../../store/map.store";
import SelectedClassInfoStore from "../../../../stores/selectedClassInfo.store";
import BeachLocalStore from "../../../BeachCard/store/beachLocal.store";

const BathingComfortModal = observer(() => {
    return (
        SelectedClassInfoStore.currentClass === BeachLocalStore && <Popover>
            <PopoverHandler>
                <Button color={"white"} className={"hidden md:flex p-3 gap-1 relative left-2 mb-2"}>
                    <QuestionMarkCircleIcon className={"w-5 h-5"}/>
                    Комфортность купания
                </Button>
            </PopoverHandler>
            <PopoverContent className={cc([MapStore.blurBackgroundClasses, "ml-2"])}>
                <BathingComfortGrade/>
            </PopoverContent>
        </Popover>
    )
})

export default BathingComfortModal