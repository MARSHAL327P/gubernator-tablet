import {observer} from "mobx-react-lite";
import {Tooltip, Typography} from "@material-tailwind/react";
import {ReactComponent as Star} from "../../../assets/icons/Star.svg";
import BeachLocalStore from "../../BeachCard/store/beachLocal.store";
import {getUpdateTimeText} from "../../../Utils";
import {Link} from "react-router-dom";
import useWindowSize from "../../../hooks/useWindowSize";

const CardHeader = observer(({
                                 card,
                                 size = "xs",
                                 classes = "px-7 pt-4 sm:px-5",
                                 noUpdateTime = false
                             }) => {
    if (!card) return

    const [width] = useWindowSize()

    let cardProblems = card.beachProblems && BeachLocalStore.beachProblemsType[card.beachProblems]
    let updateTime = card.updateTime || card.props_updated_at

    return (
        <div className={classes}>
            {
                updateTime && !noUpdateTime &&
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
                    <Typography className={"text-black"} variant={width > 640 && size === "xs" ? "h4" : "h5"}>
                        {card.name}
                    </Typography>
                </div>


                {
                    card.rating !== undefined &&
                    <Link to={`/beach/${card.code}?tab=reviews`}>
                        <Tooltip content={"Отзывы"}>
                            <div className={"flex gap-1 items-center"}>
                                <Star className={"fill-warning"}/>
                                {card.rating > 0 && <span className={"h-[20px]"}>{card.rating.toFixed(1)}</span>}
                            </div>
                        </Tooltip>
                    </Link>
                }

            </div>
        </div>
    )
})

export default CardHeader