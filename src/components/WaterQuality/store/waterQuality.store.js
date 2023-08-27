import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";

class WaterQualityStore {

    ratingLevels = {
        MUDDY: {
            color: "bg-danger",
            title: "Загрязнённая",
            indicationTitle: "Превышение показателя",
        },
        CLEAR: {
            color: "bg-success",
            title: "Чистая",
            indicationTitle: "В норме",
        },
    }
    indications = {
        "petroleumHydrocarbons": {
            title: `Нефтяные углеводороды`,
            description: "Нефтяные углеводороды (углеводороды, образующиеся в результате переработки нефтепродуктов, таких как нефть, бензин или дизельное топливо) являются одними из наиболее часто встречающихся и широко распространенных загрязняющих веществ в окружающей среде. Летучие углеводороды являются более легкой фракцией нефтяных углеводородов и вместе с кислородсодержащими углеводородами топлива чаще всего выделяются из сырой нефти и жидких нефтепродуктов, получаемых из сырой нефти",
            open: false,
        },
        "phenols": {
            title: "Фенолы",
            description: "Фенолы – широко распространенные антропогенные загрязнения. Чрезвычайно опасные органические соединения ароматического ряда губительны для многих микроорганизмов, поэтому промышленные сточные воды с высоким содержанием токсиканта плохо поддаются биологической очистке.",
            open: false,
        },
        "SPAW": {
            title: "Синтетические поверхностно-активные вещества (СПАВ)",
            description: "Синтетические поверхностно-активные вещества или детергенты – вещества, понижающие поверхностное натяжение воды и входящие в состав синтетических моющих средств, широко применяемых в промышленности и в быту. Вместе со сточными водами синтетические поверхностно-активные вещества попадают в материковые воды и далее в морскую среду",
            open: false,
        },
        "fe": {
            title: "Железо",
            description: "Становится причиной развития дерматитов, аллергических реакций, заболеваний печени и почек",
            open: false,
        },
        "hg": {
            title: "Ртуть",
            description: "провоцирует общее отравление организма, которое" +
                " выражается ухудшением памяти, слуха," +
                " нарушением координации. При воздействии паров концентрируется в мозге. Накапливаясь в" +
                " почках, нарушает работу этих органов",
            open: false,
        },
        "mn": {
            title: "Марганец",
            description: "Проникает в канальцы нервных клеток и тем самым препятствует прохождению нервных импульсов",
            open: false,
        },
        "cu": {
            title: "Медь",
            description: "Вызывает язвенную болезнь, гастрит, нарушения работы почек, печени, ЦНС, снижает иммунный ответ организма",
            open: false,
        },
        "zn": {
            title: "Цинк",
            description: "Снижает иммунитет, способен вызвать бесплодие, также является канцерогеном",
            open: false,
        },
    }
    beachId = 0
    totalRating = ""
    isLoading = false
    updateTime = null

    sendRequest() {
        this.isLoading = true

        axios.get(`${process.env.REACT_APP_WATER_QUALITY}/${this.beachId}`)
            .then(({data}) => {
                this.parseAndSaveData(data)
                runInAction(() => {this.isLoading = false})
            })
    }

    parseAndSaveData(data){
        for (const indicationName in data.indications) {
            let indication = data.indications[indicationName]
            let ratingLevel = this.ratingLevels[indication.rating]

            this.indications[indicationName] = {
                ...indication,
                ...this.indications[indicationName],
                color: ratingLevel.color,
                levelTooltip: ratingLevel.indicationTitle
            }
        }

        this.updateTime = data.updateTime
        this.totalRating = this.ratingLevels[data.totalRating]
        console.log(this.totalRating)
    }

    constructor(beachId) {
        makeAutoObservable(this);

        this.beachId = beachId
        this.sendRequest()
    }
}

export default WaterQualityStore