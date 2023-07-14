import {makeAutoObservable} from "mobx";
import {addDays, format} from "date-fns";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import IndicationsStore from "../../Indications/store/indications.store";
import axios from "axios";

class ChartsStore {
    selectedDateRanges = [
        {
            startDate: addDays(new Date(), -1),
            endDate: new Date(),
            key: 'selection'
        }
    ]
    isLoading = false
    indicationWithChartData = {}

    fetchData(realObjectIndicationData){
        let requests = []
        let fetchedIndicationNames = []
        let chartIndications = {}

        realObjectIndicationData.forEach((indicationName) => {
            let indication = IndicationsStore.indications[indicationName]

            if( !(indication && indication.oldName) )
                return false

            chartIndications[indicationName] = indication

            fetchedIndicationNames.push(indicationName)
            let url = `${process.env.REACT_APP_CHARTS}/${SelectedClassInfoStore.currentClass.card.id}/${indication.oldName}`
            let dateRange = {
                start: format(this.selectedDateRanges[0].startDate, "yyyy-MM-dd"),
                end: format(this.selectedDateRanges[0].endDate, "yyyy-MM-dd"),
            }

            requests.push(axios.get(url, { params: dateRange }))
        })

        this.isLoading = true

        Promise.all(requests)
            .then((data) => {
                this.indicationWithChartData = chartIndications

                data.forEach((item, idx) => {
                    let indicationName = fetchedIndicationNames[idx]
                    let indicationData = this.indicationWithChartData[indicationName]

                    indicationData.chart = {
                        data: [],
                        hide: false
                    }
                    indicationData.chart.data =
                        item.data.map(chartItem => ({
                            date: format(new Date(chartItem.date), "dd.MM.yyyy HH:mm"),
                            [indicationData.name]: chartItem.value
                        }))
                })

                this.isLoading = false
        })
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default ChartsStore = new ChartsStore()