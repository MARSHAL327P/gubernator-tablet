import {observer} from "mobx-react-lite";
import ActivePlacemark from "../../../ActivePlacemark/ActivePlacemark";
import {Polygon} from "@pbe/react-yandex-maps";
import {useNavigate, useSearchParams} from "react-router-dom";
import SelectedClassInfoStore from "../../../../stores/selectedClassInfo.store";
import BeachPlacemarker from "../../../BeachCard/components/BeachPlacemarker";
import BeachLocalStore from "../../../BeachCard/store/beachLocal.store";

const BeachMap = observer(() => {
    let navigate = useNavigate()
    const [queryParameters] = useSearchParams()

    return !BeachLocalStore.isLoading && SelectedClassInfoStore.filteredCards.map((beach) => {
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
                        navigate(`/beach/${beach.code}?${queryParameters.toString()}`)
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