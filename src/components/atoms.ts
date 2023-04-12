import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const categoryState = atom<string>({
  key: "category",
  default: "TO DO",
  effects: [persistAtom],
});

export const categoriesState = atom<string[]>({
  key: "categories",
  default: ["TO DO", "DOING", "DONE"],
  effects: [persistAtom],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
