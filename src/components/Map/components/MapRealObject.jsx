import {observer} from "mobx-react-lite";
import RealObjectStore from "../../RealObjects/store/realObject.store";
import ActivePlacemark from "../../ActivePlacemark/ActivePlacemark";
import RealObjectPlacemarker from "../../RealObjects/components/RealObjectPlacemarker";
import IndicationsStore from "../../Indications/store/indications.store";

const MapRealObject = observer(() => {
    const realObjectPolygons = [
        {
            "type": "Feature",
            "properties": {"id": 2, "type": "BUOY"},
            "geometry": {"type": "MultiPoint", "coordinates": [[44.617309514457844, 33.518458637702622]]}
        },
        {
            "type": "Feature",
            "properties": {"id": 1, "type": "METEO_STATION"},
            "geometry": {"type": "MultiPoint", "coordinates": [[44.616762540148841, 33.517701416658646]]}
        }
    ]

    return RealObjectStore.list.map((realObject, index) => {
        let indicationName = RealObjectStore.realObjectTypes[realObject.type].mapIndication
        let mapIndication = realObject.props[indicationName]

        return (
            <ActivePlacemark
                key={index}
                geometry={realObject.coord}
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

export default MapRealObject