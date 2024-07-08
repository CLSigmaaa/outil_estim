import { useRef, useState } from "react";
import React from "react";
import TreeView from "./TreeView";
import { type Item, type Projet, type US, EnsembleUS, type Sprint } from "@/app/model/projet/index";
import Divider from '@mui/material/Divider';


import "@/app/assets/styles/outilEstim.css"


export default function Arborescence() {

      
      
  const [selectedProject, setSelectedProject] = useState<Projet>({
      nom: "Project1 Name",
      description: "description",
      id:"id-proj1",
      children: [],
      childNb: 0,
  })

  
  return (
    <div className="flex flex-col p-3 w-full">
      {selectedProject.nom}
    <TreeView />
    <Divider />
    
    </div>
  );
}
