import {observer} from "mobx-react-lite";
import SelectedClassInfoStore from "../../../../stores/selectedClassInfo.store";
import BeachLocalStore from "../../../BeachCard/store/beachLocal.store";
import cc from "classcat";
import MapStore from "../../store/map.store";
import {Typography} from "@material-tailwind/react";
import BathingComfortGrade from "./BathingComfortGrade";

const BathingComfortGradeBlock = observer(({classes}) => {
    return (
        SelectedClassInfoStore.currentClass === BeachLocalStore &&
        !MapStore.selectedAdditionalLayer &&
        <div className={cc([MapStore.blurBackgroundClasses, classes, "py-4 px-5 lg:hidden"])}>
            <Typography as={"div"} variant={"h6"} className={"mb-4"}>
                Комфортность купания
            </Typography>
            <BathingComfortGrade/>
        </div>
    )
})

export default BathingComfortGradeBlock