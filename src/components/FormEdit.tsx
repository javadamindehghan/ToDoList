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

interface FormData {
  title: string;
  subtitle: string;
}

interface FormProps {
  id?: number;
  initialValues?: FormData;
}

const FormEdit: React.FC<FormProps> = ({ id , initialValues }: FormProps) => {
  const { editList, count } = useAddList();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues || { title: "", subtitle: "" },
  });


  const onSubmit = (data: FormData) => {
    if (id) {
       editList(id , { ...data  });
    }
   
    localStorage.setItem(
      "List",
      JSON.stringify(
        count.map((item) => (item.id === id ? { ...item, ...data } : item))
      )
    );

    showToastMessage("ویرایش انجام شد");
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-4 bg-white shadow-md rounded"
      >
        <h2 className="text-xl font-semibold mb-4">ویرایش اطلاعات</h2>

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
          style={{ backgroundColor: "black" }}
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          تایید
        </button>
      </form>
    </>
  );
};

export default FormEdit;
