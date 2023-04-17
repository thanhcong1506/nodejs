import * as yup from "yup";

const phoneRules = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const basicSchema = yup.object().shape({
  name: yup.string().required("Required"),
  city: yup.string().required("Required"),
  type: yup.string().required("Required"),
  address: yup.string().required("Required"),
  distance: yup.string().required("Required"),
  title: yup.string().required("Required"),
  desc: yup.string().required("Required"),
  price: yup.string().required("Required"),
  image: yup.string().required("Required"),
  featured: yup.string().required("Required"),
  rooms: yup.array().required("Required"),
});
