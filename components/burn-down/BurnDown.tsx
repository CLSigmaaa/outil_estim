"use client"

import { Activity, TrendingUp } from "lucide-react"
import { Area, LineChart, Bar, CartesianGrid, XAxis, YAxis, Line } from "recharts"
import { differenceInDays, addDays, format } from "date-fns"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { EnsembleUS, Item, Sprint, US } from "@/app/model/projet"
import { nativeItemTypeEnum, nativePriorityEnum, nativeStateEnum } from "@/app/model/projet/itemEnum"
import { useTreeStore } from "../store/useTreeStore"
import React from "react"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"


export default function BurnDown() {

    type Sprint_Data = {
        burn: BurnCharts,
        totalPoints: number,
        usState: US_States,
        usPriority: US_Priorities
    }

    type BurnCharts = {
            up: {
                date: string,
                pointsRestants: number
            };
            down: {
                date: string,
                pointsRestants: number
            };
    }

    type US_States = {
        [nativeStateEnum.Terminee]: number;
        [nativeStateEnum.En_Cours]: number;
        [nativeStateEnum.A_Faire]: number;
    };

    type US_Priorities = {
        [nativePriorityEnum.Mineure]: number;
        [nativePriorityEnum.Majeure]: number;
        [nativePriorityEnum.Critique]: number;
    };
    const { selectedItem } = useTreeStore();

    function getTimeData(sprint: Sprint) {
        const startDate = sprint.datesEffectives.from
        const sprintPeriod = differenceInDays(sprint.datesEffectives.to, startDate);
        var chartData: any = {};
        for (let dayNb = 0; dayNb <= sprintPeriod + 1; dayNb++) { // +1 pour le graphique
            chartData[format(addDays(new Date(startDate), dayNb), 'MMM-dd')] = 0
        }
        return chartData;
    }

    function getPointData(chartData: any, item: Sprint | EnsembleUS): any {
        var acc = 0;
        item.children?.forEach(child => {
            if (child.type == nativeItemTypeEnum.US && (child as US).statut == nativeStateEnum.Terminee) {
                chartData[format((child as US).datesEffectives.to, "MMM-dd")] += (child as US).estimation;
            } else if (child.type == nativeItemTypeEnum.Ensemble && child.children && child.children.length > 0) {
                chartData = getPointData(chartData, child);
            }
        });
        return chartData;
    }

    function getSprintStats(sprint: Sprint): { points: number, 
        usStates: US_States, usPriorities: US_Priorities
     } {
        return getSprintPointsAndCompletedAux(sprint.children, { points: 0, 
            usStates: {[nativeStateEnum.Terminee]: 0, [nativeStateEnum.En_Cours]: 0, [nativeStateEnum.A_Faire]: 0 },
            usPriorities: {[nativePriorityEnum.Mineure]: 0, [nativePriorityEnum.Majeure]: 0, [nativePriorityEnum.Critique]: 0 }
         });
    }

    function getSprintPointsAndCompletedAux(itemList: Item[], acc: { points: number, usStates: US_States, usPriorities: US_Priorities }): 
    { points: number, usStates:  US_States, usPriorities: US_Priorities} {
        itemList.forEach((currChild: Item) => {
            if (currChild.type == nativeItemTypeEnum.US) {
                acc.points += ((currChild as US).estimation || 0);
                acc.usStates[(currChild as US).statut]++;
                acc.usPriorities[(currChild as US).priorite]++;
                
            } else if (currChild.type == nativeItemTypeEnum.Ensemble && currChild.children && currChild.children.length > 0) {
                acc = getSprintPointsAndCompletedAux(currChild.children, acc);
            }
        });
        return acc
    }

    function getBurnUpAndDown(data: any, totalPoints: number): any {
        var acc = 0;
        var burn: { up: any[], down: any[] } = { up: [{}], down: [{}] }
        Object.keys(data).forEach(date => {
            acc += parseInt(data[date] || 0);

            burn.up.push({
                date: date,
                pointsRestants: acc
            });
            burn.down.push({
                date: date,
                pointsRestants: totalPoints - acc
            });
        })
        return burn;
    }

    function getItemData(item: Item): { burn: BurnCharts, usState:  US_States } {
        var dataDict: Sprint_Data = 
        {
            burn: { up: {date: "", pointsRestants: 0}, down: {date: "", pointsRestants: 0} }, totalPoints: 0,
            usState: {[nativeStateEnum.Terminee]: 0, [nativeStateEnum.En_Cours]: 0, [nativeStateEnum.A_Faire]: 0 },
            usPriority: {[nativePriorityEnum.Mineure]: 0, [nativePriorityEnum.Majeure]: 0, [nativePriorityEnum.Critique]: 0 }
        };
        const sprintStats = getSprintStats(selectedItem);
        dataDict.totalPoints = sprintStats.points;
        dataDict.usState = sprintStats.usStates;
        dataDict.usPriority = sprintStats.usPriorities
        if (item.type == nativeItemTypeEnum.Sprint) {
            var data = getPointData(getTimeData(selectedItem), selectedItem);
            dataDict.burn = getBurnUpAndDown(data, dataDict.totalPoints)
        }

        return dataDict;
    }

    const dataDict = getItemData(selectedItem);
    // const [chartData, setChartData] = React.useState(dataDict.burn.down);
    const [isBurnUpDisplayed, setIsDown] = React.useState(false)
    const chartData = isBurnUpDisplayed ? dataDict.burn.up : dataDict.burn.down
    function switchBurnGraph(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
        // setChartData(e.target.ariaChecked == "true" ? dataDict.burn.down : dataDict.burn.up)
        setIsDown(!isBurnUpDisplayed)
    }

    const chartConfig = {
        desktop: {
            label: "date",
            color: "hsl(var(--chart-1))",
            icon: Activity,
        },
    } satisfies ChartConfig
    return (
        <>
            <Switch onClick={switchBurnGraph} />
            <Label> Burn Down / Burn Up</Label>
            <Card>
                <CardHeader>
                    <CardTitle>{isBurnUpDisplayed ? "Burn Up" : "Burn Down"}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
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
                            <ChartTooltip
                            // cursor={false}
                            // content={<ChartTooltipContent hideLabel />}
                            />
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
        </>
    )
}


