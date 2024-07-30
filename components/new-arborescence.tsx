"use client"

import * as React from "react";

import { useTreeStore } from "@/components/store/useTreeStore";

import { cn } from "@/lib/utils";

import { Plus } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Repeat } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { UsersRound } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { motion } from 'framer-motion';
import { usePanelManager } from "./store/usePanelManager";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { Button } from "./ui/button";

// css imports
import "@/app/assets/styles/outilEstim.css";

type node = any

const treeIcons: Record<string, React.ReactElement<Icon>> = {
  US: <UserRound size={20} />,
  Ensemble: <UsersRound size={20} />,
  Sprint: <Repeat size={20} />,
};

export const DeleteItemButton = ({ node }: { node: node }) => {
  const { selectedItem, setSelectedItem, deleteItem } = useTreeStore();
  const [isPopOverOpen, setIsPopOverOpen] = React.useState(false);

  const handleClick = () => {
    deleteItem(node.id)
    if (selectedItem?.id === node.id) {
      setSelectedItem(null)
    }
  }

  return (
    <Popover open={isPopOverOpen} onOpenChange={setIsPopOverOpen}>
      <PopoverTrigger className={cn(
        "cursor-pointer flex items-center",
        node.type === "US" ? "justify-end" : "justify-between"
      )}>
        <Trash2
          size={24}
          className={cn(
            "font-light text-red-700",
          )} />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-y-2">
        <span className="font-medium">Êtes-vous sûr de vouloir supprimer cet élément ?</span>
        <div className="flex gap-x-2">
          <Button
            onClick={handleClick}
            variant="destructive"
          >
            Oui
          </Button>
          <Button
            onClick={() => setIsPopOverOpen(false)}
            variant="secondary"
          >
            Non, ne pas supprimer
          </Button>
        </div>
      </PopoverContent>
    </Popover >
  )
}

export const AddItemButton = ({ node }: { node: node }) => {
  const { setSelectedItem, addItem, getNewUS, getNewSprint, getNewEnsemble } = useTreeStore();

  const [isPopOverOpen, setIsPopOverOpen] = React.useState(false);

  const handleAddChildToNode = (childType: string) => {
    const typeToFunctionMap: { [key: string]: () => any } = {
      "US": getNewUS,
      "Ensemble": getNewEnsemble,
      "Sprint": getNewSprint
    };

    const newItemFunction = typeToFunctionMap[childType];

    if (newItemFunction) {
      const newItem = newItemFunction();
      addItem(node.id, newItem);
      setSelectedItem(newItem);
    }

    setIsPopOverOpen(false);
  }

  return (
    <Popover open={isPopOverOpen} onOpenChange={setIsPopOverOpen}>
      <PopoverTrigger>
        <Plus size={24} className="font-light text-blue-700" />
      </PopoverTrigger>
      <PopoverContent>
        <ul>
          <li
            onClick={() => handleAddChildToNode("US")}
            className="cursor-pointer p-2 hover:bg-slate-100 flex gap-x-4"
          >
            <UserRound size={20} />
            Ajouter une US
          </li>
          <li
            onClick={() => handleAddChildToNode("Ensemble")}
            className="cursor-pointer p-2 hover:bg-slate-100 flex gap-x-4"
          >
            <UsersRound size={20} />
            Ajouter un Ensemble
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  )
}


export const NewFileTree = ({ node }: any) => {
  const { selectedItem, setSelectedItem, setCurrentRoute, expandedItems, toggleExpandedItem } = useTreeStore();
  const { setRightPanelVisibility } = usePanelManager();

  const isExpanded = expandedItems.includes(node.id);

  const handleClick = () => {
    setRightPanelVisibility(true);
    toggleExpandedItem(node.id);
    setSelectedItem(node);
    setCurrentRoute("");
  }

  return (
    <ul className="w-full">
      <li>
        <div className="flex justify-between w-full">
          <div
            onClick={handleClick}
            className={cn(
              "flex w-full p-2 hover:bg-slate-100 overflow-hidden max-w-full",
              selectedItem?.id === node.id && "bg-blue-100",
            )}
          >
            <motion.span
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="flex items-center justify-center cursor-pointer max-w-full overflow-hidden"
            >
              <ChevronRight className={cn(
                node.type == "US" ? "invisible" : "visible",
              )}
              />
            </motion.span>

            <span className="flex items-center ml-2">
              {treeIcons[node?.type]}
            </span>

            <span className="cursor-pointer select-none w-3/4 ml-2 text-ellipsis truncate">
              {node.nom}
            </span>
          </div>
          <div className="flex w-1/4 justify-end gap-x-1">
            {node.type !== "US" && <AddItemButton node={node} />}
            <DeleteItemButton node={node} />
          </div>
        </div>

        {isExpanded && (
          <ul className="pl-5 w-full">
            {node.children?.map((child: node) => (
              <NewFileTree node={child} key={child.id} />
            ))}
          </ul>
        )}
      </li>
    </ul>
  );
}
