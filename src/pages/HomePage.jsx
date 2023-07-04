import Sidebar from "../components/Sidebar/components/Sidebar";
import Filter from "../components/Filter/components/Filter";
import {observer} from "mobx-react-lite";
import FilterStore from "../components/Filter/store/filter.store";
import {Transition} from "@headlessui/react";

const HomePage = observer(({tabItems}) => {
    return (
        <>
            <div className={"flex drop-shadow-xl h-full transition absolute top-0 left-0"}>
                <Sidebar tabItems={tabItems}/>
                <Transition
                    show={FilterStore.isOpen}
                    enter="transition duration-75"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition duration-150"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                >
                    <Filter/>
                </Transition>

            </div>
            {/*<AdminBtn/>*/}
        </>
    )
})

export default HomePage