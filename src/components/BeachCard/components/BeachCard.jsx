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
import MapStore from "../../Map/store/map.store";
import CarouselBeachCard from "./CarouselBeachCard";
import BeachCardProps from "./BeachCardProps";

const BeachCard = observer(({card}) => {
    const styles = {
        btn: "flex items-center gap-2 shadow-none border hover:shadow-md p-0 w-full",
        btnIcon: "fill-black w-5 h-5"
    }

    return (
        <>
            <CardHeader card={card}/>
            <CarouselBeachCard imgs={card.img.slice(0, 10)} cardId={card.id}/>
            <BathingComfort bathingComfort={card.bathingComfort} isOpen={card.isOpen}/>
            <div className="px-7 py-5 flex flex-col gap-4">
                <div className={"flex gap-1"}>
                    <BeachCardProps cardProps={card.props} />
                </div>
                <Indications
                    data={card.indications}
                    fixedValue={true}
                    classes={"justify-between"}
                    oneLine={true}
                />
                <div className="flex justify-between gap-2">
                    <Tooltip content={"На карте"}>
                        <Button onClick={() => {
                            MapStore.zoomToItem(card.coord)
                        }} color={"white"}
                                className={styles.btn}>
                            <Map className={styles.btnIcon}/>
                        </Button>
                    </Tooltip>
                    <Tooltip content={"Маршрут (Строится в яндекс картах)"}>
                        <Button className={styles.btn} color={"white"} onClick={() => {
                            MapStore.generateRoute(card.coord)
                        }}>
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

            {/*<Comfort cardProps={card.props}/>*/}
        </>
    )
})

export default BeachCard