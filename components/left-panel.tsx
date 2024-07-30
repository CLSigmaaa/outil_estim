"use client"

import * as React from "react";

import { NewFileTree } from "@/components/new-arborescence";

import { useTreeStore } from "@/components/store/useTreeStore";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Separator } from "@/components/ui/separator";

import { LineChart } from 'lucide-react'
import { cn } from "@/lib/utils";
import { usePanelManager } from "./store/usePanelManager";

export const LeftPanel = () => {
  const { project, currentRoute, setCurrentRoute, addItem, selectedItem, setSelectedItem, getNewSprint, getNewUS, getNewEnsemble } = useTreeStore();

  const { setRightPanelVisibility } = usePanelManager();

  const [isPopOverOpen, setIsPopOverOpen] = React.useState(false);

  const addChildToRoot = (childType: string) => {
    if (childType === "US") {
      const newUS = getNewUS()
      addItem("", newUS)
      setSelectedItem(newUS)
    } else if (childType === "Ensemble") {
      const newEnsemble = getNewEnsemble()
      addItem("", newEnsemble)
      setSelectedItem(newEnsemble)
    } else if (childType === "Sprint") {
      const newSprint = getNewSprint()
      addItem("", newSprint)
      setSelectedItem(newSprint)
    }
    setIsPopOverOpen(false);
  }

  return (
    <div className="flex flex-col w-full h-full relative">
      <span className="font-semibold text-lg my-4 text-center">{project.nom}</span>
      <Separator />

      {project.children.map((child) => (
        <NewFileTree node={child} key={child.id} />
      ))}

      <Popover open={isPopOverOpen} onOpenChange={setIsPopOverOpen}>
        <PopoverTrigger className="mt-4 border-slate-200 border p-3 rounded-md hover:bg-slate-100">
          Ajouter un élément au projet
        </PopoverTrigger>
        <PopoverContent>
          <ul>
            <li
              onClick={() => addChildToRoot("US")}
              className="cursor-pointer p-2 hover:bg-slate-100"
            >
              Ajouter une US
            </li>
            <li
              onClick={() => addChildToRoot("Ensemble")}
              className="cursor-pointer p-2 hover:bg-slate-100"
            >
              Ajouter un Ensemble
            </li>
            <li
              onClick={() => addChildToRoot("Sprint")}
              className="cursor-pointer p-2 hover:bg-slate-100"
            >
              Ajouter un Sprint
            </li>
          </ul>
        </PopoverContent>
      </Popover>

      <Separator className="my-4" />

      <span className="text-lg font-medium">Statistiques générales</span>

      <div
        className={cn(
          "p-4 hover:bg-slate-200 cursor-pointer flex w-full gap-x-4",
          currentRoute === "stats" ? "bg-blue-200" : ""
        )}
        onClick={() => {
          setCurrentRoute("stats");
          setRightPanelVisibility(false);
        }}
      >
        <LineChart size={24} />
        <span
          className={cn(
            selectedItem?.type === "stat" ? "text-blue-700" : ""
          )}
        >
          Statistiques générales
        </span>
      </div>
    </div>
  )
}
