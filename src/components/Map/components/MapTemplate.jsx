import {observer} from "mobx-react-lite";
import {Clusterer, Map, Placemark, Polygon, useYMaps, ZoomControl} from "@pbe/react-yandex-maps";
import RealObjectStore from "../../RealObjects/store/realObject.store";
import useWindowSize from "../../../hooks/useWindowSize";
import ActivePlacemark from "../../ActivePlacemark/ActivePlacemark";
import {useEffect} from "react";
import RealObjectPlacemarker from "../../RealObjects/components/RealObjectPlacemarker";
import IndicationsStore from "../../Indications/store/indications.store";

const MapTemplate = observer(() => {
    const [width, height] = useWindowSize() // Следим за изменением высоты
    const mapDefaultState = {
        center: [44.556972, 33.526402],
        zoom: 12,
        controls: [],
    }
    let beaches = [
        {
            "type": "Feature",
            "properties": {"id": 1, "Name": "Андреевка", "isOpen": "true"},
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [[[[33.551691147568029, 44.817959429545851], [33.551940344573033, 44.817960793909698], [33.551936510772954, 44.817813442426448], [33.551906079984846, 44.817558475712133], [33.551899370834704, 44.817383835648812], [33.551469026776047, 44.817434317596827], [33.551630046379273, 44.817670354222855], [33.551695220980598, 44.817853179611461], [33.551693304080551, 44.817956871363556], [33.551693304080551, 44.817956871363556], [33.551693304080551, 44.817956871363556], [33.551691147568029, 44.817959429545851]]]]
            }
        },
        {
            "type": "Feature", "properties": {"id": 2, "Name": "Наш Парус", "isOpen": "false"}, "geometry": {
                "type": "MultiPolygon",
                "coordinates": [[[[33.536800428454612, 44.782573619813121], [33.536828463117686, 44.782468157509513], [33.536790544438801, 44.782460606196381], [33.536801327001513, 44.782411586630843], [33.536850207952504, 44.782416322204277], [33.536923169960232, 44.782046306355582], [33.537017337674634, 44.781608069346113], [33.537064780950594, 44.78150465311483], [33.537005836274396, 44.781483150706691], [33.53702847965608, 44.781437458062669], [33.537092456194863, 44.781448465169547], [33.537462747369524, 44.780626375573931], [33.537425996801637, 44.780613832311303], [33.537453043063081, 44.780552907854343], [33.537509831226721, 44.780569546893148], [33.537901148398731, 44.779678967552911], [33.537846876166391, 44.779666680072367], [33.537869878966859, 44.779615482208413], [33.537936101872802, 44.779630841572526], [33.537998371172584, 44.779462144332456], [33.538153460366331, 44.77913447604476], [33.538230915108528, 44.778939410128295], [33.538151842981939, 44.778925586534214], [33.538175564619912, 44.778853908585674], [33.538248886046397, 44.778866708225912], [33.538267575821777, 44.778826773338913], [33.538095234527667, 44.77881704560582], [33.537943739521474, 44.779279367096628], [33.537730244779667, 44.779804658088153], [33.537578749773473, 44.780176352315749], [33.537444506867644, 44.780442066134036], [33.537307208902362, 44.780773310730673], [33.537106832945192, 44.781068715812623], [33.536999366736772, 44.781232544664853], [33.536832596433399, 44.781587846879937], [33.536816782008088, 44.781798774531126], [33.536766463382065, 44.782401859505796], [33.536742382325329, 44.782550325971499], [33.536800428454612, 44.782573619813121]]]]
            }
        },
        {
            "type": "Feature", "properties": {"id": 3, "Name": "Звездный берег\n", "isOpen": "true"}, "geometry": {
                "type": "MultiPolygon",
                "coordinates": [[[[33.546464390144649, 44.73177620766868], [33.546739704912703, 44.731657329408151], [33.546787867026168, 44.73162709739745], [33.546839623327209, 44.731580468332886], [33.54691725777878, 44.731527690334957], [33.547120688795374, 44.731584055185323], [33.547306328583495, 44.731399588196616], [33.547304172070959, 44.731381653874472], [33.547285482295578, 44.731373455325325], [33.547307047421015, 44.731347834851732], [33.54729842137084, 44.731342198345992], [33.547315673471189, 44.731327850874386], [33.547317111146221, 44.731281733977063], [33.547342270459225, 44.731277122285292], [33.547345864646793, 44.731235104632134], [33.54743140631102, 44.731218707490846], [33.547477411911942, 44.731210508918451], [33.547527730537965, 44.731195649002998], [33.547566547763743, 44.731178739439372], [33.547670060365832, 44.731097266017571], [33.547681202347299, 44.731085992956395], [33.547120868504763, 44.730914590912818], [33.547010167527539, 44.731184119755618], [33.546830458148918, 44.731405480901252], [33.546625230038529, 44.731559203417227], [33.546561972337258, 44.731680131507346], [33.546491526260837, 44.731731372146726], [33.546464390144649, 44.73177620766868]]]]
            }
        }
    ]

    beaches.forEach(item => {
        item.geometry.coordinates[0][0] = item.geometry.coordinates[0][0].map(coord => {
            return [coord[0], coord[1]] = [coord[1], coord[0]]
        })
    })

    const ymaps = useYMaps()

    return (
        <>
            <Map
                width={width}
                height={height}
                defaultState={mapDefaultState}
            >

                <ZoomControl options={{float: "right"}}/>
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
                </Clusterer>
                {/*{*/}
                {/*    beaches.map(item => {*/}
                {/*        return (*/}
                {/*            <Polygon*/}
                {/*                key={item.properties.id}*/}
                {/*                geometry={item.geometry.coordinates[0]}*/}
                {/*                options={{*/}
                {/*                    fillColor: item.properties.isOpen == "true" ? "#FCC33F" : "#FF4C28",*/}
                {/*                    opacity: 0.8,*/}
                {/*                }}*/}
                {/*            />*/}
                {/*        )*/}
                {/*    })*/}
                {/*}*/}
                {/*<RouteButton options={{ float: "right" }} />*/}
            </Map>
        </>
    )
})

export default MapTemplate