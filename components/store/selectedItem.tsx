
import { Item, Projet } from '@/app/model/projet'
import { create } from 'zustand'

interface SelectedItemState {
  selectedItem: undefined | any;
  setSelectedItem: (newSelectedItem: any) => void;
}

export const useSelectedItemStore = create<SelectedItemState>()((set) => ({
  selectedItem: undefined,
  setSelectedItem: (newSelectedItem) => set({ selectedItem: newSelectedItem }),
}))
