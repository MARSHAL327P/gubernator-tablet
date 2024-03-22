import {observer} from "mobx-react-lite";
import DateRangePicker from "react-date-range/dist/components/DateRangePicker";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {ru} from 'react-date-range/dist/locale';
import {Typography} from "@material-tailwind/react";
import ChartsStore from "../store/charts.store";
import {action, toJS} from "mobx";
import {useEffect} from "react";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import ChartItem from "./ChartItem";
import SkeletonCondition from "../../SkeletonCondition/components/SkeletonCondition";
import Skeleton from "react-loading-skeleton";
import FileDownload from "../../FileDownload/components/FileDownload";
import {scrollToElement} from "../../../Utils";


const Charts = observer(({data}) => {
    useEffect(() => {
        if (data)
            ChartsStore.fetchData(Object.keys(data))
    }, [])

    useEffect(() => {
        if (data)
            ChartsStore.fetchData(Object.keys(data))
    }, [data])

    useEffect(() => {
        let chartEl = document.getElementById(window.location.hash.replace("#", ""))

        if (ChartsStore.isLoading || !chartEl) return

        scrollToElement(chartEl)
    }, [ChartsStore.isLoading])

    return (
        <div>
            {
                SelectedClassInfoStore.currentClass?.type === "BUOY" &&
                <FileDownload dateRange={ChartsStore.selectedDateRanges[0]}/>
            }
            <div className={"flex xl:flex-wrap justify-center gap-7 relative"}>
                <div className="bg-white p-6 rounded-xl shadow-lg w-[550px] lg:w-full h-fit sticky top-[90px]">
                    <Typography variant={"h4"} className={"mb-5"}>
                        Выбор даты
                    </Typography>
                    <DateRangePicker
                        className={"w-full"}
                        rangeColors={["#3366FF"]}
                        onChange={
                            action((newDateRanges) => {
                                ChartsStore.dateRangesPreset = ChartsStore.dateRangesPreset.map(item => {
                                    return {
                                        ...item,
                                        selected: newDateRanges.selection.startDate === item.range[0] && newDateRanges.selection.endDate === item.range[1]
                                    }
                                })
                                ChartsStore.selectedDateRanges = [newDateRanges.selection]
                                ChartsStore.fetchData(Object.keys(SelectedClassInfoStore.currentClass.card.props))
                            })
                        }
                        renderStaticRangeLabel={(ranges) => {
                            return ranges.label
                        }}
                        inputRanges={[]}
                        staticRanges={ChartsStore.dateRanges}
                        ranges={ChartsStore.selectedDateRanges}
                        direction="horizontal"
                        maxDate={new Date()}
                        locale={ru}
                    />
                </div>
                <div className={"grid gap-5 w-full items-center justify-items-center"}>
                    <SkeletonCondition condition={!ChartsStore.isFetched || ChartsStore.isLoading} skeleton={
                        <Skeleton count={2} height={250} width={"100%"} containerClassName={"w-full grid"}/>
                    }>
                        {() => (
                            ChartsStore.loadingError ?
                                <Typography variant={"h3"} className={"text-center"}>Произошла ошибка при получении
                                    данных</Typography> :
                                Object.entries(ChartsStore.indicationWithChartData).length > 0 ?
                                    Object.entries(ChartsStore.indicationWithChartData).map(([indicationName, indication]) => {
                                        if (!indication.chart?.data) return false

                                        return (<ChartItem indication={indication} key={indicationName}/>)
                                    }) :
                                    <Typography variant={"h3"}>Нет графиков</Typography>
                        )}
                    </SkeletonCondition>
                </div>
            </div>
        </div>
    )
})

export default Charts