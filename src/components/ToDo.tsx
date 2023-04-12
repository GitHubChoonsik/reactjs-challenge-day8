import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, categoriesState, toDoState } from "./atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const displayCategories = categories.filter((cat) => cat !== category);
  return (
    <li>
      {text}
      {displayCategories.map((cat) => (
        <button key={cat} name={cat} onClick={onClick}>
          {cat}
        </button>
      ))}
    </li>
  );
}

export default ToDo;
