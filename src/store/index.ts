import { create } from 'zustand'

type Store = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  editBook: any,
  setEditBook: (book: any) => void,

}
export const useStore = create<Store>()((set) => ({
  isOpen: false,
  setIsOpen: (value: boolean) => set((state) => ({ ...state, isOpen: value })),
  editBook: null,
  setEditBook: (book: any) => set({ editBook: book }),
}));
