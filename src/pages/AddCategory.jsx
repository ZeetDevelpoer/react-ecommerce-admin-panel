import React, { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { addCategoryData } from "../data/dummy";
import { useFormik } from "formik";
import { AddCategoryValidation } from "../data/schema";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddCategory() {
     const addCategoryValue = addCategoryData;
     const navigate = useNavigate();
     const { isLogged, setIsLogged } = useStateContext();
     useEffect(() => {
          if (isLogged === false) {
               navigate("/");
          }
     }, []);

     const initialValues = {
          add_category: "",
     };
     const { values, errors, touched, handleChange, handleSubmit } = useFormik({
          initialValues,
          validationSchema: AddCategoryValidation,
          onSubmit: async (values, action) => {
               try {
                    await axios.post("http://localhost:3001/categories", values);
                    toast.success("category added successfully");
                    action.resetForm();
               } catch (error) {
                    toast.error(error);
               }
          },
     });
     return (
          <div className="flex h-full w-full justify-center items-center">
               <div className="p-7 shadow-sm  w-1/2">
                    <div>
                         <span className="dark:text-white text-xl mb-4 inline-block">
                              Add category here ... 👇
                         </span>
                         <form onSubmit={handleSubmit}>
                              {addCategoryValue.map((item, index) => {
                                   return (
                                        <div key={index} className="my-5 text-white">
                                             <TextField
                                                  {...item}
                                                  value={values[item.name]}
                                                  variant="filled"
                                                  className="w-full text-white bg-slate-800"
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
                                   Add category
                              </Button>
                         </form>
                    </div>
               </div>
          </div>
     );
}
