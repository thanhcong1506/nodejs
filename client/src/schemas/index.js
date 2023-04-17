import * as yup from "yup";

const phoneRules = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const basicSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please input name")
    .min(4, "Must be 4 characters or more"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter a  email"),
  phone: yup
    .string()
    .matches(phoneRules, { message: "Please input a valid phone number" })
    .required("Please input a phone number"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Please input password"),
  confirmPassword: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please input password confirm" })
    .required("Please input password confirm")
    .oneOf([yup.ref("password"), null], "Password must match"),
  // address: yup.string().required("Please input address"),
});
export const checkOutSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please input name")
    .min(4, "Must be 4 characters or more"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter a  email"),
  phone: yup
    .string()
    .matches(phoneRules, { message: "Please input a valid phone number" })
    .required("Please input a phone number"),

  address: yup.string().required("Please input address"),
});
