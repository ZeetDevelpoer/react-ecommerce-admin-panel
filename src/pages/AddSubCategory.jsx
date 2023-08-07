import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { addSubCategoryData } from "../data/dummy";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useFormik } from "formik";
import { AddSubCategoryValidation } from "../data/schema";
import { toast } from "react-toastify";

export default function AddSubCategory() {
     const navigate = useNavigate();
     const { isLogged } = useStateContext();
     const [categories, setCategories] = useState([]);

     useEffect(() => {
          if (isLogged === false) {
               navigate("/");
          }
     }, []);

     useEffect(() => {
          fetch("http://localhost:3001/categories")
               .then((response) => response.json())
               .then((data) => setCategories(data))
               .catch((error) => console.error("Error fetching categories:", error));
     }, []);

     const addSubCategoryValue = addSubCategoryData;

     const initialValues = {
          add_sub_category: "",
          select_category: "",
     };

     const { values, errors, touched, handleChange, handleSubmit, resetForm } = useFormik({
          initialValues,
          validationSchema: AddSubCategoryValidation,
          onSubmit: (values) => {
               const newSubCategory = {
                    sub_category: values.add_sub_category,
                    category: values.select_category,
               };

               fetch("http://localhost:3001/sub-categories", {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newSubCategory),
               })
                    .then((response) => response.json())
                    .then((data) => {
                         toast.success("sub category added successfully");
                         resetForm();
                    })
                    .catch((error) => toast.error("Error adding subcategory:", error));
          },
     });

     return (
          <div className="flex h-full w-full justify-center items-center">
               <div className="p-7 shadow-sm  w-1/2">
                    <div>
                         <span className="dark:text-white text-xl mb-8 inline-block">
                              Add sub category here ... 👇
                         </span>
                         <form onSubmit={handleSubmit}>
                              <FormControl className="w-full border-2 border-blue-100">
                                   <InputLabel
                                        id="select-label"
                                        className="bg-slate-700 px-2 text-slate-300"
                                   >
                                        Select category
                                   </InputLabel>
                                   <Select
                                        labelId="select-label"
                                        id="select"
                                        onChange={handleChange}
                                        name="select_category"
                                        value={values.select_category}
                                   >
                                        {categories.map((category) => (
                                             <MenuItem
                                                  key={category.id}
                                                  value={category.add_category}
                                             >
                                                  {category.add_category}
                                             </MenuItem>
                                        ))}
                                   </Select>
                                   {errors.select_category && touched.select_category ? (
                                        <p className="text-red-500 mt-2">
                                             {errors.select_category}
                                        </p>
                                   ) : null}
                              </FormControl>
                              {addSubCategoryValue.map((item, index) => {
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
                                                  <p className="text-red-500 mt-2">
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
                                   Add sub category
                              </Button>
                         </form>
                    </div>
               </div>
          </div>
     );
}
