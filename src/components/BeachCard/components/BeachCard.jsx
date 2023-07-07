import {ReactComponent as Map} from "../../../assets/icons/Map.svg";
import {ReactComponent as Route} from "../../../assets/icons/Route.svg";
import {Button, Tooltip} from "@material-tailwind/react";
import {observer} from "mobx-react-lite";
import BathingComfort from "./BathingComfort";
import 'dayjs/locale/ru';
import 'dayjs/plugin/updateLocale';
import {Link} from "react-router-dom";
import CardHeader from "../../Card/components/CardHeader";
import Indications from "../../Indications/components/Indications";
import IndicationsStore from "../../Indications/store/indications.store";
import MapStore from "../../Map/store/map.store";
import CarouselBeachCard from "./CarouselBeachCard";
import Comfort from "./Comfort";

const BeachCard = observer(({card}) => {
    const styles = {
        btn: "flex items-center gap-2 shadow-none border hover:shadow-md p-0 w-full",
        btnIcon: "fill-black w-5 h-5"
    }

    return (
        <>
            <CardHeader updateTime={card.updateTime} rating={card.rating} name={card.name}
                        problems={card.beachProblems}/>
            <CarouselBeachCard imgs={card.img} cardId={card.id}/>
            <BathingComfort bathingComfort={card.bathingComfort}/>
            <div className="px-7 py-5">
                <Indications
                    data={card.indications}
                    indications={[
                        IndicationsStore.indications.t_surf,
                        IndicationsStore.indications.temperature,
                        IndicationsStore.indications.windSpeed,
                        IndicationsStore.indications.Honf,
                        IndicationsStore.indications.turbidity,
                    ]}
                    fixedValue={true}
                    classes={"justify-between"}
                    oneLine={true}
                />
                <div className="flex justify-between gap-2 mt-5">
                    <Tooltip content={"На карте"}>
                        <Button onClick={() => {MapStore.zoomToItem(card.coord)}} color={"white"}
                                className={styles.btn}>
                            <Map className={styles.btnIcon}/>
                        </Button>
                    </Tooltip>
                    <Tooltip content={"Маршрут"}>
                        <Button color={"white"} className={styles.btn}>
                            <Route className={styles.btnIcon}/>
                        </Button>
                    </Tooltip>
                    <Link to={`/beach/${card.code}`}>
                        <Button fullWidth
                                className={"w-[230px] flex items-center gap-2"}>
                            Подробнее о пляже
                        </Button>
                    </Link>
                </div>
            </div>
            <Comfort cardProps={card.props} />
        </>
    )
})

export default BeachCard