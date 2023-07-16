import {observer} from "mobx-react-lite";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import BeachCardProps from "./BeachCardProps";
import Indications from "../../Indications/components/Indications";
import cc from "classcat";
import {Fancybox} from "@fancyapps/ui";
import MasonryGallery from "../../MasonryGallery/components/MasonryGallery";
import BathingComfort from "./BathingComfort";
import IndicationsStore from "../../Indications/store/indications.store";
import parse from "html-react-parser";

const BeachInfo = observer(() => {
    let card = SelectedClassInfoStore.currentClass.card
    let styles = {
        block: "p-7 shadow-lg rounded-xl flex flex-col gap-5",
        title: "text-2xl font-bold",
        bathingComfort: "flex gap-2 items-center"
    }
    let temperatureTextValues = [
        {
            lessThan: 17,
            text: "холодная"
        },
        {
            lessThan: 20,
            text: "прохладная"
        },
        {
            lessThan: 25,
            text: "тепловатая"
        },
        {
            lessThan: 27,
            text: "теплая"
        }
    ]
    let temperatureText =
        temperatureTextValues
            .find((item) => item.lessThan > card.indications.t_surf)
            .text

    let bathingComfortIndications = [
        {
            indication: IndicationsStore.indications.Honf,
            text: parse(`Средняя высота 10% значительных волн <span class="font-bold">${card.indications.Honf} м.</span>`)
        },
        {
            indication: IndicationsStore.indications.t_surf,
            text: parse(`Вода <span class="font-bold">${temperatureText}</span>`)
        },
        {
            indication: IndicationsStore.indications.turbidity,
            text: parse(`Мутность воды: <span class='font-bold'>${IndicationsStore.indications.turbidity.alias[card.indications.turbidity]}</span>`)
        }
    ]

    Fancybox.bind("[data-fancybox]");

    return (
        <div className={"flex gap-7 flex-wrap"}>
            <div className={"flex flex-col gap-7 flex-1 lg:flex-auto lg:w-full"}>
                <div className={styles.block}>
                    <div className={styles.title}>
                        Описание
                    </div>
                    <div>
                        {card.description}
                    </div>
                    <div className="flex gap-1">
                        <BeachCardProps cardProps={card.props} classes={"bg-primary text-white"}/>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-7">
                    <div className={styles.block}>
                        <div className={styles.title}>
                            Текущие показатели
                        </div>
                        <div>
                            <Indications
                                data={card.indications}
                            />
                        </div>
                    </div>
                    <div className={styles.block}>
                        <div className={styles.title}>
                            Комфортность купания
                        </div>
                        <div className={"flex flex-col gap-4"}>
                            <BathingComfort rounded={true} bathingComfort={card.bathingComfort} isOpen={card.isOpen}/>
                            {
                                bathingComfortIndications.map((item, idx) => {
                                    return (
                                        <div key={idx} className={styles.bathingComfort}>
                                            <Indications
                                                data={card.indications}
                                                indications={[item.indication]}
                                            />
                                            <div>
                                                {item.text}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={cc([styles.block, "flex-1"])}>
                <div className={styles.title}>
                    Фотографии
                </div>
                <MasonryGallery imgs={card.img} id={card.id}/>
            </div>
        </div>
    )
})

export default BeachInfo