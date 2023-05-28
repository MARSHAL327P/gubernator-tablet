import {observer} from "mobx-react-lite";
import BeachLocalStore from "../../BeachCard/store/beachLocal.store";
import Loading from "../../Loading/components/Loading";

const Card = observer(({loadingText, data, component}) => {
    return (
        BeachLocalStore.isLoading ?
            <Loading text={loadingText}/> :
            data.length > 0 ?
                data.map((card) => {
                    let Component = component

                    return (
                        <div key={card.id}
                             className={"bg-white rounded-xl shadow-lg border-solid border border-gray-200"}
                        >
                            <Component card={card}/>
                        </div>

                    )
                }) :
                <div className={"text-center font-bold text-2xl"}>Нет результатов</div>
    )
})

export default Card