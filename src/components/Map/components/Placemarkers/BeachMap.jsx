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
import useWindowSize from "../../../../hooks/useWindowSize";
import SidebarStore from "../../../Sidebar/store/sidebar.store";

const BeachMap = observer(() => {
    const {
        YMapFeature,
    } = MapStore.mapData
    const navigate = useNavigate()
    const [width] = useWindowSize()

    function onClickHandler(beach){
        if( width <= 1024 ){
            SidebarStore.mobileHideCards = false

            document.getElementById(beach.code).scrollIntoView({ behavior: "smooth" })
        } else {
            toPage(`/beach/${beach.code}?tab=info`, navigate)
        }
    }

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
                        onClick: onClickHandler.bind(null, beach),
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