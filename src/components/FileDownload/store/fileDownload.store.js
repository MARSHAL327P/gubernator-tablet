import {ReactComponent as Excel} from "../../../assets/icons/Excel.svg";
import {format} from "date-fns";
import axios from "axios";
import {defaultDateFormat} from "../../../Utils";

class FileDownloadStore{
    fileTypes = {
        excel: {
            name: "excel",
            icon: <Excel/>
        }
    }

    getLink(dateRanges){
        let startDate = format(dateRanges.startDate, defaultDateFormat)
        let endDate = format(dateRanges.endDate, defaultDateFormat)

        return `${process.env.REACT_APP_GET_EXCEL}?carid=3209&start_data=${startDate}T00:00:00&end_data=${endDate}T23:59:59`
    }

    // fetchData(dateRanges){
    //     console.log(dateRanges)
    //     axios
    //         .get("http://dss.sevsu.ru:8084/get_data?carid=3207&start_data=2020-05-22T12:00:00&end_data=2020-07-22T12:00:00", {
    //             responseType: 'blob'
    //         })
    //         .then(({data}) => {
    //             const url = window.URL.createObjectURL(new Blob([data]))
    //             console.log(url)
    //         })
    // }
}

export default FileDownloadStore = new FileDownloadStore()