import { ReactComponent as Star } from "../../../assets/icons/Star.svg";
import { ReactComponent as Water } from "../../../assets/icons/Water.svg";
import { ReactComponent as Temperature } from "../../../assets/icons/Temperature.svg";
import { ReactComponent as Wind } from "../../../assets/icons/Wind.svg";
import { ReactComponent as Map } from "../../../assets/icons/Map.svg";
import { ReactComponent as Route } from "../../../assets/icons/Route.svg";
import { ReactComponent as Chevron } from "../../../assets/icons/Chevron.svg";
// import Button, { WHITE } from "../../RedefinedTags/Button/Button";
import { Button, Tooltip } from "@material-tailwind/react";
import { observer } from "mobx-react-lite";
import BathingComfort from "./BathingComfort";
import 'dayjs/locale/ru';
import 'dayjs/plugin/updateLocale';
import BeachLocalStore from "../store/beachLocalStore";
import { Link } from "react-router-dom";

const BeachCard = observer(({ beach }) => {
    let classes = {
        indications: "flex items-center gap-2 whitespace-nowrap",
        paddings: "px-7 pb-2 pt-4"
    }
    let beachProblems = BeachLocalStore.beachProblemsType[beach.beachProblems]
    let indications = [
        {
            name: "Температура воды",
            color: "fill-primary",
            value: beach.waterTemp,
            icon: Water,
            units: "°",
        },
        {
            name: "Температура воздуха",
            color: "fill-warning",
            value: beach.airTemp,
            icon: Temperature,
            units: "°",
        },
        {
            name: "Скорость ветра",
            color: "fill-danger",
            value: beach.wind,
            icon: Wind,
            units: " м/с",
        }
    ]

    return (
        <div className={"bg-white rounded-xl shadow-lg border-solid border border-gray-200"}>
            <div className={classes.paddings}>
                <Tooltip content={"Время последнего обновления данных"}>
                    <div className="text-gray-400 text-[12px]">
                        {beach.updateTimeText}
                    </div>
                </Tooltip>

                <div className="flex justify-between items-center">
                    <span className={"text-title"}>{beach.name}</span>
                    {
                        beach.beachProblems &&
                        <Tooltip content={beachProblems.name}>
                            {beachProblems.icon}
                        </Tooltip>
                    }

                    <div className={"flex gap-1 items-center"}>
                        <Star className={"fill-warning"}/>
                        <span className={"h-[20px]"}>{beach.rating}</span>
                    </div>
                </div>
            </div>
            <BathingComfort bathingComfort={beach.bathingComfort} />
            <div className="px-7 py-5">
                <div className={"flex gap-10 items-center justify-around"}>
                    {
                        indications.map((item, idx) => {
                            let Icon = item.icon

                            return (
                                item.value &&
                                <Tooltip key={idx} content={item.name} placement={"bottom"}>
                                    <div className={classes.indications}>
                                        <Icon className={item.color}/>
                                        <span>{item.value}{item.units}</span>
                                    </div>
                                </Tooltip>
                            )
                        })
                    }

                </div>
                <div className="flex justify-between gap-5 mt-5">
                    <Button fullWidth className={"flex items-center gap-2"}>
                        <Map className={"fill-white"}/>
                        На карте
                    </Button>
                    <Button fullWidth className={"flex items-center gap-2"}>
                        <Route className={"fill-white"}/>
                        Маршрут
                    </Button>
                </div>
            </div>
            <Link to={`/beach/${beach.code}`}>
                <Button className={"rounded-none"} color={"white"} variant={"text"} fullWidth>
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