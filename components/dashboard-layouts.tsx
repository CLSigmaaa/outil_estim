"use client"
import * as React from 'react';
import { DashboardRow, DashboardCase, BaseDashboardLayout, chartData, chartConfig, PlaceholderChart } from '@/components/dynamic-dashboard';
import Kanban from './kanban/Kanban';

export const DashboardUSLayout: React.FC = () => {
  return (
    <BaseDashboardLayout>
      <DashboardRow>
        <DashboardCase title="User stories" className="flex-grow">
          <PlaceholderChart chartConfig={chartConfig} chartData={chartData} />
        </DashboardCase>
        <DashboardCase title="User stories" className="flex-grow">
          <PlaceholderChart chartConfig={chartConfig} chartData={chartData} />
        </DashboardCase>
      </DashboardRow>
      <DashboardRow className="flex-row">
        <DashboardCase title="User stories" className='flex-grow'>
          <span>test</span>
        </DashboardCase>
        <DashboardCase title="User stories"className='flex-grow'>
          <span>test</span>
        </DashboardCase>
        <DashboardCase title="User stories"className='flex-grow'>
          <span>test</span>
        </DashboardCase>
        <DashboardCase title="User stories" className='flex-grow'>
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
    <div>
      <h1>Dashboard Ensemble US Layout</h1>
    </div>
  )
}
