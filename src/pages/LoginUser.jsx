import React, { useState, useEffect } from "react";
import { loginFormData } from "../data/dummy";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { LoginFormValidation } from "../data/schema";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function LoginUser() {
     const navigate = useNavigate();

     const { setIsLogged, islogout, setIsLogout } = useStateContext();

     const [errorMassage, setErrorMassage] = useState();
     const auth = getAuth();
     const loginFormDataValues = loginFormData;
     const initialValues = {
          email: "",
          password: "",
     };

     const { values, errors, touched, handleChange, handleSubmit } = useFormik({
          initialValues,
          validationSchema: LoginFormValidation,
          onSubmit: (values, action) => {
               // Firebase
               signInWithEmailAndPassword(auth, values.email, values.password)
                    .then((userCredential) => {
                         // Signed in
                         setIsLogged(true);
                         setIsLogout(false);
                         toast.success("Log in Successfully");
                         navigate("/dashboard");
                         // ...
                    })
                    .catch((error) => {
                         setErrorMassage(error.message);
                         toast.error(error.message);
                    });

               action.resetForm();
          },
     });

     return (
          <div className="fixed top-0 left-0 dark:bg-slate-900 bg-white flex items-center justify-center h-screen w-screen">
               <div className="p-7 shadow-sm dark:bg-slate-800 bg-slate-200  w-1/3">
                    <div>
                         <span className="dark:text-white text-xl mb-4 inline-block">
                              Log in user here ... 👇
                         </span>
                         <form onSubmit={handleSubmit}>
                              {loginFormDataValues.map((item, index) => {
                                   return (
                                        <div key={index} className="my-5 text-white">
                                             <TextField
                                                  {...item}
                                                  value={values[item.name]}
                                                  variant="filled"
                                                  className="w-full text-white"
                                                  color="primary"
                                                  onChange={handleChange}
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
                                   Login now
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
