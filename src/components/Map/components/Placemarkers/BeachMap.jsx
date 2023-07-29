import {observer} from "mobx-react-lite";
import SelectedClassInfoStore from "../../../../stores/selectedClassInfo.store";
import BeachPlacemarker from "../../../BeachCard/components/BeachPlacemarker";
import BeachLocalStore from "../../../BeachCard/store/beachLocal.store";
import MapStore from "../../store/map.store";
import React, {Fragment} from "react";

const BeachMap = observer(() => {
    const {
        YMapFeature,
        YMapMarker
    } = MapStore.mapData

    return !BeachLocalStore.isLoading && SelectedClassInfoStore.filteredCards.map((beach, idx) => {
        let polygonColor = beach.bathingComfortMapColors.polygon

        return (
            <Fragment key={beach.id}>
                <YMapFeature
                    id={beach.id.toString()}
                    geometry={{
                        type: 'Polygon',
                        coordinates: beach.polygon
                    }}
                    style={{
                        fill: polygonColor,
                        fillOpacity: 0.8,
                        stroke: [{ width: 0 }]
                    }}
                />
                <YMapMarker coordinates={beach.coord}>
                    <BeachPlacemarker beach={beach} idx={idx}/>
                </YMapMarker>
            </Fragment>
        )
    })

})

export default BeachMap