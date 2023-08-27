import { observer } from "mobx-react-lite";
import Dashboard from "../components/Dashboard/components/Dashboard";
import WidgetTemplate from "../components/Widgets/components/WidgetTemplate";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import BeachLocalStore from "../components/BeachCard/store/beachLocal.store";
import AirQuality from "../components/AirQuality/components/AirQuality";
import SelectedClassInfoStore from "../stores/selectedClassInfo.store";
import {runInAction} from "mobx";
import BeachInfo from "../components/BeachCard/components/BeachInfo";
import MapStore from "../components/Map/store/map.store";
import Reviews from "../components/Reviews/components/Reviews";
import WaterQuality from "../components/WaterQuality/components/WaterQuality";

const BeachPage = observer(() => {
    const {beachCode} = useParams()

    let card = SelectedClassInfoStore.currentClass?.card
    let isLoading  = SelectedClassInfoStore.currentClass?.isLoading
    let tabItems = [
        {
            title: "Информация",
            content: <BeachInfo/>,
            link: "info",
            getParam: true,
        },
        {
            title: "Отзывы",
            content: <Reviews card={card}/>,
            link: "reviews",
            getParam: true,
        },
        {
            title: "Качество воздуха",
            content: <AirQuality airQualityData={card?.airQuality}/>,
            link: "aqi",
            getParam: true,
        },
        {
            title: "Качество воды",
            content: <WaterQuality waterQualityData={card?.waterQuality}/>,
            link: "wqi",
            getParam: true,
        },
        {
            title: "Виджеты",
            content: <WidgetTemplate
                data={card?.indications}
                hasCharts={false}
            />,
            link: "widgets",
            getParam: true,
        },
    ]

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
            card={card}
            tabItems={tabItems}
        />
    )
})

export default BeachPage