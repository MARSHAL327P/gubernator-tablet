import {observer} from "mobx-react-lite";
import {Button, Card, CardBody} from "@material-tailwind/react";
import BathingComfort from "../../BathingComfort/components/BathingComfort";
import CardHeader from "../../Card/components/CardHeader";
import IndicationsStore from "../../Indications/store/indications.store";
import Indications from "../../Indications/components/Indications";
import BeachCardProps from "./BeachCardProps";
import useWindowSize from "../../../hooks/useWindowSize";
import {Link} from "react-router-dom";

const BeachMarkerDescription = observer(({beach}) => {
    const [width] = useWindowSize()

    return (
        <Card className="w-[400px] overflow-hidden">
            <CardBody>
                <CardHeader classes={""} card={beach} noUpdateTime={true} size={"md"}/>
                <BathingComfort rounded={true} classes={"mt-2"} bathingComfort={beach.bathingComfort} isOpen={beach.isOpen}/>
                <Indications
                    classes={"mt-4 justify-between"}
                    data={beach.indications}
                    indications={[
                        IndicationsStore.indications.t_surf,
                        IndicationsStore.indications.temperature,
                        IndicationsStore.indications.wind,
                        IndicationsStore.indications.Honf,
                        IndicationsStore.indications.turbidity,
                    ]}
                    fixedValue={true}
                    noTooltip={true}
                />
                <div className={"mt-4"}>
                    <BeachCardProps cardProps={beach.props} />
                </div>
                {
                    width <= 1024 &&
                    <Link to={`/beach/${beach.code}`}>
                        <Button className={"mt-4 w-full"} onClick={() => {beach.markerDescriptionIsOpen = false}}>
                            Подробнее
                        </Button>
                    </Link>
                }
            </CardBody>
        </Card>
    )
})

export default BeachMarkerDescription