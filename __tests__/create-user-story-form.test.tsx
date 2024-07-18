import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import { jest, describe, expect, test } from '@jest/globals';
import { TreeState, useTreeStore } from '@/components/store/useTreeStore';
import TreeView from '@/components/ui/arborescence/TreeView';
import { RightPanel } from '@/components/right-panel';
import { US } from '@/app/model/projet';
import {  } from '@/schemas/forms/user-story';
import { format } from 'date-fns';
import { nativeMasteryEnum, nativePriorityEnum, nativeStateEnum } from '@/app/model/projet/itemEnum';

describe('TreeView', () => {
    test("Création d'une US", () => {
        render(<TreeView />)

        const { result } = renderHook(() => useTreeStore())
        act(() => result.current.addItem("", result.current.getNewUS()));
        expect(result.current.project.children.length).toBe(1)
    })

    test("Sélectionner une US de l'arborescence met à jour 'selectedItem' du store", () => {
        render(<TreeView/>);
        const { result } = renderHook(() => useTreeStore());
        fireEvent.click(screen.getByText(/^User Story 1$/i))
        expect(result.current.selectedItem).toBe(result.current.project.children[0]);
    })

    test("Le form s'ouvre avec les données de l'US sélectionnée", () => {
        render(<TreeView/>);
        const { getByTestId } = render(<RightPanel/>);

        const { result } = renderHook(() => useTreeStore())
        fireEvent.click(screen.getByText(/^User Story 1$/i))
        var selectedItem = result.current.selectedItem;
        expect(screen.getByLabelText(/Nom/i).value).toBe(selectedItem.nom);
        expect(screen.getByLabelText(/Description/i).value).toBe(selectedItem.description);
        expect(screen.getByLabelText(/Priorité/i).firstChild?.innerHTML ).toBe(selectedItem.priorite || nativePriorityEnum.Mineure);
        expect(screen.getByLabelText(/État des US/i).firstChild?.innerHTML).toBe(selectedItem.etat || nativeStateEnum.A_Faire);
        expect(screen.getByLabelText(/Version/i).value).toBe(selectedItem.version );
        expect(screen.getByLabelText(/Estimation Initiale/i).value).toBe(selectedItem.estimationInitiale || "0");
        expect(screen.getByLabelText(/Commentaires/i).value).toBe(selectedItem.commentaires );

    })

    test("EditItem modifie bien les valeurs de l'US", () => {
        var {rerender} =render(<TreeView/>);
        var {rerender} = render(<RightPanel/>);

        var { result } = renderHook(() => useTreeStore())
        fireEvent.click(screen.getByText(/^User Story 1$/i))
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
            priorite: nativePriorityEnum.Majeure,
            statut: nativeStateEnum.Terminee,
            version: "2.3.0",
            estimation: "42",
            datesEffectives: {from:startDate.toDateString(), to:endDate.toDateString()},
            children: selectedItem.children,
            commentaires: "NewCommentaires",
            type: "US",
        } as US
        debugger;
        act(() => {result.current.editItem(selectedItem.id, editedItem)});
       
        // Valider le form déselectionne l'item
        fireEvent.click(screen.getByText(/^newNom$/i))
       
        selectedItem = result.current.selectedItem;
        expect(selectedItem.nom).toBe(editedItem.nom);
        expect(selectedItem.description).toBe(editedItem.description);
        expect(selectedItem.priorite).toBe(editedItem.priorite);
        expect(selectedItem.statut).toBe(editedItem.statut || "");
        expect(selectedItem.version).toBe(editedItem.version );
        expect(selectedItem.estimation).toBe(editedItem.estimation || "0");
        expect(selectedItem.datesEffectives.from).toBe(
            format(editedItem.datesEffectives.from, "EEE LLL dd y"));
        expect(selectedItem.datesEffectives.to).toBe(
            format(editedItem.datesEffectives.to, "EEE LLL dd y"));
        expect(selectedItem.commentaires).toBe(editedItem.commentaires );

    })
});
