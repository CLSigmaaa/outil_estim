"use client"
import * as React from 'react';
import { DynamicDashboard, chartData, chartConfig, PlaceholderChart, BaseDashboardCase } from '@/components/dynamic-dashboard';

export const DashboardUSLayout: React.FC = () => {
  return (
    <DynamicDashboard>
      <BaseDashboardCase title="Kanban des tâches" resizable={false}>
        <span>Insérer Kanban ici.</span>
      </BaseDashboardCase>
    </DynamicDashboard>
  )
}

export const DashboardSprintLayout: React.FC = () => {
  return (
    <div>
      <h1>Dashboard Sprint Layout</h1>
    </div>
  )
}

export const DashboardEnsembleUSLayout: React.FC = () => {
  return (
    <div>
      <h1>Dashboard Ensemble US Layout</h1>
    </div>
  )
}
