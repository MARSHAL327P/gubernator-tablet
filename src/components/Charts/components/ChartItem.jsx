import {observer} from "mobx-react-lite";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Typography} from "@material-tailwind/react";
import cc from "classcat";

const ChartItem = observer(({indication}) => {
    let Icon = indication.icon
    let chartValues = indication.chartData.map(item => item[indication.name])
    let chartScale = [
        Math.floor(Math.min(...chartValues)),
        Math.floor(Math.max(...chartValues)) + 1.5
    ]

    return (
        <>
            {
                indication.chartData.length > 0 ?
                    <div className={"grid gap-5 w-full h-[550px]"}>
                        <div className={"flex gap-2 items-center w-full bg-white rounded-xl shadow-lg p-5 justify-center"}>
                            <Icon className={cc([indication.color, ""])}/>
                            {indication.name}
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                width={730}
                                height={250}
                                data={indication.chartData}
                                margin={{right: 10, top: 10}}
                                syncId="sync_charts"
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis axisLine={false} dataKey="date"/>
                                <YAxis tickLine={false} domain={chartScale} tickCount={8} axisLine={false}/>
                                <Tooltip />
                                <Legend/>
                                <Line type="monotone" dataKey={indication.name} stroke="#3366FF" dot={false}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    :
                    <Typography variant={"h3"}>Нет данных по показателю «{indication.name}»</Typography>
            }
        </>
    )
})

export default ChartItem