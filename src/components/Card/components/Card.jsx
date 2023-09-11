import {observer} from "mobx-react-lite";
import CardComponent from "./CardComponent";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import SkeletonCondition from "../../SkeletonCondition/components/SkeletonCondition";

const Card = observer(() => {
    if( !SelectedClassInfoStore.currentClass ) return

    let currentClass = SelectedClassInfoStore.currentClass

    return (
        <SkeletonCondition condition={currentClass.isLoading} skeleton={currentClass.skeleton}>
            {() => (
                SelectedClassInfoStore.filteredCards.length > 0 ?
                    <CardComponent/> :
                    <div className={"text-center font-bold text-2xl"}>Нет результатов</div>
            )}
        </SkeletonCondition>
    )
})

export default Card