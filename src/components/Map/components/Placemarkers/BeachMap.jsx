import {observer} from "mobx-react-lite";
import SelectedClassInfoStore from "../../../../stores/selectedClassInfo.store";
import BeachPlacemarker from "../../../BeachCard/components/BeachPlacemarker";
import BeachLocalStore from "../../../BeachCard/store/beachLocal.store";
import MapStore from "../../store/map.store";
import React, {Fragment, useContext} from "react";
import ActivePlacemark from "../ActivePlacemark/ActivePlacemark";
import UiStore from "../../../../stores/ui.store";
import {toPage} from "../../../../Utils";
import {useNavigate} from "react-router-dom";
import useWindowSize from "../../../../hooks/useWindowSize";
import SidebarStore from "../../../Sidebar/store/sidebar.store";
import {MyContext} from "../../../MyContext";

const BeachMap = observer(() => {
    const { mapComponents } = useContext(MyContext);
    const {
        YMapFeature,
    } = mapComponents
    const navigate = useNavigate()
    const [width] = useWindowSize()

    function onClickHandler(beach){
        if( width <= 1024 ){
            SidebarStore.toggleMobileHideCards(false)
            document.getElementById(beach.code + beach.id).scrollIntoView({ behavior: "smooth" })
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
                        events: {
                            onClick: onClickHandler.bind(null, beach),
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