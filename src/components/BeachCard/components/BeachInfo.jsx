import {observer} from "mobx-react-lite";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import BeachCardProps from "./BeachCardProps";
import Indications from "../../Indications/components/Indications";
import cc from "classcat";
import {Fancybox} from "@fancyapps/ui";
import MasonryGallery from "../../MasonryGallery/components/MasonryGallery";
import BathingComfort from "./BathingComfort";
import IndicationsStore from "../../Indications/store/indications.store";

const BeachInfo = observer(() => {
    let card = SelectedClassInfoStore.currentClass.card
    let styles = {
        block: "p-7 shadow-lg rounded-xl flex flex-col gap-5",
        title: "text-2xl font-bold",
        bathingComfort: "flex gap-2 items-center"
    }

    Fancybox.bind("[data-fancybox]");
    console.log(card.img)

    return (
        <div className={"flex gap-7"}>
            <div className={"flex flex-col gap-7 w-[50%]"}>
                <div className={styles.block}>
                    <div className={styles.title}>
                        Описание
                    </div>
                    <div>
                        {card.description}
                    </div>
                    <div className="flex gap-1">
                        <BeachCardProps cardProps={card.props} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-7">
                    <div className={styles.block}>
                        <div className={styles.title}>
                            Текущие показатели
                        </div>
                        <div>
                            <Indications
                                data={card.indications}
                                fixedValue={true}
                            />
                        </div>
                    </div>
                    <div className={styles.block}>
                        <div className={styles.title}>
                            Комфортность купания
                        </div>
                        <div className={"flex flex-col gap-4"}>
                            <BathingComfort classes={"rounded-xl shadow-lg"} bathingComfort={card.bathingComfort}/>
                            <div className={styles.bathingComfort}>
                                <Indications
                                    data={card.indications}
                                    indications={[IndicationsStore.indicationTypes.HONF]}
                                    fixedValue={true}
                                />
                                Средняя высота 10% значительных волн {card.Honf} м.
                            </div>
                            <div className={styles.bathingComfort}>
                                <Indications
                                    data={card.indications}
                                    indications={[IndicationsStore.indicationTypes.WATER_TEMP]}
                                    fixedValue={true}
                                />
                                Температура воды тепловатая
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cc([styles.block, "w-[50%]"])}>
                <div className={styles.title}>
                    Фотографии
                </div>
                <MasonryGallery imgs={card.img} id={card.id} />
            </div>
            {/*<div className={"w-[25%]"}>*/}
            {/*    <div className={styles.title}>*/}
            {/*        Последние отзывы*/}
            {/*    </div>*/}
            {/*    <div></div>*/}
            {/*</div>*/}
        </div>


    )
})

export default BeachInfo