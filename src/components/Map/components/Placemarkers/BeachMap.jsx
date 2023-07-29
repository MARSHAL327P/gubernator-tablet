import {observer} from "mobx-react-lite";
import ActivePlacemark from "../../../ActivePlacemark/ActivePlacemark";
import {Polygon} from "@pbe/react-yandex-maps";
import {useNavigate, useSearchParams} from "react-router-dom";
import SelectedClassInfoStore from "../../../../stores/selectedClassInfo.store";
import BeachPlacemarker from "../../../BeachCard/components/BeachPlacemarker";
import BeachLocalStore from "../../../BeachCard/store/beachLocal.store";
import MapStore from "../../store/map.store";
import React, {Fragment} from "react";
import {toJS} from "mobx";

const BeachMap = observer(() => {
    const {
        YMapFeature,
        YMapMarker
    } = MapStore.mapData

    return !BeachLocalStore.isLoading && SelectedClassInfoStore.filteredCards.map((beach) => {
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
                    }}
                />
                <YMapMarker coordinates={beach.coord}>
                    <BeachPlacemarker beach={beach}/>
                </YMapMarker>
            </Fragment>
        )
    })

})

export default BeachMap