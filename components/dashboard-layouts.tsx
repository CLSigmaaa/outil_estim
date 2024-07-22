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
    <BaseDashboardLayout>
    <DashboardRow>
      <DashboardCase title="User stories" className="w-full">
        <BurnDown />
      </DashboardCase>
    </DashboardRow>
    <DashboardRow>
      <DashboardCase title="User stories" className="w-full">
       <Kanban isUSKanban={false}/>
      </DashboardCase>
    </DashboardRow>
  </BaseDashboardLayout>
  )
}

export const DashboardEnsembleUSLayout: React.FC = () => {
  return (
    <div>
      <h1>Dashboard Ensemble US Layout</h1>
    </div>
  )
}
