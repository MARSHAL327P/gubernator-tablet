import {observer} from "mobx-react-lite";
import SelectedClassInfoStore from "../../../../stores/selectedClassInfo.store";
import BeachLocalStore from "../../../BeachCard/store/beachLocal.store";
import {ReactComponent as MarkerSmile} from '../../../../assets/icons/MarkerSmile.svg'
import {ReactComponent as MarkerNeutral} from '../../../../assets/icons/MarkerNeutral.svg'
import {ReactComponent as MarkerSad} from '../../../../assets/icons/MarkerSad.svg'
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