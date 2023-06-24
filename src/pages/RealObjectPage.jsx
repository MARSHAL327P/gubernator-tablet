import {observer} from "mobx-react-lite";
import Dashboard from "../components/Dashboard/components/Dashboard";
import WidgetTemplate from "../components/Widgets/components/WidgetTemplate";
import WidgetTemplateStore from "../components/Widgets/store/widget.store";
import {useParams} from "react-router-dom";
import RealObjectStore from "../components/RealObjects/store/realObject.store";
import {useEffect} from "react";
import {runInAction} from "mobx";
import SelectedClassInfoStore from "../stores/selectedClassInfo.store";

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

    let {objectType, objectCode} = useParams()

    objectType = objectType.toUpperCase().replace(/-/g, "_")

    useEffect(() => {
        runInAction(() => {
            RealObjectStore.code = objectCode
            RealObjectStore.type = objectType
            SelectedClassInfoStore.initCurrentClass(RealObjectStore)
        })
    }, [objectType, objectCode])

    return (
        <Dashboard
            tabItems={tabItems}
            homeLink={"/object"}
        />
    )
})

export default RealObjectPage