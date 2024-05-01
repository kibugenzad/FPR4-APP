import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email().required("Email address is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters or long")
    .required("Password is required"),
});

export default validationSchema;
