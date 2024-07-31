import { create } from 'zustand';
 
interface PanelManagerState {
  isLeftPanelVisible: boolean;
  isMiddlePanelVisible: boolean;
  isRightPanelVisible: boolean;
 
  toggleLeftPanel: () => void;
  toggleMiddlePanel: () => void;
  toggleRightPanel: () => void;
 
  setLeftPanelVisibility: (isVisible: boolean) => void;
  setMiddlePanelVisibility: (isVisible: boolean) => void;
  setRightPanelVisibility: (isVisible: boolean) => void;
}
 
export const usePanelManager = create<PanelManagerState>((set) => ({
  isLeftPanelVisible: true,
  isMiddlePanelVisible: true,
  isRightPanelVisible: true,
 
  toggleLeftPanel: () => set((state) => ({ isLeftPanelVisible: !state.isLeftPanelVisible })),
  toggleMiddlePanel: () => set((state) => ({ isMiddlePanelVisible: !state.isMiddlePanelVisible })),
  toggleRightPanel: () => set((state) => ({ isRightPanelVisible: !state.isRightPanelVisible })),
 
  setLeftPanelVisibility: (isVisible) => set({ isLeftPanelVisible: isVisible }),
  setMiddlePanelVisibility: (isVisible) => set({ isMiddlePanelVisible: isVisible }),
  setRightPanelVisibility: (isVisible) => set({ isRightPanelVisible: isVisible }),
}));