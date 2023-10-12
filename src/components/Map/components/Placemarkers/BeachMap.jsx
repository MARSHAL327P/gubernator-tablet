import {observer} from "mobx-react-lite";
import SelectedClassInfoStore from "../../../../stores/selectedClassInfo.store";
import BeachPlacemarker from "../../../BeachCard/components/BeachPlacemarker";
import BeachLocalStore from "../../../BeachCard/store/beachLocal.store";
import MapStore from "../../store/map.store";
import React, {Fragment} from "react";
import ActivePlacemark from "../../../ActivePlacemark/ActivePlacemark";
import UiStore from "../../../../stores/ui.store";
import {toPage} from "../../../../Utils";
import {useNavigate} from "react-router-dom";

const BeachMap = observer(() => {
    const {
        YMapFeature,
    } = MapStore.mapData
    const navigate = useNavigate()

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
                        stroke: [{width: 0}]
                    }}
                />
                <ActivePlacemark
                    wrapper={{
                        onClick: () => {
                            toPage(`/beach/${beach.code}?tab=info`, navigate)
                        },
                        style: {
                            animationDelay: `.${idx * UiStore.animationDelay}s`
                        },
                        classes: "grid h-[57px]",
                        data: beach
                    }}
                    coordinates={beach.coord}
                >
                    {
                        () =>
                            <BeachPlacemarker
                                beach={beach}
                            />
                    }
                </ActivePlacemark>
            </Fragment>
        )
    })

})

export default BeachMap