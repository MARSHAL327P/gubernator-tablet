import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const defaultDateFormat = "yyyy-MM-dd"

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

export function arrDiff(arr1, arr2){
    return arr1.filter(function(i) {return arr2.indexOf(i) < 0;});
}

export function toPage(link, navigate) {
    let url = new URL(window.location.href)
    let urlTo = new URL(`${window.location.origin}${link}`)

    for (let searchParam of url.searchParams)
        if( !urlTo.searchParams.get(searchParam[0]) )
            urlTo.searchParams.set(searchParam[0], searchParam[1])

    navigate(urlTo.pathname + urlTo.search)
}