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
import BeachInfo from "../components/BeachCard/components/BeachInfo";
import MapStore from "../components/Map/store/map.store";
import Reviews from "../components/Reviews/components/Reviews";

const BeachPage = observer(() => {
    const tabItems = [
        {
            title: "Информация",
            content: <BeachInfo/>,
            link: "info",
            getParam: true,
        },
        {
            title: "Отзывы",
            content: <Reviews/>,
            link: "reviews",
            getParam: true,
        },
        {
            title: "Качество воздуха",
            content: <AirQuality />,
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

    const {beachCode} = useParams()
    let isLoading  = SelectedClassInfoStore.currentClass?.isLoading

    useEffect(() => {
        runInAction(() => {
            BeachLocalStore.code = beachCode
            if( SelectedClassInfoStore.currentClass === null )
                SelectedClassInfoStore.initCurrentClass(BeachLocalStore)

            if(SelectedClassInfoStore.currentClass.list.length > 0 && !isLoading)
                MapStore.zoomToItem(SelectedClassInfoStore.currentClass.card.coord)
        })
    }, [beachCode, isLoading])

    return (
        <Dashboard
            tabItems={tabItems}
        />
    )
})

export default BeachPage