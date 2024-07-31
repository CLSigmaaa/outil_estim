import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import { jest, describe, expect, test } from '@jest/globals';
import { TreeState, useTreeStore } from '@/store/useTreeStore';
import TreeView from '@/components/ui/arborescence/TreeView';
import { RightPanel } from '@/components/right-panel';
import { Sprint, US } from '@/app/model/projet';
import { } from '@/schemas/forms/user-story';
import { format } from 'date-fns';
import { nativeStateEnum } from '@/app/model/projet/itemEnum';

describe('TreeView', () => {
    test("Création d'un sprint", () => {
        render(<TreeView />)

        const { result } = renderHook(() => useTreeStore())
        act(() => result.current.addItem("", result.current.getNewSprint()));
        expect(result.current.project.children.length).toBe(1)
    })

    test("Sélectionner un Sprint de l'arborescence met à jour 'selectedItem' du store", () => {
        render(<TreeView/>);
        const { result } = renderHook(() => useTreeStore());
        fireEvent.click(screen.getByText(/^Sprint 1$/i))
        expect(result.current.selectedItem).toBe(result.current.project.children[0]);
    })

    test("Le form s'ouvre avec les données du sprint sélectionné", () => {
        render(<TreeView/>);
        const { getByTestId } = render(<RightPanel/>);

        const { result } = renderHook(() => useTreeStore())
        fireEvent.click(screen.getByText(/^Sprint 1$/i))
        // userEvent.selectOptions(getByTestId("select-multiple"), ["1", "3"]);
        var selectedItem = result.current.selectedItem;
        expect(screen.getByLabelText(/Nom/i).value).toBe(selectedItem.nom);
        expect(screen.getByLabelText(/Description/i).value).toBe(selectedItem.description);
        expect(screen.getByLabelText(/État du Sprint/i).firstChild?.innerHTML).toBe(selectedItem.etat || nativeStateEnum.A_Faire);
        expect(screen.getByLabelText(/Commentaires/i).value).toBe(selectedItem.commentaires );

    })

    test("EditItem modifie bien les valeurs du sprint", () => {
        render(<TreeView/>);
        render(<RightPanel/>);

        var { result } = renderHook(() => useTreeStore())
        fireEvent.click(screen.getByText(/^Sprint 1$/i))
        var selectedItem = result.current.selectedItem;
        
        const startDate = new Date();
        startDate.setFullYear(2024);
        startDate.setMonth(6);
        startDate.setDate(5)
        const endDate = new Date();
        endDate.setFullYear(2024);
        endDate.setMonth(6);
        endDate.setDate(14)
        var editedItem = {
            nom: 'newNom',
            description: "newDesc",
            id: selectedItem.id,
            statut: nativeStateEnum.Terminee,
            datesEffectives: {from:startDate.toDateString(), to:endDate.toDateString()},
            children: selectedItem.children,
            commentaires: "NewCommentaires",
            type: "Sprint",
        } as Sprint
        act(() => {result.current.editItem(selectedItem.id, editedItem)});
        
       
        // Valider le form déselectionne l'item
        fireEvent.click(screen.getByText(/newNom/i))
        expect(screen.getByLabelText(/Nom/i).value).toBe(editedItem.nom);
        expect(screen.getByLabelText(/Description/i).value).toBe(editedItem.description);
        expect(screen.getByLabelText(/État du Sprint/i).firstChild?.innerHTML).toBe(editedItem.statut || "");
        expect(screen.getByLabelText(/Commentaires/i).value).toBe(editedItem.commentaires );

    })

   
});
