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

export function declOfNum(number, words) {
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
}