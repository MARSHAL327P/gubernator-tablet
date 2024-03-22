import {observer} from "mobx-react-lite";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {Typography} from "@material-tailwind/react";
import {runInAction} from "mobx";
import UiStore from "../../../stores/ui.store";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        let initialData = payload[0].payload

        return (
            <div className="p-3 rounded-xl shadow-lg border border-gray-300 bg-white">
                <p>
                    {initialData.dateFull}
                </p>
                <p className={"text-primary"}>
                    {initialData.indicationName}: {payload[0].value}{initialData.indicationUnits}
                </p>
            </div>
        );
    }

    return null;
};

const ChartItem = observer(({indication}) => {
    const gradientOffset = () => {
        const dataMax = Math.max(...indication.chart.data.map((i) => i[indication.name]));
        const dataMin = Math.min(...indication.chart.data.map((i) => i[indication.name]));

        if (dataMax <= indication.pdk || !indication.pdk) {
            return 0;
        }

        if ((dataMin >= indication.pdk) ) {
            return 1;
        }

        return 1 - (indication.pdk / dataMax);
    };

    const off = gradientOffset();
    const svgColorName = indication.id + "-color"
    const Icon = indication.icon
    const chartValues = indication.chart.data.map(item => item[indication.name])
    const chartScale = [
        Math.floor(Math.min(...chartValues)),
        Math.floor(Math.max(...chartValues)) + 1.5
    ]


    return (
        indication.chart.data.length > 0 ?
            <>
                <div id={indication.indicationName} className={"grid gap-5 w-full h-[350px]"}>
                    {/*<div className={"flex gap-2 items-center w-full bg-white rounded-xl shadow-lg p-5 justify-center"}>*/}
                    {/*    <Icon className={cc([indication.color, ""])}/>*/}
                    {/*    {indication.name}*/}
                    {/*</div>*/}
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            width={730}
                            height={250}
                            data={indication.chart.data}
                            margin={{right: 10, top: 10}}
                            syncId="sync_charts"
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis minTickGap={20} axisLine={false} dataKey="dateX" tickMargin={10} />
                            <YAxis tickLine={false} tickCount={12}
                                   domain={!indication.chart.hide && indication.chartDomain}
                                   axisLine={false}/>
                            <Tooltip content={<CustomTooltip/>}/>
                            <Legend verticalAlign="top" height={36} onClick={(legend, e) => {
                                runInAction(() => {
                                    indication.chart.hide = !indication.chart.hide
                                })
                            }}/>
                            <defs>
                                <linearGradient id={svgColorName} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset={off - 0.6} stopColor={UiStore.colors.danger} stopOpacity={1} />
                                    <stop offset={off} stopColor={UiStore.colors.danger} stopOpacity={0.1} />
                                    <stop offset={off} stopColor={UiStore.colors.primary} stopOpacity={1} />
                                    <stop offset={0.95} stopColor={UiStore.colors.primary} stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            {indication.pdk && <ReferenceLine y={indication.pdk} stroke={UiStore.colors.danger} />}
                            <Area fillOpacity={1} type="monotone" hide={indication.chart.hide} dataKey={indication.name}
                                  stroke={UiStore.colors.primary} dot={false} fill={`url(#${svgColorName})`}/>
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </> :
            <Typography variant={"h3"}>Нет данных по показателю «{indication.name}»</Typography>
    )
})

export default ChartItem