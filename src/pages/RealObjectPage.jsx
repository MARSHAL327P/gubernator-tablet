import {observer} from "mobx-react-lite";
import Dashboard from "../components/Dashboard/components/Dashboard";
import WidgetTemplate from "../components/Widgets/components/WidgetTemplate";
import WidgetTemplateStore from "../components/Widgets/store/widget.store";
import {useParams} from "react-router-dom";
import RealObjectStore from "../components/RealObjects/store/realObject.store";
import {useEffect} from "react";
import {runInAction} from "mobx";
import SelectedClassInfoStore from "../stores/selectedClassInfo.store";
import MapStore from "../components/Map/store/map.store";

const RealObjectPage = observer(() => {
    const tabItems = [
        {
            title: "Виджеты",
            content: <WidgetTemplate
                widgets={[
                    WidgetTemplateStore.widgets.TEMPERATURE,
                    WidgetTemplateStore.widgets.HUMIDITY,
                    WidgetTemplateStore.widgets.PRESSURE,
                ]}
            />,
            link: "widgets",
            getParam: true,
        },
        {
            title: "Графики",
            content: "Графики",
            link: "charts",
            getParam: true,
        },
    ]

    let {objectType, objectId} = useParams()

    objectType = objectType.toUpperCase().replace(/-/g, "_")

    useEffect(() => {
        runInAction(() => {
            RealObjectStore.id = objectId
            RealObjectStore.type = objectType

            if( SelectedClassInfoStore.currentClass === null )
                SelectedClassInfoStore.initCurrentClass(RealObjectStore)

            if(SelectedClassInfoStore.currentClass.list.length > 0 && !SelectedClassInfoStore.currentClass.isLoading)
                MapStore.zoomToItem(SelectedClassInfoStore.currentClass.card.coord)

        })
    }, [objectType, objectId, SelectedClassInfoStore.currentClass.isLoading])

    return (
        <Dashboard
            tabItems={tabItems}
            homeLink={"/object"}
        />
    )
})

export default RealObjectPage