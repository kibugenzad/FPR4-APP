import * as Yup from "yup";

const validationSchema = Yup.object({
  content: Yup.string().required("Content is required"),
});

export default validationSchema;
