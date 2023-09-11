import {observer} from "mobx-react-lite";
import Dashboard from "../components/Dashboard/components/Dashboard";
import {useParams} from "react-router-dom";
import RealObjectStore from "../components/RealObjects/store/realObject.store";
import {runInAction} from "mobx";
import SelectedClassInfoStore from "../stores/selectedClassInfo.store";
import DashboardStore from "../components/Dashboard/store/dashboard.store";
import {lazy, useEffect} from "react";

const WidgetTemplate = lazy(() => import("../components/Widgets/templates/WidgetTemplate"))
const Charts = lazy(() => import("../components/Charts/components/Charts"))

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
            content: <Charts data={SelectedClassInfoStore.currentClass?.card?.props}/>,
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

            DashboardStore.initDashboardObject(RealObjectStore)

        })
    }, [objectId, objectType])

    return (
        <Dashboard
            tabItems={tabItems}
            homeLink={"/object"}
        />
    )
})

export default RealObjectPage