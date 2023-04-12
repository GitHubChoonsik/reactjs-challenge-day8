import { useRecoilState, useSetRecoilState } from "recoil";
import { categoriesState, categoryState } from "./atoms";
import { useForm } from "react-hook-form";

interface IForm {
  category: string;
}

const errorStyle = {
  color: "red",
};

function CreateCategory() {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const setCategory = useSetRecoilState(categoryState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const handleValid = ({ category }: IForm) => {
    setCategories((oldCategories) => [category, ...oldCategories]);
    setCategory(category);
    setValue("category", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        type="text"
        {...register("category", {
          required: "Please write a category",
          validate: {
            duplicate: (v) =>
              !categories.includes(v) || "Please enter non-duplicate category",
          },
        })}
        placeholder="Add a category"
      />
      <button>+</button>
      {errors.category && <h5 style={errorStyle}>{errors.category.message}</h5>}
    </form>
  );
}

export default CreateCategory;
