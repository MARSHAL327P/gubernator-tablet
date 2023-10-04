import {observer} from "mobx-react-lite";
import FilterStore from "../store/filter.store";
import {useRef, useState} from "react";
import FixedHeader from "../../FixedHeader/FixedHeader";
import {Button} from "@material-tailwind/react";
import {Transition} from '@headlessui/react'
import cc from "classcat";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import FilterGroup from "./FilterGroup";
import {XMarkIcon} from "@heroicons/react/24/solid";
import {runInAction} from "mobx";
import UiStore from "../../../stores/ui.store";

const Filter = observer(() => {
    let filterEl = useRef(null)
    let [elOffset, setElOffset] = useState(0)

    return (
        <div ref={filterEl}
             className={cc({
                 "bg-white transition w-[450px] lg:w-full relative": true,
             })}
        >
            <FixedHeader elOffset={elOffset} classes={"p-7 items-center justify-between h-[104px]"}>
                <div className={"text-2xl font-bold sm:text-lg"}>
                    {SelectedClassInfoStore.currentClass?.filterName}
                </div>

                <div className={"flex"}>
                    <Transition
                        show={FilterStore.numChangedParams > 0}
                        {...UiStore.transitionOpacity}
                    >
                        <div className={"hover:cursor-pointer"} onClick={() => FilterStore.clearAllFilter()}>
                            <Button variant={"text"} color={"white"} className={"p-3"}>
                                Очистить
                            </Button>
                        </div>
                    </Transition>
                    <Button onClick={() => {
                        runInAction(() => FilterStore.isOpen = false)
                    }} className={"hidden lg:block"} variant={"text"} color={"white"}>
                        <XMarkIcon className={"w-5 h-5"}/>
                    </Button>
                </div>

            </FixedHeader>
            <div
                className={"overflow-auto p-7 pt-0 transition filter"}
                onScroll={(e) => {
                    setElOffset(e.currentTarget.scrollTop)
                }}
            >
                <FilterGroup/>
            </div>
        </div>
    )
})

export default Filter