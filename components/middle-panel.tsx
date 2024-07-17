"use client"
import { DashboardUSLayout, DashboardEnsembleUSLayout, DashboardSprintLayout } from "@/components/dashboard-layouts"

import { useTreeStore } from "@/components/store/useTreeStore"

type DashboardLayoutsType = {
  [key: string]: JSX.Element;
};

const dashboardLayouts: DashboardLayoutsType = {
  "US": <DashboardUSLayout />,
  "Sprint": <DashboardSprintLayout />,
  "Ensemble": <DashboardEnsembleUSLayout />,
}

export const MiddlePanel = () => {
  const { selectedItem } = useTreeStore();

  if (!selectedItem) return null;

  return (
    <>
      <h1 className="font-bold text-3xl mt-3 ml-3">Dashboard</h1>
      <div className="flex justify-center overflow-y-auto">
          {dashboardLayouts[selectedItem.type]}
      </div>
    </>
  )
} 
