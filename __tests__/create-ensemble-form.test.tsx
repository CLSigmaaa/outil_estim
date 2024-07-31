import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import { jest, describe, expect, test } from '@jest/globals';
import { TreeState, useTreeStore } from '@/store/useTreeStore';
import TreeView from '@/components/ui/arborescence/TreeView';
import { RightPanel } from '@/components/right-panel';
import { EnsembleUS, US } from '@/app/model/projet';
import {  } from '@/schemas/forms/user-story';
import { format } from 'date-fns';

jest.mock('../components/forms/create-ensemble-form');


describe('TreeView', () => {
    test("Création d'un ensemble", () => {
        render(<TreeView />)

        const { result } = renderHook(() => useTreeStore())
        act(() => result.current.addItem("", result.current.getNewEnsemble()));
        expect(result.current.project.children.length).toBe(1)
    })

    test("Sélectionner un ensemble de l'arborescence met à jour 'selectedItem' du store", () => {
        render(<TreeView/>);
        const { result } = renderHook(() => useTreeStore());
        fireEvent.click(screen.getByText(/^Ensemble 1$/i))
        expect(result.current.selectedItem).toBe(result.current.project.children[0]);
    })

    test("Le form s'ouvre avec les données de l'ensemble sélectionné", () => {
        render(<TreeView/>);
        const { getByTestId } = render(<RightPanel/>);

        const { result } = renderHook(() => useTreeStore())
        fireEvent.click(screen.getByText(/^Ensemble 1$/i))
        // userEvent.selectOptions(getByTestId("select-multiple"), ["1", "3"]);
        var selectedItem = result.current.selectedItem;
        expect(screen.getByLabelText(/Nom/i).value).toBe(selectedItem.nom);
        expect(screen.getByLabelText(/Description/i).value).toBe(selectedItem.description);
        expect(screen.getByLabelText(/Commentaires/i).value).toBe(selectedItem.commentaires );

    })

    test("EditItem modifie bien les valeurs de l'US", () => {
        render(<TreeView/>);
        render(<RightPanel/>);

        var { result } = renderHook(() => useTreeStore())
        fireEvent.click(screen.getByText(/^Ensemble 1$/i))
        var selectedItem = result.current.selectedItem;
      
        var editedEnsemble = {
            nom: 'newNom',
            description: "newDesc",
            id: selectedItem.id,
            children: selectedItem.children,
            commentaires: "NewCommentaires",
            type: "Ensemble",
        } as EnsembleUS
        act(() => {result.current.editItem(selectedItem.id, editedEnsemble)});
        
       
        // Valider le form déselectionne l'item
        fireEvent.click(screen.getByText(/newNom/i))
        expect(screen.getByLabelText(/Nom/i).value).toBe(editedEnsemble.nom);
        expect(screen.getByLabelText(/Description/i).value).toBe(editedEnsemble.description);
        expect(screen.getByLabelText(/Commentaires/i).value).toBe(editedEnsemble.commentaires );

    })
});
