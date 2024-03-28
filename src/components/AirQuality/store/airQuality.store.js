import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";

class AirQualityStore {
    realObjectId = 0
    totalRating = 0
    isLoading = false
    indications = {
        "no2": {
            title: `NO<sub>2</sub>`,
            description: "Вдыхание большого количества двуокиси азота повышает риск возникновения респираторных заболеваний. Чаще всего возникает кашель, затрудненное дыхание, а при более продолжительном воздействии появляются более серьезные проблемы, такие как респираторные инфекции",
            open: false,
        },
        "o3": {
            title: "O<sub>3</sub>",
            description: "Приземной слой озона может приводить к обострениям существующих респираторных заболеваний, а также вызывать раздражение кожи, головные боли и боль в груди.",
            open: false,
        },
        "pm10": {
            title: "PM<sub>10</sub>",
            description: "Взвешенные частицы представляют собой вдыхаемые с воздухом частицы загрязняющих веществ диаметром менее 10 микрометров. Частицы размером более 2,5 микрометров могут оседать в дыхательных путях и приводить к проблемам со здоровьем. Воздействие таких частиц может вызывать раздражение глаз и горла, кашель, затруднять дыхание или приводить к обострению астмы. Более частное и продолжительное воздействие может приводить к более серьезным последствиям для здоровья",
            open: false,
        },
        "pm2_5": {
            title: "PM<sub>2.5</sub>",
            description: "Мелкие частицы представляют собой вдыхаемые с воздухом частицы загрязняющих веществ диаметром менее 2,5 микрометров, которые могут попадать в легкие и кровеносную систему и проводить к серьезным проблемам со здоровьем. Наиболее серьезное воздействие оказывается на сердце и легкие Воздействие таких частиц может вызывать кашель, затрудненное дыхание, обострение астмы, а также приводить к развитию хронических респираторных заболеваний.",
            open: false,
        },
        "so2": {
            title: "SO<sub>2</sub>",
            description: "Воздействие диоксида серы может приводить к раздражению горла и глаз, обострению астмы и развитию хронического бронхита.",
            open: false,
        },
        "co": {
            title: "CO",
            description: "Угарный газ представляет собой газ без цвета и запаха, при его вдыхании в больших количествах могут возникать головные боли, тошнота, головокружение и рвота. Многократное длительное воздействие может вызывать сердечные заболевания",
            open: false,
        },
    }
    updateTime = null
    ratingLevels = [
        {
            level: 20,
            open: false,
            title: "Отличный",
            description: "Качество воздуха идеальное для большинства людей; можно проводить время на улице без ограничений",
            color: "bg-[#36E166]"
        },
        {
            level: 50,
            open: false,
            title: "Средний",
            description: "Качество воздуха в целом является приемлемым для большинства людей. Однако у людей с повышенной чувствительностью после длительного нахождения на улице могут появляться симптомы малой и средней тяжести.",
            color: "bg-[#E8EC20]"
        },
        {
            level: 100,
            open: false,
            title: "Плохой",
            description: "Загрязнение воздуха достигло высокого уровня, он является небезопасным для людей с повышенной чувствительностью. Если вы почувствуете затрудненное дыхание или раздражение горла, сократите время пребывания на улице.",
            color: "bg-[#ECBF20]"
        },
        {
            level: 150,
            open: false,
            title: "Вредный",
            description: "Люди с повышенной чувствительностью могут мгновенно почувствовать себя плохо. При продолжительном нахождении на улице здоровые люди могут почувствовать затрудненное дыхание или раздражение горла. Ограничьте пребывание на улице.",
            color: "bg-[#DF2828]"
        },
        {
            level: 250,
            open: false,
            title: "Очень вредный",
            description: "Люди с повышенной чувствительностью могут мгновенно почувствовать себя плохо, им следует избегать пребывания на улице. У здоровых людей могут возникать симптомы затрудненного дыхания или раздражения горла; рекомендуется оставаться в помещении и перенести мероприятия на улице.",
            color: "bg-[#C936E1]"
        },
        {
            level: 300,
            open: false,
            title: "Опасно",
            description: "Любое пребывание на улице, даже в течение нескольких минут, может привести к серьезным осложнениям у всех. Старайтесь не выходить на улицу.",
            color: "bg-[#6236E1]"
        }
    ]

    get currentRatingLevel() {
        return this.ratingLevels.find((ratingLevel) => ratingLevel.level >= this.totalRating)
    }

    sendRequest() {
        this.isLoading = true

        // Эта логика временная, чтобы у каждого пляжа работала вкладка качества воздуха
        Promise.any([
            axios.get(`${process.env.REACT_APP_AIR_QUALITY}/${this.realObjectId}`),
            axios.get(`https://dss.sevsu.ru:8081/api/beaches/air_quality/${this.realObjectId}`)
        ]).then(({data}) => {
            let lastRatingLevelValue = this.ratingLevels[this.ratingLevels.length - 1].level

            if( data.totalRating > lastRatingLevelValue )
                data.totalRating = lastRatingLevelValue

            this.parseAndSaveData(data)
            runInAction(() => {this.isLoading = false})
        });

        // axios.get(`${process.env.REACT_APP_AIR_QUALITY}/${this.realObjectId}`)
        //     .then(({data}) => {
        //         this.parseAndSaveData(data)
        //         runInAction(() => {this.isLoading = false})
        //     })
    }

    parseAndSaveData(data){
        for (const indicationName in data.indications) {
            let indication = data.indications[indicationName]
            let ratingLevel = this.ratingLevels.find((ratingLevel) => ratingLevel.level >= indication.level)

            if( !ratingLevel )
                ratingLevel = this.ratingLevels[this.ratingLevels.length - 1]

            this.indications[indicationName] = {
                ...indication,
                ...this.indications[indicationName],
                color: ratingLevel.color,
                levelTooltip: ratingLevel.title
            }
        }

        this.updateTime = data.updateTime
        this.totalRating = data.totalRating
    }

    constructor(realObjectId) {
        makeAutoObservable(this);

        this.realObjectId = realObjectId
        this.sendRequest()
    }
}

export default AirQualityStore