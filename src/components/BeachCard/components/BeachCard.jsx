import {ReactComponent as Star} from "../../../assets/icons/Star.svg";
import {ReactComponent as Water} from "../../../assets/icons/Water.svg";
import {ReactComponent as Temperature} from "../../../assets/icons/Temperature.svg";
import {ReactComponent as Wind} from "../../../assets/icons/Wind.svg";
import {ReactComponent as Map} from "../../../assets/icons/Map.svg";
import {ReactComponent as Route} from "../../../assets/icons/Route.svg";
import {ReactComponent as Chevron} from "../../../assets/icons/Chevron.svg";
import {Button, Tooltip} from "@material-tailwind/react";
import {observer} from "mobx-react-lite";
import BathingComfort from "./BathingComfort";
import 'dayjs/locale/ru';
import 'dayjs/plugin/updateLocale';
import {Link} from "react-router-dom";
import CardHeader from "../../Card/components/CardHeader";

const BeachCard = observer(({card}) => {
    let classes = {
        indications: "flex items-center gap-2 whitespace-nowrap",
        paddings: "px-7 pb-2 pt-4"
    }
    let indications = [
        {
            name: "Температура воды",
            color: "fill-primary",
            value: card.waterTemp,
            icon: Water,
            units: "°",
        },
        {
            name: "Температура воздуха",
            color: "fill-warning",
            value: card.airTemp,
            icon: Temperature,
            units: "°",
        },
        {
            name: "Скорость ветра",
            color: "fill-danger",
            value: card.wind,
            icon: Wind,
            units: " м/с",
        }
    ]

    const styles = {
        btn: "flex items-center gap-2 shadow-none border hover:shadow-md p-0 w-full",
        btnIcon: "fill-black w-5 h-5"
    }

    return (
        <>
            <CardHeader updateTimeText={card.updateTimeText} rating={card.rating} name={card.name} problems={card.beachProblems} />
            <BathingComfort bathingComfort={card.bathingComfort}/>
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
                <div className="flex justify-between gap-2 mt-5">
                    <Tooltip content={"На карте"}>
                        <Button color={"white"} className={styles.btn}>
                            <Map className={styles.btnIcon}/>
                        </Button>
                    </Tooltip>
                    <Tooltip content={"Маршрут"}>
                        <Button color={"white"} className={styles.btn}>
                            <Route className={styles.btnIcon}/>
                        </Button>
                    </Tooltip>
                    <Link to={`/beach/${card.code}`}>
                        <Button fullWidth className={"w-[200px] flex items-center gap-2"}>
                            Подробнее о пляже
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="bg-gray-200 text-sm px-3 py-2 rounded-b-xl flex items-center justify-center gap-2">
                <Chevron className={"-rotate-90"}/>
                Дополнительная информация
            </div>
        </>
    )
})

export default BeachCard