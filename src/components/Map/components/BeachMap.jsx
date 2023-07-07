import {observer} from "mobx-react-lite";
import ActivePlacemark from "../../ActivePlacemark/ActivePlacemark";
import {Polygon} from "@pbe/react-yandex-maps";
import {useNavigate} from "react-router-dom";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import BeachPlacemarker from "../../BeachCard/components/BeachPlacemarker";

const BeachMap = observer(() => {
    let navigate = useNavigate()

    return SelectedClassInfoStore.filteredCards.map((beach, idx) => {
        let polygonColor = beach.bathingComfortMapColors.polygon

        return (
            <div key={beach.id}>
                <Polygon
                    geometry={beach.polygon[0]}
                    options={{
                        fillColor: polygonColor,
                        opacity: 0.8,
                        strokeWidth: 0,
                    }}
                />
                <ActivePlacemark
                    geometry={beach.coord}
                    onClick={() => {
                        navigate(`/beach/${beach.code}`)
                    }}
                    options={{
                        iconImageSize: [40, 55],
                        iconImageOffset: [-20, -50],
                        iconContentOffset: [-8, -2],
                    }}
                    component={<BeachPlacemarker beach={beach}/>}
                />
            </div>
        )
    })

})

export default BeachMap