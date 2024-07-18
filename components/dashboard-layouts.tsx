"use client"
import * as React from 'react';
import { DynamicDashboard, chartData, chartConfig, PlaceholderChart, BaseDashboardCase } from '@/components/dynamic-dashboard';
import Kanban from './kanban/Kanban';

export const DashboardUSLayout: React.FC = () => {
  return (
    <DynamicDashboard>
      <BaseDashboardCase title="Kanban des tâches" resizable="both">
        <Kanban isUSKanban={true}/>
      </BaseDashboardCase>
    </DynamicDashboard>
  )
}

export const DashboardSprintLayout: React.FC = () => {
  return (
    <BaseDashboardCase title="Kanban des user stories" resizable="both">
      <Kanban isUSKanban={false}/>
      </BaseDashboardCase>
  )
}

export const DashboardEnsembleUSLayout: React.FC = () => {
  return (
    <div>
      <h1>Dashboard Ensemble US Layout</h1>
    </div>
  )
}
