import {observer} from "mobx-react-lite";
import ActivePlacemark from "../../ActivePlacemark/ActivePlacemark";
import BeachLocalStore from "../../BeachCard/store/beachLocal.store";
import {Polygon} from "@pbe/react-yandex-maps";
import { ReactComponent as Marker } from "../../../assets/icons/Marker.svg";

const BeachMap = observer(() => {
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

    return BeachLocalStore.list.length > 0 && beaches.map(beachPolygon => {
        let beach = BeachLocalStore.list[BeachLocalStore.list.findIndex((beach) => beach.id === beachPolygon.properties.id)]

        return (
            <div>
                <Polygon
                    key={beachPolygon.properties.id}
                    geometry={beachPolygon.geometry.coordinates[0]}
                    options={{
                        fillColor: beach.isOpen === true ? "#FCC33F" : "#FF4C28",
                        // opacity: 0.8,
                        strokeWidth: 0,
                    }}
                />
                <ActivePlacemark
                    component={<Marker className={"fill-danger"}/>}
                />
            </div>

        )
    })

})

export default BeachMap