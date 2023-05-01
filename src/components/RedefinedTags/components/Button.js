export const PRIMARY = "primary"
export const WHITE = "white"

export default function Button(
    {
        icon = "",
        children,
        classes = "",
        type = PRIMARY,
        iconClasses = "",
        numNotify = 0,
        onClick = null,
    }) {

    let Icon = icon

    switch (type) {
        case WHITE:
            classes += " bg-white hover:bg-gray-100 shadow-lg px-5"
            iconClasses += " fill-black "
            break;
        default:
            classes += " bg-primary hover:bg-primary-600 text-white "
            iconClasses += " fill-white "
            break;
    }

    return (
        <button onClick={onClick} className={classes + " p-3 gap-2 rounded-xl transition" +
            " flex flex-wrap justify-center items-center"
        }>
            {icon && <Icon className={iconClasses}/>}
            {children || ""}
            {numNotify > 0 && <div className={"bg-danger text-white px-[10px] py-[2px] rounded-full"}>{numNotify}</div>}
        </button>
    )
}