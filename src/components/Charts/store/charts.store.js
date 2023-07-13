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
    indicationWithChartData = IndicationsStore.indications

    fetchData(realObjectIndicationData){
        let requests = []
        let fetchedIndicationNames = []

        Object.entries(IndicationsStore.indications).forEach(([indicationName, indication]) => {
            // console.log(indication.oldName && !realObjectIndicationData.includes(indicationName))
            if( !indication.oldName  )
                return false

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
                data.forEach((item, idx) => {
                    let indicationName = fetchedIndicationNames[idx]
                    let indicationData = this.indicationWithChartData[indicationName]

                    indicationData.chartData = []
                    indicationData.chartData =
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