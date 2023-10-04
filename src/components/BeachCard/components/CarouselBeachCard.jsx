import {observer} from "mobx-react-lite";
import {Carousel, IconButton} from "@material-tailwind/react";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/20/solid";
import {Fancybox} from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import LazyLoad from "react-lazy-load";
import 'react-loading-skeleton/dist/skeleton.css'
import {Swiper, SwiperSlide, useSwiper} from "swiper/react";
import {Pagination, Navigation} from "swiper/modules";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import cc from "classcat";
import {useState} from "react";


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

function ArrowElement({icon, btnType, classes = ""}) {
    const swiper = useSwiper();
    let Icon = icon

    return (
        <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={() => btnType === "left" ? swiper.slidePrev() : swiper.slideNext()}
            className={cc(["!absolute top-2/4 -translate-y-2/4 hover:bg-gray-100/30 z-10", classes])}
        >
            <Icon strokeWidth={2} className="w-6 h-6 fill-white"/>
        </IconButton>
    )
}

const CarouselBeachCard = observer(({imgs, cardId}) => {
    Fancybox.bind("[data-fancybox]");

    return (
        <>
            <Swiper
                className={"mt-2 h-[220px] md:h-[200px] relative"}
                modules={[Pagination, Navigation]}
                pagination={true}
                style={{
                    "--swiper-pagination-color": "#fff",
                    "--swiper-pagination-bullet-inactive-color": "#fff",
                    "--swiper-pagination-bullet-inactive-opacity": ".5",
                    "--swiper-pagination-bullet-size": "10px",
                    "--swiper-pagination-bullet-horizontal-gap": "4px",
                    "--swiper-pagination-bullet-width": "16px",
                    "--swiper-pagination-bullet-height": "4px",
                }}
            >
                {
                    imgs.map((img, idx) => (

                        <SwiperSlide key={idx}>
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
                        </SwiperSlide>
                    ))
                }
                <ArrowElement icon={ArrowRightIcon} btnType={"right"} classes={"right-4"}/>
                <ArrowElement icon={ArrowLeftIcon} btnType={"left"} classes={"left-4"}/>
            </Swiper>
        </>
    )
})

export default CarouselBeachCard