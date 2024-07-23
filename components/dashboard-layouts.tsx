"use client"
import * as React from 'react';
import { DashboardRow, DashboardCase, BaseDashboardLayout, chartData, chartConfig, PlaceholderChart } from '@/components/dynamic-dashboard';
import BurnDown from './burn-down/BurnDown';
import { ChartSelect } from '@/components/chart-select';

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"

import { useTreeStore } from "@/components/store/useTreeStore"
import { nativeEnum } from 'zod';
import { nativeStateEnum } from '@/app/model/projet/itemEnum';

export const DashboardUSLayout: React.FC = () => {
  return (
    <BaseDashboardLayout>
      <DashboardRow>
        <DashboardCase title="User stories" className="w-full">
          <PlaceholderChart chartConfig={chartConfig} chartData={chartData} />
        </DashboardCase>
        <DashboardCase title="User stories" className="w-full">
          <PlaceholderChart chartConfig={chartConfig} chartData={chartData} />
        </DashboardCase>
      </DashboardRow>
      <DashboardRow className="w-full">
        <DashboardCase title="User stories" className='w-full'>
          <span>test</span>
        </DashboardCase>
        <DashboardCase title="User stories" className='w-full'>
          <span>test</span>
        </DashboardCase>
        <DashboardCase title="User stories" className='w-full'>
          <span>test</span>
        </DashboardCase>
        <DashboardCase title="User stories" className='w-full'>
          <span>test</span>
        </DashboardCase>
      </DashboardRow>
    </BaseDashboardLayout>
  )
}

export const DashboardSprintLayout: React.FC = () => {
  return (
    <BaseDashboardLayout>
      <DashboardRow>
        <DashboardCase title="Sprint" className="w-full">
          <BurnDown />
        </DashboardCase>
      </DashboardRow>
    </BaseDashboardLayout>
  )
}

type ChartDictType = {
  [key: string]: JSX.Element;
};

const BarChartByPriority: React.FC = () => {
  const { selectedItem, getSprintStats } = useTreeStore();

  if (selectedItem === null || selectedItem === undefined) return null;
  if (selectedItem.type !== "Ensemble") return null;

  const data = getSprintStats(selectedItem);

  const newChartData = [
    { priorité: "Critique", Nombre: data.usPriorities.Critique },
    { priorité: "Majeure", Nombre: data.usPriorities.Majeure },
    { priorité: "Mineure", Nombre: data.usPriorities.Mineure },
  ]
  return (

    <ChartContainer config={chartConfig} className="h-full w-full mt-6">
      <BarChart data={newChartData}>
        <XAxis dataKey="priorité" />
        <YAxis />
        <Bar dataKey="Nombre" fill="#2563eb" />
        <ChartTooltip />
        <ChartLegend />
      </BarChart>
    </ChartContainer>
  )
}

const BarChartByState: React.FC = () => {
  const { selectedItem, getSprintStats } = useTreeStore();

  if (selectedItem === null || selectedItem === undefined) return null;
  if (selectedItem.type !== "Ensemble") return null;

  const data = getSprintStats(selectedItem);

  const newChartData = [
    { état: "A faire", Nombre: data.usStates[nativeStateEnum.A_Faire] },
    { état: "En cours", Nombre: data.usStates[nativeStateEnum.En_Cours] },
    { état: "Terminée", Nombre: data.usStates[nativeStateEnum.Terminee] },
  ]
  return (
    <ChartContainer config={chartConfig} className="h-full w-full mt-6">
      <BarChart data={newChartData}>
        <XAxis dataKey="état" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="Nombre" fill="#2563eb" />
        <ChartLegend />
      </BarChart>
    </ChartContainer>
  )
}

const chartDict: ChartDictType = {
  "priorité": <BarChartByPriority />,
  "état": <BarChartByState />,
}

export const DashboardEnsembleUSLayout: React.FC = () => {
  return (
    <BaseDashboardLayout>
      <DashboardRow>
        <DashboardCase title="Graphique des US" description="" className="w-full">
          <ChartSelect chartDict={chartDict} />
        </DashboardCase>
      </DashboardRow>
    </BaseDashboardLayout>
  )
}
