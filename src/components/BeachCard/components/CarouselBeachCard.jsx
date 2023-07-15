import {observer} from "mobx-react-lite";
import {Carousel, IconButton} from "@material-tailwind/react";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/20/solid";
import {Fancybox} from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import LazyLoad from "react-lazy-load";
import 'react-loading-skeleton/dist/skeleton.css'


function carouselNavigation({setActiveIndex, activeIndex, length}) {
    return (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
                <span
                    key={i}
                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                        activeIndex === i ? "bg-white w-8" : "bg-white/50 w-4"
                    }`}
                    onClick={() => setActiveIndex(i)}
                />
            ))}
        </div>
    )
}

const CarouselBeachCard = observer(({imgs, cardId}) => {
    Fancybox.bind("[data-fancybox]");

    return (
        <>
            <Carousel
                className="mt-2 h-[220px] md:h-[160px] overflow-hidden"
                navigation={carouselNavigation}
                prevArrow={({handlePrev}) => (
                    <IconButton
                        variant="text"
                        color="white"
                        size="lg"
                        onClick={handlePrev}
                        className="!absolute top-2/4 -translate-y-2/4 left-4 hover:bg-gray-100/30"
                    >
                        <ArrowLeftIcon strokeWidth={2} className="w-6 h-6 fill-white"/>
                    </IconButton>
                )}
                nextArrow={({handleNext}) => (
                    <IconButton
                        variant="text"
                        color="white"
                        size="lg"
                        onClick={handleNext}
                        className="!absolute top-2/4 -translate-y-2/4 !right-4 hover:bg-gray-100/30"
                    >
                        <ArrowRightIcon strokeWidth={2} className="w-6 h-6 fill-white"/>
                    </IconButton>
                )}
            >
                {
                    imgs.map((img, idx) => (
                        <div key={cardId + idx}>
                            <a href={img} data-fancybox={`gallery-${cardId}`}>
                                <LazyLoad
                                    debounce={false}
                                    offsetVertical={500}
                                    className="h-full w-full"
                                >
                                    <img
                                        src={img}
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />
                                </LazyLoad>
                            </a>
                        </div>
                    ))
                }
            </Carousel>
        </>
    )
})

export default CarouselBeachCard