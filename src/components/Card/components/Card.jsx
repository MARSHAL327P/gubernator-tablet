import {observer} from "mobx-react-lite";
import Loading from "../../Loading/components/Loading";
import SidebarStore from "../../Sidebar/store/sidebar.store";

const Card = observer(({loadingText, data, component}) => {
    return (
        SidebarStore.selectedTabClass && SidebarStore.selectedTabClass.isLoading ?
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