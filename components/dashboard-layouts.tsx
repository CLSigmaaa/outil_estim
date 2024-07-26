"use client"

import * as React from 'react';
import { DashboardRow, DashboardCase, BaseDashboardLayout, chartConfig } from '@/components/dynamic-dashboard';
import BurnDown from './burn-down/BurnDown';
import { ChartSelect } from '@/components/chart-select';

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"

import { useTreeStore } from "@/components/store/useTreeStore"
import { nativeStateEnum } from '@/app/model/projet/itemEnum';
import Kanban from './kanban/Kanban';
import { Sprint_Data } from '@/app/model/projet';

export const DashboardUSLayout: React.FC = () => {
  return (
    <BaseDashboardLayout>
      <span>Panneau à faire</span>
    </BaseDashboardLayout>
  )
}

export const DashboardSprintLayout: React.FC = () => {
  const { selectedItem, getItemData} = useTreeStore();
  const data = getItemData(selectedItem) as Sprint_Data;

  return (
    <BaseDashboardLayout>
      <DashboardRow>
        <DashboardCase title="Kanban" className="w-full p-0">
          <Kanban />
        </DashboardCase>
      </DashboardRow>
      <DashboardRow>
        <BurnDown className='w-full max-h-[510px] p-5' />
      </DashboardRow>
      <DashboardRow>
        <DashboardCase title="Indice de prédictibilité" className="w-full p-5">
          <span className="font-bold text-2xl">{(Number(data.donePoints) / Number(data.totalPoints) || 0).toFixed(2)}</span>
        </DashboardCase>
        <DashboardCase title="US restantes / US Total" className="w-full p-5">
          <span className="font-bold text-2xl">
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
  const { selectedItem, getItemData } = useTreeStore();

  if (selectedItem === null || selectedItem === undefined) return null;
  if (selectedItem.type !== "Ensemble") return null;

  const data = getItemData(selectedItem);

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
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="Nombre" fill="#2563eb" />
        <ChartLegend />
      </BarChart>
    </ChartContainer>
  )
}

const BarChartByState: React.FC = () => {
  const { selectedItem, getItemData } = useTreeStore();

  if (selectedItem === null || selectedItem === undefined) return null;
  if (selectedItem.type !== "Ensemble") return null;
  const data = getItemData(selectedItem);

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
  "Priorité": <BarChartByPriority />,
  "État": <BarChartByState />,
}

export const DashboardEnsembleUSLayout: React.FC = () => {
  const { selectedItem, getItemData } = useTreeStore();
  const data = getItemData(selectedItem);

  return (
    <BaseDashboardLayout>
      <DashboardRow>
        <DashboardCase title="Graphique des US" description="" className="w-full p-5">
          <ChartSelect chartDict={chartDict} />
        </DashboardCase>
      </DashboardRow>
      <DashboardRow>
        <DashboardCase title="Graphique des US" description="" className="w-full">
          <Kanban />
        </DashboardCase>
      </DashboardRow>
      <DashboardRow>
        <DashboardCase title="Indice de prédictibilité" className="w-full p-5">
          <span className="font-bold text-2xl">{(Number(data.donePoints) / Number(data.totalPoints ) || 0).toFixed(2)}</span>
        </DashboardCase>
        <DashboardCase title="US restantes / US Total" className="w-full p-5">
          <span className="font-bold text-2xl">
            {data.stateStats[nativeStateEnum.Terminee]} / {data.stateStats[nativeStateEnum.A_Faire] + data.stateStats[nativeStateEnum.En_Cours] + data.stateStats[nativeStateEnum.Terminee]}
          </span>
        </DashboardCase>
      </DashboardRow>
    </BaseDashboardLayout>
  )
}
