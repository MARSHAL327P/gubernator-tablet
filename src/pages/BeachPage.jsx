import { observer } from "mobx-react-lite";
import Dashboard from "../components/Dashboard/components/Dashboard";
import WidgetTemplate from "../components/Widgets/components/WidgetTemplate";
import WidgetTemplateStore from "../components/Widgets/store/widget.store";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import BeachLocalStore from "../components/BeachCard/store/beachLocal.store";
import AirQuality from "../components/AirQuality/components/AirQuality";
import SelectedClassInfoStore from "../stores/selectedClassInfo.store";
import {runInAction} from "mobx";

const BeachPage = observer(() => {
    const {beachCode} = useParams()
    
    useEffect(() => {
        runInAction(() => {
            BeachLocalStore.code = beachCode
            SelectedClassInfoStore.initCurrentClass(BeachLocalStore)
        })
    }, [beachCode])

    const tabItems = [
        {
            title: "Информация",
            content: "Информация",
            link: "info",
            getParam: true,
        },
        {
            title: "Отзывы",
            content: "Отзывы",
            link: "reviews",
            getParam: true,
        },
        {
            title: "Качество воздуха",
            content: SelectedClassInfoStore.currentClass?.card && <AirQuality airQualityData={SelectedClassInfoStore.currentClass.card.airQuality} />,
            link: "aqi",
            getParam: true,
        },
        {
            title: "Виджеты",
            content: <WidgetTemplate
                widgets={[
                    WidgetTemplateStore.widgets.TEMPERATURE,
                    WidgetTemplateStore.widgets.HUMIDITY,
                    WidgetTemplateStore.widgets.PRESSURE,
                ]}
                hasCharts={false}
            />,
            link: "widgets",
            getParam: true,
        },
    ]


    return (
        <Dashboard
            tabItems={tabItems}
        />
    )
})

export default BeachPage