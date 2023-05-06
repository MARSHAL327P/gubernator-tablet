import { observer } from "mobx-react-lite";
import { Clusterer, Map, Placemark, ZoomControl } from "@pbe/react-yandex-maps";
import LocalStationStore from "../components/Stations/store/localStationStore";
import { Badge, Button } from "@material-tailwind/react";
import { ReactComponent as Human } from "../assets/icons/Human.svg";
import useWindowSize from "../hooks/useWindowSize";

const MapTemplate = observer(() => {
    const [, height] = useWindowSize() // Следим за изменением высоты
    const mapDefaultState = {
        center: [44.556972, 33.526402],
        zoom: 12,
        controls: [],
    }
    // const ymaps = useYMaps(['Placemark']);
    //
    // useEffect(() => {
    //     console.log(ymaps)
    //     const layout = ymaps.templateLayoutFactory.createClass(
    //         `<div>test</div>`,
    //         {
    //             build: function () {
    //                 layout.superclass.build.call(this);
    //             }
    //         }
    //     )
    // }, [ymaps]);
    // const collection = {
    //     type: "FeatureCollection",
    //     features: LocalStationStore.stationList.map((station, index) => {
    //         return {
    //             id: station.id,
    //             type: "Feature",
    //             geometry: {
    //                 type: "Point",
    //                 coordinates: station.coord
    //             },
    //             properties: {
    //                 balloonContent: `<div>${station.name}</div>`,
    //             }
    //         };
    //     })
    // };
    //

    return (
        <>
            <Map
                width={"100%"}
                height={height}
                defaultState={mapDefaultState}
            >
                <ZoomControl options={{ float: "right" }}/>
                {/*<ObjectManager*/}
                {/*    objects={{*/}
                {/*        openBalloonOnClick: true*/}
                {/*    }}*/}
                {/*    clusters={{}}*/}
                {/*    options={{*/}
                {/*        clusterize: true,*/}
                {/*        gridSize: 32*/}
                {/*    }}*/}
                {/*    defaultFeatures={collection}*/}
                {/*    modules={[*/}
                {/*        "objectManager.addon.objectsBalloon",*/}
                {/*        "objectManager.addon.clustersBalloon"*/}
                {/*    ]}*/}
                {/*/>*/}
                <Clusterer
                    options={{
                        preset: "islands#darkBlueCircleDotIcon",
                        groupByCoordinates: false,
                        openBalloonOnClick: true,
                    }}
                >
                    {LocalStationStore.stationList.map((station, index) => (
                        <Placemark
                            name={"test" + index}
                            onClick={(e) => {
                                console.log(e)
                            }
                            }
                            key={index}
                            geometry={station.coord}
                            options={{
                                // iconLayout: layout,
                            }}
                            properties={{
                                balloonContent: "test balloon content"
                            }}
                        />
                    ))}
                </Clusterer>
                {/*<RouteButton options={{ float: "right" }} />*/}
            </Map>
            <div className={"!absolute top-7 right-5"}>
                <Badge content="2">
                    <Button color={"white"}>
                        <Human className={"fill-black"}/>
                        Профиль
                    </Button>
                </Badge>
            </div>
        </>
    )
})

export default MapTemplate