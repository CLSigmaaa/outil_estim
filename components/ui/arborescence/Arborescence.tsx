import { useRef, useState } from "react";
import React from "react";
import TreeView from "./TreeView";
import { type Item, type Projet, type US, EnsembleUS, type Sprint } from "@/app/model/projet/index";
import Divider from '@mui/material/Divider';


import "@/app/assets/styles/outilEstim.css"


export default function Arborescence() {

  const us1 = useRef<US>({ 
    nom: "US0",
    description: "description de l'US0",
    id: "ID-US0",
    priorite: "Mineur",
    statut: "Non commencé",
    technologies:"",
    complexite: "",
    estimation: "",
    datesEstimee:"",
    datesEffectives:"",
    children:[],
    commentaires: "",
    type:"US"
  });
      
      
  const [selectedProject, setSelectedProject] = useState<Projet>({
      nom: "Project1 Name",
      description: "description",
      id:"id-proj1",
      children: [us1.current],
      childNb: 1,
  })

  
  return (
    <div className="flex flex-col p-3 w-full">
      {selectedProject.nom}
    <TreeView />
    <Divider />
    
    </div>
  );
}
