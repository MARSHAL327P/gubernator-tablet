import Ripple from "../Ripple/Ripple";

export const PRIMARY = "primary"
export const WHITE = "white"
export const TEXT = "text"

export default function Button(
    {
        icon = "",
        children = null,
        classes = "",
        type = PRIMARY,
        iconClasses = "",
        numNotify = 0,
        onClick = null,
        rounded = "xl",
        size = "md"
    }) {

    let Icon = icon
    let rippleColor = "rgba(255,255,255,0.55)"

    switch (type) {
        case WHITE:
            classes += " bg-white hover:bg-gray-100 shadow-lg"
            iconClasses += " fill-black"
            rippleColor = "rgba(161,161,161,0.69)"
            break;
        case TEXT:
            classes += " hover:bg-gray-100"
            iconClasses += " fill-black"
            rippleColor = "rgba(161,161,161,0.69)"
            break;
        default:
            classes += " bg-primary hover:bg-primary-600 text-white"
            iconClasses += " fill-white"
            break;
    }

    switch (size){
        case "sm":
            classes += " w-[30px] h-[30px] !p-2"
            break;
        default:
    }

    classes += (children === null && icon !== "") ? " px-3" : " px-5" // calculate paddings

    return (
        <button onClick={onClick} className={classes + ` py-3 gap-2 rounded-${rounded} transition` +
            " flex justify-center items-center overflow-hidden relative outline-0"
        }>
            {icon && <Icon className={iconClasses}/>}
            {children || ""}
            {numNotify > 0 && <div className={`bg-danger text-white px-[10px] py-[2px] rounded-full`}>{numNotify}</div>}
            <Ripple color={rippleColor} />
        </button>
    )
}