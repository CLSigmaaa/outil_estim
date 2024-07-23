"use client"

import * as React from 'react';

import { Bar, BarChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
} from "@/components/ui/chart"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ChartDictType = {
  [key: string]: JSX.Element;
};

interface Props {
  chartDict: ChartDictType;
}

export const ChartSelect: React.FC<Props> = ({ chartDict }) => {
  const [selectedChart, setSelectedChart] = React.useState<string | null>(null);

  if (Object.keys(chartDict).length === 0) {
    return null;
  }

  const chartLabels = Object.keys(chartDict);
  const chartComponents = Object.values(chartDict);
  const data = Array.from({ length: chartLabels.length }, (_, i) => ({
    name: chartLabels[i],
    value: chartComponents[i],
  }));

  return (
    <div>
      <Select onValueChange={setSelectedChart} defaultValue={selectedChart} value={selectedChart}>
        <SelectTrigger>
          <SelectValue>{selectedChart ?? "Sélectionner un graphique"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {data.map((item, index) => (
              <SelectItem key={index} value={item.name.toString()}>
                <SelectLabel>{item.name}</SelectLabel>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {selectedChart && chartDict[selectedChart]}
    </div>
  )
}
