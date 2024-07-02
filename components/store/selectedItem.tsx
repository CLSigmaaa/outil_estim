
import { Item } from '@/app/model/projet'
import { create } from 'zustand'

interface SelectedItemState {
  selectedItem: Item
}

interface SelectedItemAction {
  updateSelectedItem: (firstName: SelectedItemState['selectedItem']) => void
}

export const useSelectedItemStore = create<SelectedItemState & SelectedItemAction>()((set) => ({
  selectedItem: {
    nom: "",
    description: "",
    id: "",
    priorite: "",
    statut: "",
    technologies: "",
    complexite: "",
    estimation: "",
    datesEstimee: "",
    datesEffectives: "",
    children: [],
    type: "",
  },
  updateSelectedItem: (newSelectedItem:Item) => set({selectedItem: newSelectedItem}),
}))