import {observer} from "mobx-react-lite";
import Loading from "../../Loading/components/Loading";
import CardComponent from "./CardComponent";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";

const Card = observer(() => {
    return (
        SelectedClassInfoStore.currentClass?.isLoading ?
            <Loading text={SelectedClassInfoStore.currentClass.loadingText}/> :
            SelectedClassInfoStore.filteredCards.length > 0 ?
                <CardComponent/> :
                <div className={"text-center font-bold text-2xl"}>Нет результатов</div>
    )
})

export default Card