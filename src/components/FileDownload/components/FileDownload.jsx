import {observer} from "mobx-react-lite";
import FileDownloadStore from "../store/fileDownload.store";
import {toJS} from "mobx";
import {Button} from "@material-tailwind/react";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";

const FileDownload = observer(({
                                   fileType = FileDownloadStore.fileTypes.excel,
                                   dateRange
                               }) => {
    return (
        <a href={FileDownloadStore.getLink(dateRange)} className={"flex w-fit mb-5"}>
            <Button color={"white"}>
                {fileType.icon}
                Скачать выгрузку
            </Button>
        </a>
    )
})

export default FileDownload