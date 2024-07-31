"use client"

import { Projet } from "@/app/model/projet";
import { useTreeStore } from "@/store/useTreeStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartTooltip } from "@/components/ui/chart";
import { Activity } from "lucide-react";
import { XAxis, YAxis, CartesianGrid, Bar, BarChart } from "recharts";

export default function ProjectStats() {

    const { project, getAllSprintsStats } = useTreeStore();

    function getProjectVelocity(project: Projet): { sprintName: string, sprintPoints: number }[] {
        const sprintsData = getAllSprintsStats(project);
        const res = sprintsData.map(data => ({ sprintName: data.sprintName, sprintPoints: data.sprintData.donePoints }))
        return res;
    }
    const chartData = getProjectVelocity(project);


    const chartConfig = {
        desktop: {
            label: "sprintName",
            color: "hsl(var(--chart-1))",
            icon: Activity,
        },
    } satisfies ChartConfig

    return (
        <Card >
            <CardHeader className="flex flex-row justify-between ">
                <CardTitle>TITRE</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="max-h-[400px]">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        dataKey={"sprintName"}

                    >
                        <XAxis dataKey="sprintName" />
                        <YAxis domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.1 / 10) * 10]} //   10% de marge 
                            tickCount={10} />
                        <ChartLegend />
                        <CartesianGrid vertical={false} />
                        <ChartTooltip />
                        <Bar
                            dataKey="sprintPoints"
                            maxBarSize={5}
                            name="Vélocité"
                            fill="green"
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
