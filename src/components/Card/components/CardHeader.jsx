import {observer} from "mobx-react-lite";
import {Tooltip} from "@material-tailwind/react";
import {ReactComponent as Star} from "../../../assets/icons/Star.svg";
import BeachLocalStore from "../../BeachCard/store/beachLocal.store";
import {getUpdateTimeText} from "../../../Utils";

const CardHeader = observer(({updateTime, problems, name, rating = 0}) => {
    let cardProblems = BeachLocalStore.beachProblemsType[problems]

    return (
        <div className={"px-7 pt-4"}>
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
                        problems &&
                        <Tooltip content={cardProblems.name}>
                            {cardProblems.icon}
                        </Tooltip>
                    }
                    <span className={"text-title"}>{name}</span>
                </div>


                {
                    rating > 0 &&
                    <div className={"flex gap-1 items-center"}>
                        <Star className={"fill-warning"}/>
                        <span className={"h-[20px]"}>{rating}</span>
                    </div>
                }

            </div>
        </div>
    )
})

export default CardHeader