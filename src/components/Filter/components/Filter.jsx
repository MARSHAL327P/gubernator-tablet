import {observer} from "mobx-react-lite";
import FilterStore from "../store/filter.store";
import {useRef, useState} from "react";
import FixedHeader from "../../FixedHeader/FixedHeader";
import {Button} from "@material-tailwind/react";
import {Transition} from '@headlessui/react'
import cc from "classcat";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import FilterGroup from "./FilterGroup";
import { ReactComponent as Close } from "../../../assets/icons/Close.svg";
import {XMarkIcon} from "@heroicons/react/24/solid";
import {runInAction} from "mobx";

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
                <div className={"text-title"}>
                    {SelectedClassInfoStore.currentClass?.filterName}
                </div>

                <div className={"flex"}>
                    <Transition
                        show={FilterStore.numChangedParams > 0}
                        enter="transition-opacity duration-75"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className={"hover:cursor-pointer"} onClick={() => FilterStore.clearAllFilter()}>
                            <Button variant={"text"} color={"white"}>
                                Очистить
                            </Button>
                        </div>
                    </Transition>
                    <Button onClick={() => {runInAction(() => FilterStore.isOpen = false)}} className={"hidden lg:block"} variant={"text"} color={"white"}>
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