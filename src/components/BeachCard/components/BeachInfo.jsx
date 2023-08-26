import {observer} from "mobx-react-lite";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import BeachCardProps from "./BeachCardProps";
import Indications from "../../Indications/components/Indications";
import cc from "classcat";
import {Fancybox} from "@fancyapps/ui";
import MasonryGallery from "../../MasonryGallery/components/MasonryGallery";
import BathingComfort from "../../BathingComfort/components/BathingComfort";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonCondition from "../../SkeletonCondition/components/SkeletonCondition";
import ReviewForm from "../../Reviews/components/ReviewForm";

const BeachInfo = observer(() => {
    let card = SelectedClassInfoStore.currentClass?.card
    let styles = {
        block: "p-7 shadow-lg rounded-xl flex flex-col gap-5",
        title: "text-2xl font-bold",
    }

    Fancybox.bind("[data-fancybox]");

    return (
        <div className={"flex gap-7 flex-wrap"}>
            <div className={"flex flex-col gap-7 flex-1 xl:flex-auto lg:w-full"}>
                <div className={styles.block}>
                    <div className={styles.title}>
                        Описание
                    </div>
                    <div>
                        <SkeletonCondition condition={!card} skeleton={<Skeleton count={5}/>}>
                            {() => (
                                card.description
                            )}
                        </SkeletonCondition>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        <SkeletonCondition condition={!card} skeleton={
                            <Skeleton width={100} count={3} containerClassName={"flex gap-1"}/>
                        }>
                            {() => (
                                <BeachCardProps cardProps={card.props} classes={"bg-primary text-white"}/>
                            )}
                        </SkeletonCondition>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-7">
                    <div className={styles.block}>
                        <div className={styles.title}>
                            Текущие показатели
                        </div>
                        <div>
                            <SkeletonCondition condition={!card} skeleton={
                                <Skeleton count={6} height={50} inline={true} containerClassName={"grid grid-cols-3 gap-2"}/>
                            }>
                                {() => (
                                    <Indications
                                        data={card.indications}
                                    />
                                )}
                            </SkeletonCondition>
                        </div>
                    </div>
                    <div className={styles.block}>
                        <div className={styles.title}>
                            Комфортность купания
                        </div>
                        <div className={"flex flex-col gap-4"}>
                            <SkeletonCondition condition={!card} skeleton={<Skeleton height={50} count={3}/>}>
                                {() => (
                                    <BathingComfort
                                        rounded={true}
                                        bathingComfort={card.bathingComfort}
                                        isOpen={card.isOpen}
                                        showDescription={true}
                                        cardIndications={card.indications}
                                    />
                                )}
                            </SkeletonCondition>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cc([styles.block, "flex-1"])}>
                <div className={styles.title}>
                    Фотографии
                </div>
                <MasonryGallery card={card} />
            </div>
        </div>
    )
})

export default BeachInfo