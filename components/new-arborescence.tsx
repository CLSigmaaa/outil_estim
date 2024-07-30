"use client"

import * as React from "react";

import { useTreeStore } from "@/components/store/useTreeStore";

import { cn } from "@/lib/utils";

import { Plus } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { motion } from 'framer-motion';
import { usePanelManager } from "./store/usePanelManager";

type node = any


export const NewFileTree = ({ node }: { node: node }) => {
  const { selectedItem, setCurrentRoute, setSelectedItem, addItem, deleteItem, getNewUS, getNewSprint, getNewEnsemble, findItemInProject } = useTreeStore();

  const { setRightPanelVisibility } = usePanelManager();

  const [areChildrenDisplayed, setAreChildrenDisplayed] = React.useState(false);
  const [isPopOverOpen, setIsPopOverOpen] = React.useState(false);

  const handleClick = ((_event: any) => {
    setRightPanelVisibility(true);
    setAreChildrenDisplayed((prev) => !prev);
    setSelectedItem(node);
    setCurrentRoute("")

  })

  const handleAddChildToNode = (_childType: string) => {
    if (_childType === "US") {
      const newUS = getNewUS()
      addItem(node.id, newUS)
      setSelectedItem(newUS)
    } else if (_childType === "Ensemble") {
      const newEnsemble = getNewEnsemble()
      addItem(node.id, newEnsemble)
      setSelectedItem(newEnsemble)
    } else if (_childType === "Sprint") {
      const newSprint = getNewSprint()
      addItem(node.id, newSprint)
      setSelectedItem(newSprint)
    }
    setIsPopOverOpen(false);
  }

  return (
    <div className="w-full">
      <ul className="w-full">
        <li className={cn(
          "flex w-full p-2 hover:bg-slate-100",
          selectedItem?.id === node.id && "bg-blue-100",
        )}>
          <div onClick={handleClick} className="flex w-full font-medium">
            <motion.span
              animate={{ rotate: areChildrenDisplayed ? 90 : 0 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="flex items-center justify-center"
            >
              <ChevronRight className={cn(
                node.type == "US" ? "invisible" : "visible"
              )}
              />
            </motion.span>
            <span
              className="cursor-pointer select-none w-3/4 ml-2"
            >
              {node.nom}
            </span>
          </div>
          <div className="absolute flex justify-around w-1/4 right-0">
            {node.type !== "US" && (
              <Popover open={isPopOverOpen} onOpenChange={setIsPopOverOpen}>
                <PopoverTrigger>
                  <Plus className="font-light text-blue-700" />
                </PopoverTrigger>
                <PopoverContent>
                  <ul>
                    <li
                      onClick={() => handleAddChildToNode("US")}
                      className="cursor-pointer p-2 hover:bg-slate-100"
                    >
                      Ajouter une US
                    </li>
                    <li
                      onClick={() => handleAddChildToNode("Ensemble")}
                      className="cursor-pointer p-2 hover:bg-slate-100"
                    >
                      Ajouter un Ensemble
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            )}
            <button onClick={() => {
              deleteItem(node.id)
              if (selectedItem?.id === node.id) {
                setSelectedItem(null)
              }
            }}
            >
              <Trash2 className={cn(
                "font-light text-red-700",
                node.type == "US" && "right-2 absolute"
              )} />
            </button>
          </div>
        </li>
      </ul>
      {areChildrenDisplayed && (
        <ul className="ml-5 w-full">
          {node.children?.map((child: node) => (
            <NewFileTree node={child} key={child.id} />
          ))}
        </ul>
      )}
    </div>
  )
}
