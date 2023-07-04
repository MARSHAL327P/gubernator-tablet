import {observer} from "mobx-react-lite";
import {Card, CardBody, CardHeader} from "@material-tailwind/react";
import BathingComfort from "./BathingComfort";
import MyCardHeader from "../../Card/components/CardHeader";
import IndicationsStore from "../../Indications/store/indications.store";
import Indications from "../../Indications/components/Indications";

const BeachMarkerDescription = observer(({beach}) => {
    return (
        <Card className="absolute bottom-[70px] transition hover-marker__body w-[390px] overflow-hidden">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
            >
                <img
                    className={"w-full"}
                    src={beach.img[0]}
                    alt=""
                />
            </CardHeader>
            <CardBody>
                <MyCardHeader classes={""} name={beach.name} rating={beach.rating} size={"md"}/>
                <BathingComfort classes={"rounded-xl shadow-lg mt-2"} bathingComfort={beach.bathingComfort}/>
                <Indications
                    classes={"mt-4 justify-between"}
                    data={beach.indications}
                    indications={[
                        IndicationsStore.indications.t_surf,
                        IndicationsStore.indications.temperature,
                        IndicationsStore.indications.windSpeed,
                    ]}
                    fixedValue={true}
                    noTooltip={true}
                />
                <div className="flex gap-1">
                    {
                        Object.keys(beach.props).map(propId => {
                            let prop = beach.props[propId]

                            return (
                                prop.value &&
                                <div key={propId} className={"mt-4 relative grid items-center font-sans uppercase whitespace-nowrap select-none text-white bg-primary py-1.5 px-3 text-xs rounded-lg font-medium"}>
                                    {prop.name}
                                </div>
                            )
                        })
                    }
                </div>
            </CardBody>
        </Card>
    )
})

export default BeachMarkerDescription