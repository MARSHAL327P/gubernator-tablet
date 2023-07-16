import {observer} from "mobx-react-lite";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import FilterStore from "../../Filter/store/filter.store";
import SidebarStore from "../../Sidebar/store/sidebar.store";

const CardComponent = observer(() => {
    return (
        <>
            {
                (
                    FilterStore.numChangedParams > 0 ||
                    SidebarStore.searchQuery.trim() !== "" ||
                    SelectedClassInfoStore.currentClass.fastFilter?.selected.length > 0
                ) &&
                <div className={"text-center font-bold mb-5"}>
                    Показано {SelectedClassInfoStore.filteredCards.length} из {SelectedClassInfoStore.currentClass.list.length}
                </div>
            }
            <div className={"grid grid-cols-card gap-10 lg:gap-5"}>
                {
                    SelectedClassInfoStore.filteredCards.map((card) => {
                        let Component = SelectedClassInfoStore.currentClass.component

                        return (
                            <div
                                key={card.id}
                                className={"bg-white rounded-xl shadow-lg border-solid border border-gray-200"}
                            >
                                <Component card={card}/>
                            </div>

                        )
                    })
                }
            </div>
        </>
    )
})

export default CardComponent