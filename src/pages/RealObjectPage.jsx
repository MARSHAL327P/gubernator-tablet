import {observer} from "mobx-react-lite";
import Dashboard from "../components/Dashboard/components/Dashboard";
import WidgetTemplate from "../components/Widgets/components/WidgetTemplate";
import {useParams} from "react-router-dom";
import RealObjectStore from "../components/RealObjects/store/realObject.store";
import {useEffect} from "react";
import {runInAction} from "mobx";
import SelectedClassInfoStore from "../stores/selectedClassInfo.store";
import MapStore from "../components/Map/store/map.store";
import Charts from "../components/Charts/components/Charts";

const RealObjectPage = observer(() => {
    const tabItems = [
        {
            title: "Виджеты",
            content: <WidgetTemplate data={SelectedClassInfoStore.currentClass?.card?.props} />,
            link: "widgets",
            getParam: true,
        },
        {
            title: "Графики",
            content: <Charts/>,
            link: "charts",
            getParam: true,
        },
    ]

    let {objectType, objectId} = useParams()
    let isLoading = SelectedClassInfoStore.currentClass?.isLoading

    objectType = objectType.toUpperCase().replace(/-/g, "_")

    useEffect(() => {
        runInAction(() => {
            RealObjectStore.id = objectId
            RealObjectStore.type = objectType

            if( SelectedClassInfoStore.currentClass === null )
                SelectedClassInfoStore.initCurrentClass(RealObjectStore)

            if(SelectedClassInfoStore.currentClass.list.length > 0 && !isLoading)
                MapStore.zoomToItem(SelectedClassInfoStore.currentClass.card.coord)

        })
    }, [objectType, objectId, isLoading])

    return (
        <Dashboard
            tabItems={tabItems}
            homeLink={"/object"}
        />
    )
})

export default RealObjectPage