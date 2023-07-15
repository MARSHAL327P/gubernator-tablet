import {observer} from "mobx-react-lite";
import {Button, Tooltip} from "@material-tailwind/react";
import {ReactComponent as GeoLocation} from "../../../../assets/icons/GeoLocation.svg";
import {useGeolocated} from "react-geolocated";
import MapStore from "../../store/map.store";
import {useEffect} from "react";
import cc from "classcat";

const GeoLocationControl = observer(() => {
    const {
        coords,
        isGeolocationAvailable,
        isGeolocationEnabled,
        getPosition
    } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: true,
        },
        watchLocationPermissionChange: true,
        userDecisionTimeout: 5000,
    });

    let tooltipContent = "Определить моё местоположение"

    if (!isGeolocationAvailable)
        tooltipContent = "Ваш браузер не поддерживает определение геолокации"

    if (!isGeolocationEnabled)
        tooltipContent = "Вы не предоставили доступ к своему местоположению"

    useEffect(() => {
        if (MapStore.geoLocation)
            MapStore.setGeoLocationMarker(MapStore.geoLocation)
    }, [])

    return (
        <div className={cc(["absolute z-10 top-5 right-5"])}>
            <Tooltip content={tooltipContent}>
                <Button
                    color={"white"}
                    variant={"filled"}
                    className={"outline-none whitespace-nowrap w-14 h-14 p-4"}
                    onClick={() => {
                        if( !coords ) return
                        let coordArray = [coords.latitude, coords.longitude]

                        getPosition()
                        MapStore.saveGeoLocation(coordArray)
                        MapStore.zoomToItem(coordArray)
                    }}
                >
                    <GeoLocation/>
                </Button>
            </Tooltip>
        </div>

    )
})

export default GeoLocationControl