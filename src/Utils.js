export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function getIndexLinkInArray(link, array){
    let index = array.findIndex(item => item.link === link)
    return index === -1 ? 0 : index
}