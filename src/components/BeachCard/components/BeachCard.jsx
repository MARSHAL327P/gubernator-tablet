import { ReactComponent as Star } from "../../../assets/icons/Star.svg";
import { ReactComponent as Water } from "../../../assets/icons/Water.svg";
import { ReactComponent as Temperature } from "../../../assets/icons/Temperature.svg";
import { ReactComponent as Wind } from "../../../assets/icons/Wind.svg";
import { ReactComponent as Map } from "../../../assets/icons/Map.svg";
import { ReactComponent as Route } from "../../../assets/icons/Route.svg";
import { ReactComponent as Chevron } from "../../../assets/icons/Chevron.svg";
import Button, { WHITE } from "../../RedefinedTags/Button/Button";
import { observer } from "mobx-react-lite";
import BathingComfort from "./BathingComfort";
import dayjs from "dayjs";
import 'dayjs/locale/ru';
import 'dayjs/plugin/updateLocale';
import { capitalizeFirstLetter } from "../../../Utils";
import BeachLocalStore from "../store/beachLocalStore";
import { Link } from "react-router-dom";

let relativeTime = require('dayjs/plugin/relativeTime')

const BeachCard = observer((
    {
        updateTime,
        name,
        code,
        rating,
        bathingComfort,
        beachProblems,
        waterTemp,
        airTemp,
        wind,
        coord,
    }) => {

    let classes = {
        indications: "flex items-center gap-2 whitespace-nowrap",
        paddings: "px-7 pb-2 pt-4"
    }

    dayjs.extend(relativeTime)
    updateTime = capitalizeFirstLetter(dayjs(updateTime).locale("ru").fromNow())

    return (
        <div className={"bg-white rounded-xl shadow-lg border-solid border border-gray-200"}>
            <div className={classes.paddings}>
                <div className="text-gray-400 text-[12px]">{updateTime}</div>
                <div className="flex justify-between items-center">
                    <span className={"text-title"}>{name}</span>
                    {beachProblems && BeachLocalStore.beachProblemsType[beachProblems]}
                    <div className={"flex gap-1 items-center"}>
                        <Star className={"fill-warning"}/>
                        <span className={"h-[20px]"}>{rating}</span>
                    </div>
                </div>
            </div>
            <BathingComfort bathingComfort={bathingComfort} />
            <div className="px-7 py-5">
                <div className={"flex gap-10 items-center"}>
                    <div className={classes.indications}>
                        <Water className={"fill-primary"}/>
                        <span>{waterTemp}°</span>
                    </div>
                    <div className={classes.indications}>
                        <Temperature className={"fill-warning"}/>
                        <span>{airTemp}°</span>
                    </div>
                    <div className={classes.indications}>
                        <Wind className={"fill-danger"}/>
                        <span>{wind} м/c</span>
                    </div>
                </div>
                <div className="flex justify-between gap-5 mt-5">
                    <Button classes={"w-full"} icon={Map}>
                        На карте
                    </Button>
                    <Button classes={"w-full"} icon={Route}>
                        Маршрут
                    </Button>
                </div>
            </div>
            <Link to={`/beach/${code}`}>
                <Button classes={"w-full !shadow-none"} type={WHITE} rounded={"none"}>
                    Подробнее о пляже
                </Button>
            </Link>
            <div className="bg-gray-200 text-sm px-3 py-2 rounded-b-xl flex items-center justify-center gap-2">
                <Chevron className={"-rotate-90"}/>
                Дополнительная информация
            </div>
        </div>
    )
})

export default BeachCard