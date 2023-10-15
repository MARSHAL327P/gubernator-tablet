import {observer} from "mobx-react-lite";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import FilterStore from "../../Filter/store/filter.store";
import SidebarStore from "../../Sidebar/store/sidebar.store";
import CardHeader from "./CardHeader";
import UiStore from "../../../stores/ui.store";
import {useEffect} from "react";

const CardComponent = observer(() => {
    useEffect(() => {
        let elementId = window.location.hash.replace("#", "")

        if( elementId )
            document.getElementById(elementId).scrollIntoView({ behavior: "smooth" })
    }, []);

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
            <div className={UiStore.cardWrapperClasses}>
                {
                    SelectedClassInfoStore.filteredCards.map((card) => {
                        let Component = SelectedClassInfoStore.currentClass.component

                        return (
                            <div
                                id={card.code + card.id}
                                key={card.id}
                                className={UiStore.cardItemClasses}
                            >
                                <CardHeader card={card}/>
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