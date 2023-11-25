import {observer} from "mobx-react-lite";
import {ReactComponent as Play} from "../../../assets/icons/Play.svg";
import {Button} from "@material-tailwind/react";
import MapStore from "../../Map/store/map.store";
import cc from "classcat";
import dayjs from "dayjs";
import {capitalizeFirstLetter} from "../../../Utils";

require('dayjs/locale/ru')  // Загружаем русскую локализацию
dayjs.locale('ru') // Используем русскую локализацию

const HeatmapTimeline = observer(({numDays = 3}) => {
    let days = [];
    let totalHours = numDays * 24

    for (let i = 0; i < numDays; i++) {
        days.push(dayjs().add(i, 'day').format('dddd, DD'));
    }

    return (
        <div className={"flex items-center gap-5"}>
            <Button
                color={"white"}
                variant={"filled"}
                className={"outline-none whitespace-nowrap w-14 h-14 p-4 rounded-full"}
            >
                <Play className={"ml-[5px]"}/>
            </Button>
            <div className={"grid relative w-[990px] shadow-lg rounded-xl"}>
                <div className={cc([MapStore.blurBackgroundClasses, "py-2 px-3 text-sm absolute top-[-50px] shadow-none"])}>
                    Данные за 25.11.23 13:00
                </div>
                <div className={"flex h-[60px] overflow-hidden rounded-xl"}>
                    <div className={"absolute top-0 left-0 h-full flex rounded-tl-xl rounded-bl-xl overflow-hidden"}>
                        <div className={"bg-primary w-[100px] h-full transition"}></div>
                        <div className={"bg-danger w-[3px] h-full"}></div>
                    </div>
                    <div className={"bg-gray-200 w-full h-full"}></div>
                    <div
                        className={"rounded-xl absolute bottom-0 flex [&>*:last-child]:border-r-0 " +
                            "w-full h-[calc(100%-5px)] bg-white/50 backdrop-blur"}>
                        {
                            days.map(day => (
                                <div key={day} className={"flex-1 flex justify-center items-center h-full self-center text-center border-r-2 border-gray-200"}>
                                    {capitalizeFirstLetter(day)}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
})

export default HeatmapTimeline