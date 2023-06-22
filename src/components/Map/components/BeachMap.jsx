import {observer} from "mobx-react-lite";
import ActivePlacemark from "../../ActivePlacemark/ActivePlacemark";
import BeachLocalStore from "../../BeachCard/store/beachLocal.store";
import {Polygon} from "@pbe/react-yandex-maps";
import {ReactComponent as Marker} from "../../../assets/icons/Marker.svg";
import cc from "classcat";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";

const BeachMap = observer(() => {
    return BeachLocalStore.list.map(beach => {
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
                    component={
                        <div className={"inline-flex relative"}>
                            <Marker className={cc(["w-14 h-14", {
                                "fill-warning": beach.isOpen,
                                "fill-danger": !beach.isOpen,
                            }])}/>
                        </div>
                    }
                />
            </div>
        )
    })

})

export default BeachMap