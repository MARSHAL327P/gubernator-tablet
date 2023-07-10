import {observer} from "mobx-react-lite";
import {Tooltip} from "@material-tailwind/react";
import {ReactComponent as Star} from "../../../assets/icons/Star.svg";
import BeachLocalStore from "../../BeachCard/store/beachLocal.store";
import {getUpdateTimeText} from "../../../Utils";
import cc from "classcat";
import {Link} from "react-router-dom";

const CardHeader = observer(({
                                 card,
                                 size = "xs",
                                 classes = "px-7 pt-4"
                             }) => {
    if( !card ) return

    let cardProblems = card.beachProblems && BeachLocalStore.beachProblemsType[card.beachProblems]
    let updateTime = card.updateTime || card.props_updated_at

    return (
        <div className={classes}>
            {
                updateTime &&
                <Tooltip content={"Время последнего обновления данных"}>
                    <div className="text-gray-400 text-[12px]">
                        {getUpdateTimeText(updateTime)}
                    </div>
                </Tooltip>
            }

            <div className="flex justify-between items-center">
                <div className={"flex gap-2 items-center"}>
                    {
                        card.beachProblems &&
                        <Tooltip content={cardProblems.name}>
                            {cardProblems.icon}
                        </Tooltip>
                    }
                    <span className={cc({
                        "text-black": true,
                        "text-title": size === "xs",
                        "text-xl font-bold": size === "md"
                    })}>{card.name}</span>
                </div>


                {
                    card.rating > 0 &&
                    <Link to={`http://localhost:3000/beach/${card.code}?tab=reviews`}>
                        <Tooltip content={"Отзывы"}>
                            <div className={"flex gap-1 items-center"}>
                                <Star className={"fill-warning"}/>
                                <span className={"h-[20px]"}>{card.rating}</span>
                            </div>
                        </Tooltip>
                    </Link>
                }

            </div>
        </div>
    )
})

export default CardHeader