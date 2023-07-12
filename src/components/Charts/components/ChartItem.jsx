import {observer} from "mobx-react-lite";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Typography} from "@material-tailwind/react";

const ChartItem = observer(({data}) => {
    console.log(data)

    return (
        <>
            {
                data.length > 0 ?
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={730}
                            height={250}
                            data={data}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip />
                            <Legend/>
                            <Line type="monotone" dataKey="value" stroke="#8884d8"/>
                        </LineChart>
                    </ResponsiveContainer>
                    :
                    <Typography variant={"h3"}>Нет данных</Typography>
            }
        </>
    )
})

export default ChartItem