import { Projet } from "@/app/model/projet";

export const mockProject: Projet = {
    nom: "Project1 Name",
    description: "description",
    id:"id-proj1",
    children: [
      {"nom": "Sprint 1",
          "description": "DescriptionUser Sprint 1",
          "id": "Sprint1",
          "statut": "Terminée",
          "datesEffectives": {
              "from": "2024-07-01T12:23:21.335Z",
              "to": "2024-07-30T12:23:21.335Z"
          },
          "children": [
            {
                "nom": "US 2",
                "description": "DescriptionUser Story 2",
                "id": "US2",
                "priorite": "Mineure",
                "statut": "En cours",
                "version": "",
                "estimation": 10,
                "datesEffectives": {
                    "from": "",
                    "to": "2024-07-09T12:23:21.335Z"
                },
                "children": [],
                "commentaires": "",
                "type": "US"
            },
            {
                "nom": "US 3",
                "description": "DescriptionUser Story 3",
                "id": "US3",
                "priorite": "Mineure",
                "statut": "A faire",
                "version": "",
                "estimation": 15,
                "datesEffectives": {
                    "from": "",
                    "to": "2024-07-12T12:23:21.335Z"
                },
                "children": [],
                "commentaires": "",
                "type": "US"
            },
            {
                "nom": "US 4",
                "description": "DescriptionUser Story 4",
                "id": "US4",
                "priorite": "Critique",
                "statut": "En cours",
                "version": "",
                "estimation": 20,
                "datesEffectives": {
                    "from": "",
                    "to": "2024-07-15T12:23:21.335Z"
                },
                "children": [],
                "commentaires": "",
                "type": "US"
            },
            {
                "nom": "US 5",
                "description": "DescriptionUser Story 5",
                "id": "US5",
                "priorite": "Critique",
                "statut": "A faire",
                "version": "",
                "estimation": 25,
                "datesEffectives": {
                    "from": "",
                    "to": "2024-07-21T12:23:21.335Z"
                },
                "children": [],
                "commentaires": "",
                "type": "US"
            },
            {
                "nom": "US 6",
                "description": "DescriptionUser Story 6",
                "id": "US6",
                "priorite": "Majeure",
                "statut": "Terminée",
                "version": "",
                "estimation": 30,
                "datesEffectives": {
                    "from": "",
                    "to": "2024-07-22T09:42:22.723Z"
                },
                "children": [],
                "commentaires": "",
                "type": "US"
            },
            {
                "nom": "US 7",
                "description": "DescriptionUser Story 7",
                "id": "US7",
                "priorite": "Mineure",
                "statut": "En cours",
                "version": "",
                "estimation": 35,
                "datesEffectives": {
                    "from": "",
                    "to": "2024-07-25T12:23:21.335Z"
                },
                "children": [],
                "commentaires": "",
                "type": "US"
            },
            {
                "nom": "US 8",
                "description": "DescriptionUser Story 8",
                "id": "US8",
                "priorite": "Majeure",
                "statut": "En cours",
                "version": "",
                "estimation": 25,
                "datesEffectives": {
                    "from": "",
                    "to": "2024-07-26T12:23:21.335Z"
                },
                "children": [],
                "commentaires": "",
                "type": "US"
            },
            {
                "nom": "US 9",
                "description": "DescriptionUser Story 9",
                "id": "US9",
                "priorite": "Majeure",
                "statut": "Terminée",
                "version": "",
                "estimation": 35,
                "datesEffectives": {
                    "from": "",
                    "to": "2024-07-22T09:42:12.264Z"
                },
                "children": [],
                "commentaires": "",
                "type": "US"
            },
            {
                "nom": "US 10",
                "description": "DescriptionUser Story 10",
                "id": "US10",
                "priorite": "Critique",
                "statut": "A faire",
                "version": "",
                "estimation": 15,
                "datesEffectives": {
                    "from": "",
                    "to": "2024-07-28T12:23:21.335Z"
                },
                "children": [],
                "commentaires": "",
                "type": "US"
            },
            {
                "nom": "US 11",
                "description": "DescriptionUser Story 11",
                "id": "US11",
                "priorite": "Critique",
                "statut": "Terminée",
                "version": "",
                "estimation": 30,
                "datesEffectives": {
                    "from": "",
                    "to": "2024-07-22T09:41:11.574Z"
                },
                "children": [],
                "commentaires": "",
                "type": "US"
            },
            {
                "nom": "Ensemble 13",
                "description": "DescriptionEnsemble 13",
                "children": [
                    {
                        "nom": "US 14",
                        "description": "DescriptionUser Story 14",
                        "id": "US14",
                        "priorite": "Majeure",
                        "statut": "A faire",
                        "version": "",
                        "estimation": 15,
                        "datesEffectives": {
                            "from": "",
                            "to": "2024-07-18T09:29:19.240Z"
                        },
                        "children": [],
                        "commentaires": "",
                        "type": "US"
                    },
                    {
                        "nom": "Ensemble 15",
                        "description": "DescriptionEnsemble 15",
                        "children": [
                            {
                                "nom": "US 16",
                                "description": "DescriptionUser Story 16",
                                "id": "US16",
                                "priorite": "Majeure",
                                "statut": "En cours",
                                "version": "",
                                "estimation": 30,
                                "datesEffectives": {
                                    "from": "",
                                    "to": "2024-07-24T09:29:32.603Z"
                                },
                                "children": [],
                                "commentaires": "",
                                "type": "US"
                            }
                        ],
                        "id": "Ensemble15",
                        "commentaires": "",
                        "type": "Ensemble"
                    }
                ],
                "id": "Ensemble13",
                "commentaires": "",
                "type": "Ensemble"
            }
        ],
          "commentaires": "",
          "type": "Sprint"
        }
  ],
    childNb: 16,
  }