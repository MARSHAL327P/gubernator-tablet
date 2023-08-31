import {observer} from "mobx-react-lite";
import RealObjectStore from "../../../RealObjects/store/realObject.store";
import ActivePlacemark from "../../../ActivePlacemark/ActivePlacemark";
import RealObjectPlacemarker from "../../../RealObjects/components/RealObjectPlacemarker";
import IndicationsStore from "../../../Indications/store/indications.store";
import SelectedClassInfoStore from "../../../../stores/selectedClassInfo.store";
import React from "react";

const RealObjectMap = observer(() => {
    return !RealObjectStore.isLoading && SelectedClassInfoStore.filteredCards.map((realObject, index) => {
        let indicationName = RealObjectStore.realObjectTypes[realObject.type].mapIndication
        let mapIndication = realObject.props[indicationName]?.value || realObject.props[indicationName]

        return (
            <ActivePlacemark
                wrapper={{
                    link: realObject.link,
                }}
                key={realObject.id}
                coordinates={realObject.coord}
            >
                {
                    (isOpen) =>
                        <RealObjectPlacemarker
                            isOpen={isOpen}
                            data={mapIndication}
                            realObject={realObject}
                            indicationData={IndicationsStore.indications[indicationName]}
                        />
                }
            </ActivePlacemark>
        )
    })
})

export default RealObjectMap