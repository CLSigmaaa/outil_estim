import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import { jest, describe, expect, test } from '@jest/globals';
import { TreeState, useTreeStore } from '@/components/store/useTreeStore';
import TreeView from '@/components/ui/arborescence/TreeView';
import { RightPanel } from '@/components/right-panel';
import { Sprint, US } from '@/app/model/projet';
import { nativeComplexityEnum, nativePriorityEnum, nativeUserStoryStateEnum } from '@/schemas/forms/user-story';
import userEvent from "@testing-library/user-event";
import { format } from 'date-fns';

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
        fireEvent.click(screen.getByText(/Sprint1/i))
        expect(result.current.selectedItem).toBe(result.current.project.children[0]);
    })

    test("Le form s'ouvre avec les données du sprint sélectionné", () => {
        render(<TreeView/>);
        const { getByTestId } = render(<RightPanel/>);

        const { result } = renderHook(() => useTreeStore())
        fireEvent.click(screen.getByText(/Sprint1/i))
        // userEvent.selectOptions(getByTestId("select-multiple"), ["1", "3"]);
        let selectedItem = result.current.selectedItem;
        expect(screen.getByLabelText(/Nom/i).value).toBe(selectedItem.nom);
        expect(screen.getByLabelText(/Description/i).value).toBe(selectedItem.description);
        expect(screen.getByLabelText(/États des US/i).firstChild.innerHTML).toBe(selectedItem.etat || "Sélectionner un état pour l'US");
        expect(screen.getByLabelText(/dateLancementEstimeeEmpty/i).innerHTML).toBe("Pick a date");
        expect(screen.getByLabelText(/dateLancementEffectiveEmpty/i).innerHTML).toBe("Pick a date");
        expect(screen.getByLabelText(/Commentaires/i).value).toBe(selectedItem.commentaires );

    })

    test("EditItem modifie bien les valeurs du sprint", () => {
        render(<TreeView/>);
        render(<RightPanel/>);

        var { result } = renderHook(() => useTreeStore())
        fireEvent.click(screen.getByText(/Sprint1/i))
        let selectedItem = result.current.selectedItem;
        
        const startDate = new Date();
        startDate.setFullYear(2024);
        startDate.setMonth(6);
        startDate.setDate(5)
        const endDate = new Date();
        endDate.setFullYear(2024);
        endDate.setMonth(6);
        endDate.setDate(14)
        let editedItem = {
            nom: 'newNom',
            description: "newDesc",
            id: selectedItem.id,
            statut: nativeUserStoryStateEnum.Terminee,
            datesEstimee: {from:startDate.toDateString(), to:endDate.toDateString()},
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
        expect(screen.getByLabelText(/États des US/i).firstChild?.innerHTML).toBe(editedItem.statut || "");
        expect(screen.getByLabelText(/dateLancementEstimeeFull/i).innerHTML).toBe(
            format(editedItem.datesEstimee.from, "LLL dd, y") +" - "+ format(editedItem.datesEstimee.to, "LLL dd, y"));
        expect(screen.getByLabelText(/dateLancementEffectiveFull/i).innerHTML).toBe(
            format(editedItem.datesEffectives.from, "LLL dd, y") +" - "+ format(editedItem.datesEffectives.to, "LLL dd, y"));
        expect(screen.getByLabelText(/Commentaires/i).value).toBe(editedItem.commentaires );

    })

   
});
