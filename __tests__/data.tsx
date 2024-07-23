import { Projet } from "@/app/model/projet";

export const mockProject: Projet = {
    nom: "Project1 Name",
    description: "description",
    id:"id-proj1",
    children: [
      {"nom": "Sprint 1",
          "description": "DescriptionUser Sprint 1",
          "id": "ID-Sprint1",
          "statut": "Terminée",
          "datesEffectives": {
              "from": "2024-07-01T12:23:21.335Z",
              "to": "2024-07-30T12:23:21.335Z"
          },
          "children": [
            {
                "nom": "User Story 2",
                "description": "DescriptionUser Story 2",
                "id": "ID-User Story2",
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
                "type": "User Story"
            },
            {
                "nom": "User Story 3",
                "description": "DescriptionUser Story 3",
                "id": "ID-User Story3",
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
                "type": "User Story"
            },
            {
                "nom": "User Story 4",
                "description": "DescriptionUser Story 4",
                "id": "ID-User Story4",
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
                "type": "User Story"
            },
            {
                "nom": "User Story 5",
                "description": "DescriptionUser Story 5",
                "id": "ID-User Story5",
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
                "type": "User Story"
            },
            {
                "nom": "User Story 6",
                "description": "DescriptionUser Story 6",
                "id": "ID-User Story6",
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
                "type": "User Story"
            },
            {
                "nom": "User Story 7",
                "description": "DescriptionUser Story 7",
                "id": "ID-User Story7",
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
                "type": "User Story"
            },
            {
                "nom": "User Story 8",
                "description": "DescriptionUser Story 8",
                "id": "ID-User Story8",
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
                "type": "User Story"
            },
            {
                "nom": "User Story 9",
                "description": "DescriptionUser Story 9",
                "id": "ID-User Story9",
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
                "type": "User Story"
            },
            {
                "nom": "User Story 10",
                "description": "DescriptionUser Story 10",
                "id": "ID-User Story10",
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
                "type": "User Story"
            },
            {
                "nom": "User Story 11",
                "description": "DescriptionUser Story 11",
                "id": "ID-User Story11",
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
                "type": "User Story"
            },
            {
                "nom": "Ensemble 13",
                "description": "DescriptionEnsemble 13",
                "children": [
                    {
                        "nom": "User Story 14",
                        "description": "DescriptionUser Story 14",
                        "id": "ID-User Story14",
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
                        "type": "User Story"
                    },
                    {
                        "nom": "Ensemble 15",
                        "description": "DescriptionEnsemble 15",
                        "children": [
                            {
                                "nom": "User Story 16",
                                "description": "DescriptionUser Story 16",
                                "id": "ID-User Story16",
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
                                "type": "User Story"
                            }
                        ],
                        "id": "ID-Ensemble15",
                        "commentaires": "",
                        "type": "Ensemble"
                    }
                ],
                "id": "ID-Ensemble13",
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