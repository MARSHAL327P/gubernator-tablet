import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getIndexLinkInArray(link, array){
    let index = array.findIndex(item => item.link === link)
    return index === -1 ? 0 : index
}

export function getUpdateTimeText(updateTime){
    dayjs.extend(relativeTime)
    return capitalizeFirstLetter(dayjs(updateTime).locale("ru").fromNow())
}