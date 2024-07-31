"use client"
import { nativeItemTypeEnum } from "@/app/model/projet/itemEnum";
import { useTreeStore } from "@/store/useTreeStore"

import { DashboardUSLayout, DashboardEnsembleUSLayout, DashboardSprintLayout } from "@/components/dashboard-layouts"
import { usePanelManager } from "@/store/usePanelManager";
import ProjectStats from "@/components/project-stats/project-stats"


type DashboardLayoutsType = {
  [key: string]: JSX.Element;
};

const dashboardLayouts: DashboardLayoutsType = {
  [nativeItemTypeEnum.US]: <DashboardUSLayout />,
  [nativeItemTypeEnum.Sprint]: <DashboardSprintLayout />,
  [nativeItemTypeEnum.Ensemble]: <DashboardEnsembleUSLayout />,
}


export const MiddlePanel = () => {
  const { selectedItem } = useTreeStore();
  const { isRightPanelVisible } = usePanelManager();

  if (isRightPanelVisible && !selectedItem) return null;

  return (
    <>
      <h1 className="font-bold text-3xl mt-3 ml-3">Dashboard</h1>
      {isRightPanelVisible ?
        <div className="flex justify-center">
          {dashboardLayouts[selectedItem.type]}
        </div> :
        <ProjectStats />}
    </>
  )
} 
