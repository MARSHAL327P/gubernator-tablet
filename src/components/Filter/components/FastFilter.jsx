import {observer} from "mobx-react-lite";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import FilterStore from "../store/filter.store";
import {action} from "mobx";
import {Button, Checkbox} from "@material-tailwind/react";
import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

const FastFilter = observer(({classes, itemClasses}) => {
    if (!SelectedClassInfoStore.currentClass?.fastFilter) return null

    let fastFilter = SelectedClassInfoStore.currentClass.fastFilter

    return (
        <div className={"w-full lg:w-10/12"}>
            <Swiper
                spaceBetween={10}
                slidesPerView={"auto"}
                freeMode={true}
                modules={[FreeMode]}
                className="mySwiper rounded-xl"
            >
                {
                    Object.entries(FilterStore.fastFilter.fields).map(([fieldName, fieldValues]) => {
                        return fieldValues.map(fastFilterItem => {
                            let checkedItemIndex = fastFilter.selected.indexOf(fastFilterItem)
                            let isChecked = checkedItemIndex !== -1

                            return (
                                <SwiperSlide className={"!w-fit"}>
                                    <Button color={"white"} className={"px-3 py-2 shadow-none lg:shadow-lg"}>
                                        <label htmlFor={fastFilterItem}
                                               className="w-full flex gap-2 items-center cursor-pointer">
                                            <Checkbox
                                                id={fastFilterItem}
                                                ripple={false}
                                                className="hover:before:opacity-0 checked:bg-primary checked:border-primary checked:before:bg-primary"
                                                containerProps={{
                                                    className: "p-0"
                                                }}
                                                onChange={action((e) => {
                                                    if (isChecked) {
                                                        fastFilter.selected.splice(checkedItemIndex, 1)
                                                    } else {
                                                        fastFilter.selected.push(fastFilterItem)
                                                    }
                                                })}
                                                checked={isChecked}
                                            />
                                            {FilterStore.fastFilter.alias[fastFilterItem] ?? fastFilterItem}
                                        </label>
                                    </Button>

                                </SwiperSlide>
                            )
                        })
                    })
                }
            </Swiper>
        </div>
    )

})

export default FastFilter