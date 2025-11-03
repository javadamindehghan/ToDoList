import * as yup from "yup";
export const schema = yup.object().shape({
  title: yup.string().required("عنوان الزامی است"),
  subtitle: yup.string().required("توضیحات الزامی است"),
});