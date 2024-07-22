"use client"
import * as React from 'react';
import { DashboardRow, DashboardCase, BaseDashboardLayout, chartData, chartConfig, PlaceholderChart } from '@/components/dynamic-dashboard';
import Kanban from './kanban/Kanban';
import BurnDown from './burn-down/BurnDown';

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
        <DashboardCase title="User stories"className='w-full'>
          <span>test</span>
        </DashboardCase>
        <DashboardCase title="User stories"className='w-full'>
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
    <div></div>
  )
}

export const DashboardEnsembleUSLayout: React.FC = () => {
  return (
    <BaseDashboardLayout>
      <DashboardRow>
        <DashboardCase title="Kanban US" description="Gestion des tâches d'une US" className="w-full">
        </DashboardCase>
        <DashboardCase title="Kanban US" description="Gestion des tâches d'une US" className="w-full">
        </DashboardCase>
      </DashboardRow>
    </BaseDashboardLayout>
  )
}
