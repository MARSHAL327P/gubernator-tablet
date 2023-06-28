import {observer} from "mobx-react-lite";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import FilterStore from "../../Filter/store/filter.store";
import SidebarStore from "../../Sidebar/store/sidebar.store";
import FastFilter from "../../Filter/components/FastFilter";

const CardComponent = observer(() => {
    return (
        <>
            <FastFilter/>
            {
                (FilterStore.numChangedParams > 0 || SidebarStore.searchQuery.trim() !== "") && <div className={"text-center font-bold mb-5"}>
                    Показано {SelectedClassInfoStore.filteredCards.length} из {SelectedClassInfoStore.currentClass.list.length}
                </div>
            }
            <div className={"flex flex-col gap-10"}>
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