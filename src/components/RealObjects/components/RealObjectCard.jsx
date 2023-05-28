import {ReactComponent as Map} from "../../../assets/icons/Map.svg";
import {Button, Tooltip} from "@material-tailwind/react";
import {observer} from "mobx-react-lite";
import 'dayjs/locale/ru';
import 'dayjs/plugin/updateLocale';
import {Link} from "react-router-dom";
import CardHeader from "../../Card/components/CardHeader";

const RealObjectCard = observer(({card}) => {
    const styles = {
        btn: "flex items-center gap-2 shadow-none border hover:shadow-md p-0 w-full",
        btnIcon: "fill-black w-5 h-5"
    }

    return (
        <>
            <CardHeader updateTimeText={card.updateTimeText} rating={card.rating} name={card.name} problems={card.beachProblems} />
            <div className="px-7 py-5">
                <div className="flex justify-between gap-2 mt-5">
                    <Tooltip content={"На карте"}>
                        <Button color={"white"} className={styles.btn}>
                            <Map className={styles.btnIcon}/>
                        </Button>
                    </Tooltip>
                    <Link to={`/object/${card.code}?tab=charts`}>
                        <Button fullWidth className={"w-[200px] flex items-center gap-2"}>
                            Графики
                        </Button>
                    </Link>
                    <Link to={`/object/${card.code}?tab=widgets`}>
                        <Button fullWidth className={"w-[200px] flex items-center gap-2"}>
                            Виджеты
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    )
})

export default RealObjectCard