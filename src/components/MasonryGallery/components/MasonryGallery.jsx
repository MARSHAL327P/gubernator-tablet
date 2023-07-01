import {observer} from "mobx-react-lite";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";

const MasonryGallery = observer(({imgs, id}) => {
    return (
        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
            <Masonry gutter={"10px"}>
                {
                    imgs.map((imgItem, idx) => {
                        return (
                            <a
                                key={idx}
                                href={imgItem}
                                data-fancybox={`masonry-gallery-${id}`}
                                className={"overflow-hidden rounded-md"}
                            >
                                <img
                                    src={imgItem}
                                    alt=""
                                    className="h-full w-full object-cover rounded-md hover:scale-110 transition"
                                />
                            </a>
                        )
                    })
                }
            </Masonry>
        </ResponsiveMasonry>
    )
})

export default MasonryGallery