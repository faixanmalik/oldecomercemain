import { create } from "zustand";

export interface HeaderStoreType {
  text: string;
  disabledSave: boolean;
  handleSave: any;
  handleDiscard: any;
  setHandleSave: (handleSave: any) => void;
  setHandleDiscard: (handleDiscard: any) => void;
  setText: (text: string) => void;
  setDisabledSave: (disabledSave: boolean) => void;
}

export const useHeaderStore = create((set) => ({
  text: "",
  disabledSave: true,
  handleSave: null,
  handleDiscard: null,
  setHandleSave: (handleSave: any) => set({ handleSave }),
  setHandleDiscard: (handleDiscard: any) => set({ handleDiscard }),
  setText: (text: string) => set({ text }),
  setDisabledSave: (disabledSave: boolean) => set({ disabledSave }),
}));
