import {observer} from "mobx-react-lite";
import RealObjectStore from "../../../RealObjects/store/realObject.store";
import ActivePlacemark from "../ActivePlacemark/ActivePlacemark";
import RealObjectPlacemarker from "../../../RealObjects/components/RealObjectPlacemarker";
import IndicationsStore from "../../../Indications/store/indications.store";
import SelectedClassInfoStore from "../../../../stores/selectedClassInfo.store";
import {toPage} from "../../../../Utils";
import {useNavigate} from "react-router-dom";
import SidebarStore from "../../../Sidebar/store/sidebar.store";
import useWindowSize from "../../../../hooks/useWindowSize";

const RealObjectMap = observer(() => {
    const navigate = useNavigate()
    const [width] = useWindowSize()

    function onClickHandler(realObject){
        if( width <= 1024 ){
            SidebarStore.toggleMobileHideCards(false)
            document.getElementById(realObject.code + realObject.id).scrollIntoView({ behavior: "smooth" })
        } else {
            toPage(realObject.link, navigate)
        }
    }

    return !RealObjectStore.isLoading && SelectedClassInfoStore.filteredCards.map((realObject, index) => {
        let indicationName = RealObjectStore.realObjectTypes[realObject.type].mapIndication
        let mapIndication = realObject.props[indicationName]?.value || realObject.props[indicationName]

        return (
            <ActivePlacemark
                wrapper={{
                    link: realObject.link,
                    events: {
                        onClick: onClickHandler.bind(null, realObject),
                    },
                    data: realObject
                }}
                key={realObject.id}
                coordinates={realObject.coord}
            >
                {
                    () =>
                        <RealObjectPlacemarker
                            data={mapIndication}
                            realObject={realObject}
                            indicationData={IndicationsStore.indications[indicationName]}
                        />
                }
            </ActivePlacemark>
        )
    })
})

export default RealObjectMap