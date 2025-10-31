import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddList } from "../store/List";
import { showToastMessage } from "./../hook/ShowToastMessage ";
import { ToastContainer } from "react-toastify";

const schema = yup.object().shape({
  title: yup.string().required("عنوان الزامی است"),
  subtitle: yup.string().required("توضیحات الزامی است"),
});

function formatDate(date: Date): string {
  const year: number = date.getFullYear();
  const month: string = String(date.getMonth() + 1).padStart(2, "0");
  const day: string = String(date.getDate()).padStart(2, "0");
  const hours: string = String(date.getHours()).padStart(2, "0");
  const minutes: string = String(date.getMinutes()).padStart(2, "0");
  const seconds: string = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

interface FormData {
  title: string;
  subtitle: string;
}

interface FormProps {
  id?: number | null;
  initialValues?: FormData;
}

const Form: React.FC<FormProps> = () => {
  const { addList, count } = useAddList();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Title:", data.title);
    console.log("Subtitle:", data.subtitle);
    const id = new Date().getTime();
    const date = formatDate(new Date());
    addList({ ...data, id, date });
    localStorage.setItem(
      "List",
      JSON.stringify([...count, { ...data, id, date }])
    );
    showToastMessage("لیست کار جدید ایجاد شد");
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded"
    >
      <h2 className="text-xl font-semibold mb-4"> </h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="title">
          عنوان
        </label>
        <input
          type="text"
          id="title"
          {...register("title")}
          className={`border rounded w-full p-2 ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="subtitle">
          توضیحات
        </label>
        <input
          type="text"
          id="subtitle"
          {...register("subtitle")}
          className={`border rounded w-full p-2 ${
            errors.subtitle ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.subtitle && (
          <p className="text-red-500 text-sm">{errors.subtitle.message}</p>
        )}
      </div>

      <button
        type="submit"
        style={{ backgroundColor: "black" }}
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        ارسال
      </button>
      <ToastContainer />
    </form>
  );
};

export default Form;
