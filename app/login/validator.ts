import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().email().required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters or long")
    .required("Password is required"),
});

export default validationSchema;
