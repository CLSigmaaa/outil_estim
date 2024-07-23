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
import Kanban from './kanban/Kanban';

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
  const { selectedItem, getSprintStats } = useTreeStore();
  const data = getSprintStats(selectedItem);

  return (
    <BaseDashboardLayout>
      <DashboardRow>
        <DashboardCase title="Kanban" className="w-full">
          <Kanban />
        </DashboardCase>
      </DashboardRow>
      <DashboardRow>
       <BurnDown className='w-full max-h-[500px]'/>
      </DashboardRow>
      <DashboardRow>
        <DashboardCase title="Indice de prédictibilité" className="w-full">
          <span>{(Number(data.donePoints) / Number(data.totalPoints)).toFixed(1)}</span>
          <button onClick={() => console.log(data.donePoints)}> gggg</button>
          <button onClick={() => console.log(data.totalPoints)}> ffff</button>
        </DashboardCase>
        <DashboardCase title="US restantes / US Total" className="w-full">
          <span>
            {data.stateStats[nativeStateEnum.Terminee]} / {data.stateStats[nativeStateEnum.A_Faire] + data.stateStats[nativeStateEnum.En_Cours] + data.stateStats[nativeStateEnum.Terminee]}
          </span>
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
    { priorité: "Critique", Nombre: data.priorityStats.Critique },
    { priorité: "Majeure", Nombre: data.priorityStats.Majeure },
    { priorité: "Mineure", Nombre: data.priorityStats.Mineure },
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
    { état: "A faire", Nombre: data.stateStats[nativeStateEnum.A_Faire] },
    { état: "En cours", Nombre: data.stateStats[nativeStateEnum.En_Cours] },
    { état: "Terminée", Nombre: data.stateStats[nativeStateEnum.Terminee] },
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
  const { selectedItem, getSprintStats } = useTreeStore();
  const data = getSprintStats(selectedItem);

  return (
    <BaseDashboardLayout>
      <DashboardRow>
        <DashboardCase title="Graphique des US" description="" className="w-full">
          <ChartSelect chartDict={chartDict} />
        </DashboardCase>
      </DashboardRow>
      <DashboardRow>
        <DashboardCase title="Indice de prédictibilité" className="w-full">
          <span>{(Number(data.donePoints) / Number(data.totalPoints)).toFixed(1)}</span>
        </DashboardCase>
        <DashboardCase title="US restantes / US Total" className="w-full">
          <span>
            {data.stateStats[nativeStateEnum.Terminee]} / {data.stateStats[nativeStateEnum.A_Faire] + data.stateStats[nativeStateEnum.En_Cours] + data.stateStats[nativeStateEnum.Terminee]}
          </span>
        </DashboardCase>
      </DashboardRow>
    </BaseDashboardLayout>
  )
}
