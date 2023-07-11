import {observer} from "mobx-react-lite";
import RealObjectStore from "../../RealObjects/store/realObject.store";
import ActivePlacemark from "../../ActivePlacemark/ActivePlacemark";
import RealObjectPlacemarker from "../../RealObjects/components/RealObjectPlacemarker";
import IndicationsStore from "../../Indications/store/indications.store";
import {useNavigate} from "react-router-dom";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";

const RealObjectMap = observer(() => {
    let navigate = useNavigate()

    return !RealObjectStore.isLoading && SelectedClassInfoStore.filteredCards.map((realObject, index) => {
        let indicationName = RealObjectStore.realObjectTypes[realObject.type].mapIndication
        let mapIndication = realObject.props[indicationName].value || realObject.props[indicationName]

        return (
            <ActivePlacemark
                geometry={realObject.coord}
                key={realObject.id}
                options={{
                    iconImageSize: [80, 55],
                    iconImageOffset: [-36, -25],
                    iconContentOffset: [30, 30],
                }}
                onClick={(e) => {
                    navigate(realObject.link)
                }}
                component={
                    <RealObjectPlacemarker
                        data={mapIndication + IndicationsStore.indications[indicationName].units}
                        realObject={realObject}
                        type={realObject.type}
                    />
                }
            />
        )
    })
})

export default RealObjectMap