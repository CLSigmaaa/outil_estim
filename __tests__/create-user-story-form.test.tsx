import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import { jest, describe, expect, test } from '@jest/globals';
import { TreeState, useTreeStore } from '@/components/store/useTreeStore';
import TreeView from '@/components/ui/arborescence/TreeView';
import { RightPanel } from '@/components/right-panel';

jest.mock('../components/forms/create-ensemble-form');

// const mockedAddItem = jest.fn().mockImplementation((parentId: any, newItem: any) => useTreeStore().addItem(parentId, newItem))
// const mockedGetNewUS = jest.fn().mockImplementation(() => useTreeStore().getNewUS())
// const mockedGetNewEnsemble = jest.fn().mockImplementation(() => useTreeStore().getNewEnsemble())
// const mockedGetNewSprint = jest.fn().mockImplementation(() => useTreeStore().getNewSprint())
// jest.mock('../components/store/useTreeStore', () => ({
//     useTreeStore: () => {
//         const data = {
//             project: {
//                 nom: "Project1 Name",
//                 description: "description",
//                 id: "id-proj1",
//                 children: [],
//                 childNb: 0,
//             },
//             selectedItem: undefined,
//             setProject: jest.fn().mockImplementation((newProject: any) => useTreeStore().setProject(newProject)),
//             setSelectedItem: jest.spyOn(useTreeStore(), 'setSelectedItem'),
//             addItem: mockedAddItem,
//             deleteItem: jest.spyOn(useTreeStore(), 'deleteItem'),
//             editItem: jest.spyOn(useTreeStore(), 'editItem'),
//             getNewUS: jest.spyOn(useTreeStore(), 'getNewUS'),
//             getNewEnsemble: jest.spyOn(useTreeStore(), 'getNewEnsemble'),
//             getNewSprint: jest.spyOn(useTreeStore(), 'getNewSprint'),
//         }

//         return data
//     }
// }))
describe('TreeView', () => {
    test("Création d'un item", () => {
        render(<TreeView />)

        const { result } = renderHook(() => useTreeStore())
        act(() => result.current.addItem("", result.current.getNewUS()));
        expect(result.current.project.children.length).toBe(1)
    })

    test("Sélectionner un élément de l'arborescence met à jour 'selectedItem' du store", () => {
        render(<TreeView/>);
        const { result } = renderHook(() => useTreeStore());
        fireEvent.click(screen.getByText(/US1/i))
        expect(result.current.selectedItem).toBe(result.current.project.children[0]);
    })

    test("Le form s'ouvre avec les données de l'élément sélectionné", () => {
        render(<TreeView/>);
        render(<RightPanel/>);

        const { result } = renderHook(() => useTreeStore())
        fireEvent.click(screen.getByText(/US1/i))

        let selectedItem = result.current.selectedItem;
        expect(screen.getByLabelText(/Nom/i).value).toBe(selectedItem.nom);
        expect(screen.getByLabelText(/Description/i).value).toBe(selectedItem.description);
        expect(screen.getByLabelText(/Priorité/i).value ).toBe(selectedItem.priorite);
        expect(screen.getByLabelText(/États des US/i).value).toBe(selectedItem.etat || "");
        expect(screen.getByLabelText(/Technologies/i).value).toBe(selectedItem.technologies );
        expect(screen.getByLabelText(/Complexité/i).value).toBe(selectedItem.complexite );
        expect(screen.getByLabelText(/Estimation Initiale/i).value).toBe(selectedItem.estimationInitiale || "0");
        expect(screen.getByLabelText(/dateLancementEstimee/i).value).toBe(selectedItem.estimationInitiale || "");
        expect(screen.getByLabelText(/dateLancementEffective/i).value).toBe(selectedItem.estimationInitiale || "");
        expect(screen.getByLabelText(/Commentaires/i).value).toBe(selectedItem.commentaires );

    })

    test('Appel de editItem avec les bonnes valeurs du form', () => {
        render(<TreeView/>);
        render(<RightPanel/>);
        

        var { result } = renderHook(() => useTreeStore())
        fireEvent.click(screen.getByText(/US1/i))
        let selectedItem = result.current.selectedItem;

        var startDate = new Date();
        startDate.setFullYear(2024);
        startDate.setMonth(6);
        startDate.setDate(5)
        var endDate = new Date();
        endDate.setFullYear(2024);
        endDate.setMonth(6);
        endDate.setDate(14)
        let editedItem = {
            nom: 'newNom',
            description: "newDesc",
            id: selectedItem.id,
            priorite: "Majeure",
            statut: "Terminée",
            technologies: "Java",
            complexite: "Moyen",
            estimation: "42",
            datesEstimee: {from:startDate, to:endDate},
            datesEffectives: {from:startDate, to:endDate},
            children: selectedItem.children,
            commentaires: "NewCommentaires",
            type: "US",
        }
        debugger;
        fireEvent.change(screen.getByLabelText(/Nom/i), { target: { value: editedItem.nom } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: editedItem.description } });
        fireEvent.change(screen.getByLabelText(/Priorité/i), { target: { value: editedItem.priorite } });
        fireEvent.change(screen.getByLabelText(/États des US/i), { target: { value: editedItem.statut } });
        fireEvent.change(screen.getByLabelText(/Technologies/i), { target: { value: editedItem.technologies } });
        fireEvent.change(screen.getByLabelText(/Complexité/i), { target: { value: editedItem.complexite } });
        fireEvent.change(screen.getByLabelText(/Estimation Initiale/i), { target: { value: editedItem.estimation } });
        fireEvent.change(screen.getByLabelText(/dateLancementEstimee/i), { target: { value: {from:startDate, to:endDate} } });
        fireEvent.change(screen.getByLabelText(/dateLancementEffective/i), { target: { value: {from:startDate, to:endDate} } });
        fireEvent.change(screen.getByLabelText(/Commentaires/i), { target: { value: editedItem.commentaires } });
       
        // Validation du form
        fireEvent.click(screen.getByText(/Modifier US/i))
        // Valider le form déselectionne l'item
        fireEvent.click(screen.getByText(/newNom/i))
        
        result = renderHook(() => useTreeStore()).result
        expect(result.current.selectedItem).toBe(editedItem);
    })
});
