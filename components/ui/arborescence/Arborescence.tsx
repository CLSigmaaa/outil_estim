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
      children: [
        {
            "nom": "User Story 2",
            "description": "DescriptionUser Story 2",
            "id": "ID-User Story2",
            "priorite": "Mineure",
            "statut": "Terminée",
            "version": "",
            "estimation": 10,
            "datesEffectives": {
                "from": "",
                "to": "2024-07-09T12:23:21.335Z"
            },
            "children": [],
            "commentaires": "",
            "type": "User Story",
        },
        {
            "nom": "User Story 3",
            "description": "DescriptionUser Story 3",
            "id": "ID-User Story3",
            "priorite": "Mineure",
            "statut": "Terminée",
            "version": "",
            "estimation": 15,
            "datesEffectives": {
                "from": "",
                "to": "2024-07-12T12:23:21.335Z"
            },
            "children": [],
            "commentaires": "",
            "type": "User Story",
        },
        {
            "nom": "User Story 4",
            "description": "DescriptionUser Story 4",
            "id": "ID-User Story4",
            "priorite": "Mineure",
            "statut": "Terminée",
            "version": "",
            "estimation": 20,
            "datesEffectives": {
                "from": "",
                "to": "2024-07-15T12:23:21.335Z"
            },
            "children": [],
            "commentaires": "",
            "type": "User Story",
        },
        {
            "nom": "User Story 5",
            "description": "DescriptionUser Story 5",
            "id": "ID-User Story5",
            "priorite": "Mineure",
            "statut": "Terminée",
            "version": "",
            "estimation": 25,
            "datesEffectives": {
                "from": "",
                "to": "2024-07-21T12:23:21.335Z"
            },
            "children": [],
            "commentaires": "",
            "type": "User Story",
        },
        {
            "nom": "User Story 6",
            "description": "DescriptionUser Story 6",
            "id": "ID-User Story6",
            "priorite": "Mineure",
            "statut": "Terminée",
            "version": "",
            "estimation": 30,
            "datesEffectives": {
                "from": "",
                "to": "2024-07-23T12:23:21.335Z"
            },
            "children": [],
            "commentaires": "",
            "type": "User Story",
        },
        {
            "nom": "User Story 7",
            "description": "DescriptionUser Story 7",
            "id": "ID-User Story7",
            "priorite": "Mineure",
            "statut": "Terminée",
            "version": "",
            "estimation": 35,
            "datesEffectives": {
                "from": "",
                "to": "2024-07-25T12:23:21.335Z"
            },
            "children": [],
            "commentaires": "",
            "type": "User Story",
        },
        {
            "nom": "User Story 8",
            "description": "DescriptionUser Story 8",
            "id": "ID-User Story8",
            "priorite": "Mineure",
            "statut": "Terminée",
            "version": "",
            "estimation": 25,
            "datesEffectives": {
                "from": "",
                "to": "2024-07-26T12:23:21.335Z"
            },
            "children": [],
            "commentaires": "",
            "type": "User Story",
        },
        {
            "nom": "User Story 9",
            "description": "DescriptionUser Story 9",
            "id": "ID-User Story9",
            "priorite": "Mineure",
            "statut": "Terminée",
            "version": "",
            "estimation": 35,
            "datesEffectives": {
                "from": "",
                "to": "2024-07-28T12:23:21.335Z"
            },
            "children": [],
            "commentaires": "",
            "type": "User Story",
        },
        {
            "nom": "User Story 10",
            "description": "DescriptionUser Story 10",
            "id": "ID-User Story10",
            "priorite": "Mineure",
            "statut": "Terminée",
            "version": "",
            "estimation": 15,
            "datesEffectives": {
                "from": "",
                "to": "2024-07-28T12:23:21.335Z"
            },
            "children": [],
            "commentaires": "",
            "type": "User Story",
        },
        {
            "nom": "User Story 11",
            "description": "DescriptionUser Story 11",
            "id": "ID-User Story11",
            "priorite": "Mineure",
            "statut": "Terminée",
            "version": "",
            "estimation": 30,
            "datesEffectives": {
                "from": "",
                "to": "2024-07-30T12:23:21.335Z"
            },
            "children": [],
            "commentaires": "",
            "type": "User Story",
        }
    ],
      childNb: 0,
  })

  
  return (
    <div className="flex flex-col w-full">
      <p className="p-2 font-semibold">{selectedProject.nom}</p>
    <Divider />
    <TreeView />
    
    </div>
  );
}
