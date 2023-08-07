import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { RegistrationUser } from "../data/dummy";
import { useFormik } from "formik";
import { RegistrationFormValidation } from "../data/schema";
import { toast } from "react-toastify";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

export default function AddUser() {
     const navigate = useNavigate();
     const { isLogged, setIsLogged } = useStateContext();
     useEffect(() => {
          if (isLogged === false) {
               navigate("/");
          }
     }, []);

     const auth = getAuth();
     const [errorMassage, setErrorMassage] = useState();

     const initialValues = {
          username: "",
          email: "",
          password: "",
          coPassword: "",
     };

     const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
          initialValues,
          validationSchema: RegistrationFormValidation,
          onSubmit: (values, action) => {
               // Firebase
               createUserWithEmailAndPassword(auth, values.email, values.password)
                    .then((userCredential) => {
                         // Signed in
                         const user = userCredential.user;
                         // Toast
                         toast.success("Account Created Successfully");
                         // ...
                    })
                    .catch((error) => {
                         setErrorMassage(error.message);
                         toast.error(error.message);
                         // ..
                    });

               action.resetForm();
          },
     });

     const RegistrationUserValue = RegistrationUser;
     return (
          <div className="flex h-full w-full justify-center items-center">
               <div className="p-7 shadow-sm  w-1/2">
                    <div>
                         <span className="dark:text-white text-xl mb-4 inline-block">
                              Register user here ... 👇
                         </span>
                         <form onSubmit={handleSubmit}>
                              {RegistrationUserValue.map((item, index) => {
                                   return (
                                        <div key={index} className="my-5 text-white">
                                             <TextField
                                                  {...item}
                                                  value={values[item.name]}
                                                  variant="filled"
                                                  className="w-full text-white bg-slate-800"
                                                  color="primary"
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                             />
                                             {errors[item.name] && touched[item.name] ? (
                                                  <p className="text-red-500 mt-2 capitalize">
                                                       {errors[item.name]}
                                                  </p>
                                             ) : null}
                                        </div>
                                   );
                              })}
                              <Button
                                   variant="contained"
                                   type="submit"
                                   className="w-full capitalize p-3 bg-blue-500"
                              >
                                   Register now
                              </Button>
                              {errorMassage ? (
                                   <p className="text-red-500 mt-3 text-center capitalize">
                                        {errorMassage}
                                   </p>
                              ) : null}
                         </form>
                    </div>
               </div>
          </div>
     );
}
