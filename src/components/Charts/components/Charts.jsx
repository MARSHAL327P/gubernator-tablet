import {observer} from "mobx-react-lite";
import DateRangePicker from "react-date-range/dist/components/DateRangePicker";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {ru} from 'react-date-range/dist/locale';
import {Typography} from "@material-tailwind/react";
import ChartsStore from "../store/charts.store";
import {action} from "mobx";
import {useEffect} from "react";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import Loading from "../../Loading/components/Loading";
import ChartItem from "./ChartItem";
import {useLocation} from "react-router-dom";
import CustomRangeLabels from "../../RedefinedTags/Date/CustomRangeLabels";


const Charts = observer(() => {
    const location = useLocation();

    useEffect(() => {
        ChartsStore.fetchData(Object.keys(SelectedClassInfoStore.currentClass.card.props))
    }, [])

    useEffect(() => {
        ChartsStore.fetchData(Object.keys(SelectedClassInfoStore.currentClass.card.props))
    }, [location])

    // eslint-disable-next-line no-unused-vars
    const data =
        [{"date":"2023-07-04T12:32:32","value":23.82},{"date":"2023-07-04T17:30:06","value":23.81},{"date":"2023-07-04T18:00:03","value":23.58},{"date":"2023-07-04T18:30:03","value":23.94},{"date":"2023-07-04T19:00:02","value":23.98},{"date":"2023-07-04T19:30:03","value":23.51},{"date":"2023-07-04T20:00:03","value":23.88},{"date":"2023-07-04T20:30:03","value":23.95},{"date":"2023-07-04T21:00:02","value":23.75},{"date":"2023-07-04T21:30:02","value":23.54},{"date":"2023-07-04T22:00:02","value":23.81},{"date":"2023-07-04T22:30:02","value":23.83},{"date":"2023-07-04T23:00:03","value":23.84},{"date":"2023-07-04T23:30:02","value":23.94},{"date":"2023-07-05T00:00:05","value":23.8},{"date":"2023-07-05T00:30:02","value":23.74},{"date":"2023-07-05T01:00:03","value":23.94},{"date":"2023-07-05T01:30:02","value":23.5},{"date":"2023-07-05T02:00:03","value":23.6},{"date":"2023-07-05T02:30:02","value":23.63},{"date":"2023-07-05T03:00:02","value":23.94},{"date":"2023-07-05T03:30:02","value":23.7},{"date":"2023-07-05T04:00:02","value":23.65},{"date":"2023-07-05T04:30:02","value":23.91},{"date":"2023-07-05T05:00:02","value":23.81},{"date":"2023-07-05T05:30:02","value":23.51},{"date":"2023-07-05T06:00:03","value":23.57},{"date":"2023-07-05T06:30:02","value":23.82},{"date":"2023-07-05T07:00:03","value":23.53},{"date":"2023-07-05T07:30:03","value":23.68},{"date":"2023-07-05T08:00:03","value":23.98},{"date":"2023-07-05T08:30:02","value":23.91},{"date":"2023-07-05T09:00:03","value":23.88},{"date":"2023-07-05T09:30:03","value":23.5},{"date":"2023-07-05T10:00:02","value":23.89},{"date":"2023-07-05T10:30:02","value":23.86},{"date":"2023-07-05T11:00:02","value":23.61},{"date":"2023-07-05T11:30:02","value":23.73},{"date":"2023-07-05T12:00:02","value":23.7},{"date":"2023-07-05T12:30:02","value":23.84},{"date":"2023-07-05T13:00:03","value":23.64},{"date":"2023-07-05T13:30:03","value":23.56},{"date":"2023-07-05T14:00:03","value":23.85},{"date":"2023-07-05T14:30:02","value":23.93},{"date":"2023-07-05T15:00:03","value":23.58},{"date":"2023-07-05T15:30:03","value":23.96},{"date":"2023-07-05T16:00:02","value":23.95},{"date":"2023-07-05T16:30:03","value":23.96},{"date":"2023-07-05T17:00:02","value":23.75},{"date":"2023-07-05T17:30:02","value":23.57},{"date":"2023-07-05T18:00:02","value":23.89},{"date":"2023-07-05T18:30:02","value":23.73},{"date":"2023-07-05T19:00:03","value":23.79},{"date":"2023-07-05T19:30:02","value":23.92},{"date":"2023-07-05T20:00:02","value":24},{"date":"2023-07-05T20:30:02","value":23.87}]

    return (
        <div className={"flex gap-7 relative"}>
            <div className="bg-white p-6 rounded-xl shadow-lg w-[550px] h-fit">
                <Typography variant={"h4"} className={"mb-5"}>
                    Выбор даты
                </Typography>
                <DateRangePicker
                    className={"w-full"}
                    rangeColors={["#3366FF"]}
                    onChange={
                        action((item) => {
                            ChartsStore.selectedDateRanges = [item.selection]
                            ChartsStore.fetchData(Object.keys(SelectedClassInfoStore.currentClass.card.props))
                        })
                    }
                    renderStaticRangeLabel={<CustomRangeLabels/>}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    ranges={ChartsStore.selectedDateRanges}
                    direction="horizontal"
                    maxDate={new Date()}
                    locale={ru}
                />
            </div>
            <div className={"grid gap-5 w-full items-center justify-items-center"}>
                {
                    ChartsStore.isLoading ?
                        <Loading text={"Загрузка графиков"}/> :
                        Object.entries(ChartsStore.indicationWithChartData).length > 0 ?
                        Object.entries(ChartsStore.indicationWithChartData).map(([indicationName, indication]) => {
                            if( !indication.chart?.data ) return false

                            return (
                                <ChartItem indication={indication} key={indicationName}/>
                            )
                        }) :
                            <Typography variant={"h3"}>Нет графиков</Typography>
                }
            </div>
        </div>
    )
})

export default Charts