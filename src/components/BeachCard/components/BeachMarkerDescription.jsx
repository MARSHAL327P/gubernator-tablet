import {observer} from "mobx-react-lite";
import {Card, CardBody} from "@material-tailwind/react";
import BathingComfort from "../../BathingComfort/components/BathingComfort";
import CardHeader from "../../Card/components/CardHeader";
import IndicationsStore from "../../Indications/store/indications.store";
import Indications from "../../Indications/components/Indications";
import BeachCardProps from "./BeachCardProps";

const BeachMarkerDescription = observer(({beach}) => {
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
            </CardBody>
        </Card>
    )
})

export default BeachMarkerDescription