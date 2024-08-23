"use client"

import React from "react"

import { Activity } from "lucide-react"
import { LineChart, CartesianGrid, XAxis, YAxis, Line } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartTooltip,
} from "@/components/ui/chart"

import { Estimation, Task } from "@/app/model/projet"

import { useTranslation } from "react-i18next"

export default function BurnUp({ task }: { task: Task }) {
    const { t } = useTranslation();

    const [burnUpData, setBurnUpData] = React.useState([{}]);
    
    React.useEffect(() => {
        var data = task.estimationList.map((estim) => {
            return {
                date: `${String(estim.date.getDate()).padStart(2, '0')}/${String(estim.date.getMonth() + 1).padStart(2, '0')}`,
                workScope: estim.consommee + estim.resteAFaire,
                consommee: estim.consommee,
            }
        });
        setBurnUpData([...data, data[data.length - 1]]);
    }, [task]);

   
    const chartConfig = {
        desktop: {
            label: "date",
            color: "hsl(var(--chart-1))",
            icon: Activity,
        },
    } satisfies ChartConfig

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row justify-between">
                <CardTitle className="text-lg font-normal">{"Burn Up"}</CardTitle>
                
            </CardHeader>
            <CardContent className="font-bold text-2xl">
                <ChartContainer config={chartConfig} className="max-h-[400px]">
                    <LineChart
                        accessibilityLayer
                        data={burnUpData}
                        dataKey={"date"}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.1 / 10) * 10]} //   10% de marge 
                            tickCount={10} />
                        <ChartLegend />
                        <CartesianGrid vertical={false} />
                        <ChartTooltip />
                        <Line
                            dataKey="consommee"
                            name={t("estimation.consommee")}
                            type="stepAfter"
                            stroke="green"
                            dot={false}
                        />
                        <Line
                            dataKey="workScope"
                            name={t("estimation.resteAFaire")}
                            type="stepAfter"
                            stroke="red"
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}


