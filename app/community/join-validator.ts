import * as Yup from "yup";

const validationSchema = Yup.object({
  community: Yup.string().required("Community is required"),
});

export default validationSchema;
