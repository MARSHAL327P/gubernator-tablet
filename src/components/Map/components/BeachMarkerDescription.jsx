import {observer} from "mobx-react-lite";
import cc from "classcat";
import {Card, CardBody, CardFooter, CardHeader} from "@material-tailwind/react";
import BathingComfort from "../../BeachCard/components/BathingComfort";
import MyCardHeader from "../../Card/components/CardHeader";
import LazyLoad from "react-lazy-load";
import Comfort from "../../BeachCard/components/Comfort";
import BeachCardProps from "../../BeachCard/components/BeachCardProps";
import IndicationsStore from "../../Indications/store/indications.store";
import Indications from "../../Indications/components/Indications";

const BeachMarkerDescription = observer(({beach}) => {
    return (
        <Card className="absolute bottom-[70px] transition beach-marker__description w-[390px] overflow-hidden">
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
                {/*<Indications*/}
                {/*    classes={"mt-4 justify-between"}*/}
                {/*    data={beach.indications}*/}
                {/*    indications={[*/}
                {/*        IndicationsStore.indications.t_surf,*/}
                {/*        IndicationsStore.indications.temperature,*/}
                {/*        IndicationsStore.indications.windSpeed,*/}
                {/*    ]}*/}
                {/*    fixedValue={true}*/}
                {/*/>*/}
                {/*<div className="flex gap-1">*/}
                {/*    <BeachCardProps cardProps={beach.props}/>*/}
                {/*</div>*/}
            </CardBody>
        </Card>
    )
})

export default BeachMarkerDescription