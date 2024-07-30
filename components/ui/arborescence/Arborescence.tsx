import { useRef, useState } from "react";
import React from "react";
import TreeView from "./TreeView";
import { type Item, type Projet, type US, EnsembleUS, type Sprint } from "@/app/model/projet/index";
import Divider from '@mui/material/Divider';


import "@/app/assets/styles/outilEstim.css"
import { Separator } from "../separator";
import { Button } from "../button";
import { usePanelManager } from "@/components/store/usePanelManager";

export default function Arborescence() {
  const { isRightPanelVisible, isMiddlePanelVisible, isLeftPanelVisible, toggleLeftPanel, toggleRightPanel, toggleMiddlePanel, setRightPanelVisibility } = usePanelManager();

  const handleClick = () => {
    setRightPanelVisibility(false);
  }

  const [selectedProject, setSelectedProject] = useState<Projet>({
    nom: "Project1 Name",
    description: "description",
    id: "id-proj1",
    children: [],
    childNb: 0,
  })


  return (
    <div className="flex flex-col w-full">
      <p className="p-2 font-semibold">{selectedProject.nom}</p>
      <Separator />
      <TreeView />
      <Separator />
      <p className="mt-2 font-semibold p-2">Statistiques</p>
      <Button className="font-bold" variant="outline" onClick={handleClick}>Statistiques générales</Button>
    </div>
  );
}
