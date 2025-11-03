import { create } from "zustand";
import type {List ,ShowList ,newDataProps} from '../type/Type'


type Store = {
  count: ShowList;
  addList: (data: List) => void;
  editList: (id: number, newData: newDataProps) => void;
  deleteList: (id: number) => void;
};

const localStorageList = localStorage.getItem("List");
const List = localStorageList ? JSON.parse(localStorageList) : null;

const useAddList = create<Store>((set) => ({
  count: List || [],
  addList: (data: List) => set((state) => ({ count: [...state.count, data] })),
  editList: (id: number, newData: newDataProps) =>
    set((state) => ({
      count: state.count.map((item) =>
        item.id === id ? { ...item, ...newData } : item
      ),
    })),
  deleteList: (id: number) =>
    set((state) => ({
      count: state.count.filter((item) => item.id !== id),
    })),
}));

export { useAddList };
