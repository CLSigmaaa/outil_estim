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

import { Sprint } from "@/app/model/projet"
import { useTreeStore } from "../store/useTreeStore"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"


export default function BurnDown({ className }: { className: string }) {

    const { selectedItem, getItemData } = useTreeStore();

    const dataDict = getItemData(selectedItem as Sprint);
    const [isBurnUpDisplayed, setIsDown] = React.useState(false)
    const chartData = isBurnUpDisplayed ? dataDict.burn.up : dataDict.burn.down

    const switchBurnGraph = (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsDown((prev) => !prev)
    }

    const chartConfig = {
        desktop: {
            label: "date",
            color: "hsl(var(--chart-1))",
            icon: Activity,
        },
    } satisfies ChartConfig

    return (
        <Card className={className}>
            <CardHeader className="flex flex-row justify-between ">
                <CardTitle>{isBurnUpDisplayed ? "Burn Up" : "Burn Down"}</CardTitle>
                <div className="flex items-center gap-2">
                    <Switch onClick={switchBurnGraph} />
                    <Label> Burn Down / Burn Up </Label>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="max-h-[400px]">
                    <LineChart
                        accessibilityLayer
                        data={chartData as any}
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
                            dataKey="pointsRestants"
                            name="Points restants"
                            type="stepAfter"
                            stroke="green"
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}


