import {observer} from "mobx-react-lite";
import ActivePlacemark from "../../ActivePlacemark/ActivePlacemark";
import BeachLocalStore from "../../BeachCard/store/beachLocal.store";
import {Placemark, Polygon} from "@pbe/react-yandex-maps";
import {ReactComponent as MarkerIcon} from "../../../assets/icons/Marker.svg";
import {ReactComponent as MarkerPointIcon} from "../../../assets/icons/MarkerPoint.svg";
import cc from "classcat";
import {useNavigate} from "react-router-dom";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";

const BeachMap = observer(() => {
    let navigate = useNavigate()

    return SelectedClassInfoStore.filteredCards.map(beach => {
        let iconClasses = {
            "fill-warning": beach.isOpen,
            "fill-danger": !beach.isOpen,
        }

        return (
            <div key={beach.id}>
                <Polygon
                    geometry={beach.polygon[0]}
                    options={{
                        fillColor: beach.isOpen === true ? "#FCC33F" : "#FF4C28",
                        // opacity: 0.8,
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
                    component={
                        <div className={"relative inline-flex "}>
                            <MarkerIcon className={cc(["w-14 h-14 transition scale-marker", iconClasses])}/>
                            <MarkerPointIcon className={cc(["relative left-[-57px] top-[-10px]", iconClasses])}/>
                        </div>
                    }
                />
            </div>
        )
    })

})

export default BeachMap