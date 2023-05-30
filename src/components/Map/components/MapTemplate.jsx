import {observer} from "mobx-react-lite";
import {Clusterer, Map, Polygon, useYMaps, ZoomControl} from "@pbe/react-yandex-maps";
import RealObjectStore from "../../RealObjects/store/realObject.store";
import useWindowSize from "../../../hooks/useWindowSize";
import ActivePlacemark from "../../ActivePlacemark/ActivePlacemark";
import RealObjectPlacemarker from "../../RealObjects/components/RealObjectPlacemarker";
import IndicationsStore from "../../Indications/store/indications.store";
import BeachLocalStore from "../../BeachCard/store/beachLocal.store";
import MapStore from "../store/map.store";
import {useEffect} from "react";
import {action} from "mobx";

const MapTemplate = observer(() => {
    const [width, height] = useWindowSize() // Следим за изменением высоты
    const mapDefaultState = {
        center: [44.556972, 33.526402],
        zoom: 12,
        controls: [],
    }
    const beaches = [
        {
            "type": "Feature",
            "properties": {"id": 1},
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [[[[44.616613742765779, 33.515777939807947], [44.616518396668013, 33.515834572144243], [44.617269604075965, 33.517869291084097], [44.61718292679749, 33.518099865596156], [44.616486614600412, 33.518132226931179], [44.61585385888182, 33.519208241320861], [44.615943427464671, 33.519293189825305], [44.616521285946035, 33.518294033606331], [44.617237822422318, 33.518249536770668], [44.617399619749463, 33.517877381417847], [44.616613742765779, 33.515777939807947]]]]
            }
        }
    ]


    const ymaps = useYMaps()
    useEffect(() => {
        action(() => {
            MapStore.ymaps = ymaps
        })
    }, [ymaps])

    return (
        <>
            <Map
                width={width}
                height={height}
                defaultState={mapDefaultState}
            >
                <ZoomControl options={{float: "right"}}/>
                {/*<Clusterer*/}
                {/*    options={{*/}
                {/*        preset: "islands#darkBlueCircleDotIcon",*/}
                {/*        groupByCoordinates: false,*/}
                {/*        openBalloonOnClick: true,*/}
                {/*    }}*/}
                {/*>*/}
                {RealObjectStore.list.map((realObject, index) => {
                    let indicationName = RealObjectStore.realObjectTypes[realObject.type].mapIndication
                    let mapIndication = realObject.props[indicationName]

                    return (
                        <ActivePlacemark
                            key={index}
                            geometry={realObject.coord}
                            yMapObject={ymaps}
                            component={
                                <RealObjectPlacemarker
                                    data={mapIndication + IndicationsStore.indications[indicationName].units}
                                    type={realObject.type}
                                />
                            }
                        />
                    )
                })}
                {/*</Clusterer>*/}
                {
                    BeachLocalStore.list.length > 0 && beaches.map(beachPolygon => {
                        let beach = BeachLocalStore.list[BeachLocalStore.list.findIndex((beach) => beach.id === beachPolygon.properties.id)]

                        return (
                            <Polygon
                                key={beachPolygon.properties.id}
                                geometry={beachPolygon.geometry.coordinates[0]}
                                options={{
                                    fillColor: beach.isOpen === true ? "#FCC33F" : "#FF4C28",
                                    // opacity: 0.8,
                                    strokeWidth: 0,
                                }}
                            />
                        )
                    })
                }
            </Map>
        </>
    )
})

export default MapTemplate