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
import IndicationsStore from "../../Indications/store/indications.store";
import MapStore from "../../Map/store/map.store";

const RealObjectCard = observer(({card}) => {
    const styles = {
        btn: "flex items-center gap-2 shadow-none border hover:shadow-md p-0 w-full",
        btnIcon: "fill-black w-5 h-5"
    }
    let linkType = card.type.toLowerCase().replace(/_/g, "-")

    return (
        <>
            <CardHeader updateTime={card.updated_at} name={card.name} problems={card.beachProblems} />
            <div className="px-7 py-5">
                <Indications
                    data={card.props}
                    indications={[
                        IndicationsStore.indicationTypes.WATER_TEMP,
                        IndicationsStore.indicationTypes.AIR_TEMP,
                        IndicationsStore.indicationTypes.WIND_SPEED,
                    ]}
                />
                <div className="flex justify-between gap-2 mt-5">
                    <Tooltip content={"На карте"}>
                        <Button onClick={MapStore.zoomToItem.bind(MapStore, card.coord)} color={"white"} className={styles.btn}>
                            <Map className={styles.btnIcon}/>
                        </Button>
                    </Tooltip>
                    <Link to={`/object/${linkType}/${card.code}?tab=charts`}>
                        <Button onClick={MapStore.zoomToItem.bind(MapStore, card.coord, true)} fullWidth className={"flex items-center gap-2"}>
                            <Chart className={"fill-white"}/>
                            Графики
                        </Button>
                    </Link>
                    <Link to={`/object/${linkType}/${card.code}?tab=widgets`}>
                        <Button onClick={MapStore.zoomToItem.bind(MapStore, card.coord, true)} fullWidth className={"flex items-center gap-2"}>
                            <Widgets className={"fill-white"}/>
                            Виджеты
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    )
})

export default RealObjectCard