import {ReactComponent as Map} from "../../../assets/icons/Map.svg";
import {ReactComponent as Chart} from "../../../assets/icons/Chart.svg";
import {ReactComponent as Widgets} from "../../../assets/icons/Widgets.svg";
import {Button, Tooltip} from "@material-tailwind/react";
import {observer} from "mobx-react-lite";
import 'dayjs/locale/ru';
import 'dayjs/plugin/updateLocale';
import {Link} from "react-router-dom";
import CardHeader from "../../Card/components/CardHeader";
import Indications from "../../Indications/components/Indications";
import MapStore from "../../Map/store/map.store";
import cc from "classcat";

const RealObjectCard = observer(({card}) => {
    const styles = {
        btn: "flex items-center gap-2 shadow-none border hover:shadow-md p-0 w-full",
        btnIcon: "fill-black w-5 h-5"
    }
    const btns = [
        {
            title: "Графики",
            icon: Chart,
            link: `${card.link}?tab=charts`
        },
        {
            title: "Виджеты",
            icon: Widgets,
            link: `${card.link}?tab=widgets`
        }
    ]

    return (
        <>
            <CardHeader card={card} />
            <div className="px-7 py-5">
                <Indications
                    data={card.props}
                />
                <div className="flex justify-between lg:justify-start gap-2 mt-5">
                    <Tooltip content={"На карте"}>
                        <Button onClick={() => {MapStore.zoomToItem(card.coord)}} color={"white"} className={cc([styles.btn, "lg:max-w-[50px]"])}>
                            <Map className={styles.btnIcon}/>
                        </Button>
                    </Tooltip>
                    {
                        btns.map(btn => {
                            let Icon = btn.icon

                            return (
                                <Link to={btn.link}>
                                    <Button fullWidth className={"flex items-center gap-2 sm:w-[120px] sm:text-sm sm:!p-2 sm:!py-3"}>
                                        <Icon className={"fill-white sm:w-4 sm:h-4"}/>
                                        {btn.title}
                                    </Button>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
})

export default RealObjectCard