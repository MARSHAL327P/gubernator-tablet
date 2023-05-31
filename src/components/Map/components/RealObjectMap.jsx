import {observer} from "mobx-react-lite";
import RealObjectStore from "../../RealObjects/store/realObject.store";
import ActivePlacemark from "../../ActivePlacemark/ActivePlacemark";
import RealObjectPlacemarker from "../../RealObjects/components/RealObjectPlacemarker";
import IndicationsStore from "../../Indications/store/indications.store";

const RealObjectMap = observer(() => {
    return RealObjectStore.list && RealObjectStore.list.map((realObject, index) => {
        let indicationName = RealObjectStore.realObjectTypes[realObject.type].mapIndication
        let mapIndication = realObject.props[indicationName]

        return (
            <ActivePlacemark
                geometry={realObject.coord}
                key={realObject.id}
                component={
                    <RealObjectPlacemarker
                        data={mapIndication + IndicationsStore.indications[indicationName].units}
                        type={realObject.type}
                    />
                }
            />
        )
    })
})

export default RealObjectMap