import {observer} from "mobx-react-lite";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import Skeleton from "react-loading-skeleton";
import {useEffect, useState} from "react";
import cc from "classcat";
import {useLocation} from "react-router-dom";

const MasonryGallery = observer(({card}) => {
    let [countLoadedImages, setCountLoadedImages] = useState(0)
    let location = useLocation();

    useEffect(() => {
        setCountLoadedImages(0)
    }, [location])

    return (
        <>
            <Skeleton count={6} inline={true} height={200} containerClassName={cc(["grid grid-cols-3 gap-2", {
                "hidden": countLoadedImages === card?.img.length,
            }])}/>
            {
                card &&
                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}} className={cc({
                    "hidden": countLoadedImages !== card.img.length
                })}>
                    <Masonry gutter={"10px"}>
                        {
                            card.img.map((imgItem, idx) => {
                                return (
                                    <a
                                        key={idx}
                                        href={imgItem}
                                        data-fancybox={`masonry-gallery-${card.id}`}
                                        className={"overflow-hidden rounded-md"}
                                    >
                                        <img
                                            src={imgItem}
                                            alt=""
                                            className="h-full w-full object-cover rounded-md hover:scale-110 transition"
                                            onLoad={() => {
                                                setCountLoadedImages(prev => prev + 1)
                                            }}
                                        />
                                    </a>
                                )
                            })
                        }
                    </Masonry>
                </ResponsiveMasonry>

            }
        </>

    )
})

export default MasonryGallery