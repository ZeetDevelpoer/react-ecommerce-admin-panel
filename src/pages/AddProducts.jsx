import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { AddProductValidation } from "../data/schema";
import axios from "axios";
import GradeIcon from "@mui/icons-material/Grade";
import { toast } from "react-toastify";

export default function AddProducts() {
     const navigate = useNavigate();
     const { isLogged } = useStateContext();

     useEffect(() => {
          if (!isLogged) {
               navigate("/");
          }
     }, [isLogged, navigate]);

     const [categories, setCategories] = useState([]);
     const [subCategories, setSubCategories] = useState([]);

     useEffect(() => {
          fetch("http://localhost:3001/categories")
               .then((response) => response.json())
               .then((data) => setCategories(data));

          fetch("http://localhost:3001/sub-categories")
               .then((response) => response.json())
               .then((data) => setSubCategories(data));
     }, []);

     const initialValues = {
          product_name: "",
          product_image: "",
          product_new_price: "",
          product_old_price: "",
          product_category: "",
          product_sub_category: "",
          product_stock: "",
          product_rating: "",
          product_description: "",
     };

     const { values, errors, touched, handleChange, handleSubmit } = useFormik({
          initialValues,
          validationSchema: AddProductValidation,
          onSubmit: (values, action) => {
               // Handle form submission
               console.log(values);

               // Make API request to store data in db.json
               axios.post("http://localhost:3001/product-details", values)
                    .then((response) => {
                         toast.success();
                         action.resetForm("Product added successfully!");
                    })
                    .catch((error) => {
                         toast.error("Error adding product:", error);
                    });
          },
     });

     return (
          <div className="flex w-full justify-center items-center h-[110vh] overflow-auto">
               <form className="w-1/2" onSubmit={handleSubmit}>
                    <span className="dark:text-white text-xl mb-7 inline-block">
                         Add product user here ... 👇
                    </span>
                    <div className="mb-5">
                         <TextField
                              variant="filled"
                              label="Product name here..."
                              name="product_name"
                              value={values.product_name}
                              onChange={handleChange}
                              className="bg-slate-800 w-full"
                         />
                         {errors.product_name && touched.product_name ? (
                              <p className="text-red-500 mt-2 capitalize">{errors.product_name}</p>
                         ) : null}
                    </div>
                    <div className="mb-5">
                         <TextField
                              variant="filled"
                              label="Product image url here..."
                              name="product_image"
                              value={values.product_image}
                              onChange={handleChange}
                              className="bg-slate-800 w-full"
                         />
                         {errors.product_image && touched.product_image ? (
                              <p className="text-red-500 mt-2 capitalize">{errors.product_image}</p>
                         ) : null}
                    </div>
                    <div className="mb-5 flex items-center">
                         <div className="w-1/2 me-2">
                              <TextField
                                   variant="filled"
                                   label="Product new price..."
                                   name="product_new_price"
                                   value={values.product_new_price}
                                   onChange={handleChange}
                                   className="bg-slate-800 w-full"
                              />
                              {errors.product_new_price && touched.product_new_price ? (
                                   <p className="text-red-500 mt-2 capitalize">
                                        {errors.product_new_price}
                                   </p>
                              ) : null}
                         </div>
                         <div className="w-1/2 ms-2">
                              <TextField
                                   variant="filled"
                                   label="Product old price..."
                                   name="product_old_price"
                                   value={values.product_old_price}
                                   onChange={handleChange}
                                   className="bg-slate-800 w-full"
                              />
                              {errors.product_old_price && touched.product_old_price ? (
                                   <p className="text-red-500 mt-2 capitalize">
                                        {errors.product_old_price}
                                   </p>
                              ) : null}
                         </div>
                    </div>
                    <div className="mb-5 flex items-center">
                         <div className="w-1/2 me-2">
                              <FormControl className="w-full border-2 border-blue-100">
                                   <InputLabel
                                        id="select-category-label"
                                        className="bg-slate-700 px-2 text-slate-300"
                                   >
                                        Select category here...
                                   </InputLabel>
                                   <Select
                                        labelId="select-category-label"
                                        id="select-category"
                                        name="product_category"
                                        value={values.product_category}
                                        onChange={handleChange}
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
                              </FormControl>
                              {errors.product_category && touched.product_category ? (
                                   <p className="text-red-500 mt-2 capitalize">
                                        {errors.product_category}
                                   </p>
                              ) : null}
                         </div>
                         <div className="w-1/2 ms-2">
                              <FormControl className="w-full border-2 border-blue-100">
                                   <InputLabel
                                        id="select-label"
                                        className="bg-slate-700 px-2 text-slate-300"
                                   >
                                        Select sub category here ...
                                   </InputLabel>
                                   <Select
                                        labelId="select-label"
                                        id="select"
                                        name="product_sub_category"
                                        value={values.product_sub_category}
                                        onChange={handleChange}
                                   >
                                        {subCategories
                                             .filter(
                                                  (subCategory) =>
                                                       subCategory.category ===
                                                       values.product_category
                                             )
                                             .map((subCategory) => (
                                                  <MenuItem
                                                       key={subCategory.id}
                                                       value={subCategory.sub_category}
                                                  >
                                                       {subCategory.sub_category}
                                                  </MenuItem>
                                             ))}
                                   </Select>
                              </FormControl>
                              {errors.product_sub_category && touched.product_sub_category ? (
                                   <p className="text-red-500 mt-2 capitalize">
                                        {errors.product_sub_category}
                                   </p>
                              ) : null}
                         </div>
                    </div>
                    <div className="mb-5 flex items-center">
                         <div className="w-1/2 me-2">
                              <TextField
                                   variant="filled"
                                   label="Product stock here..."
                                   name="product_stock"
                                   value={values.product_stock}
                                   onChange={handleChange}
                                   className="bg-slate-800 w-full"
                              />
                              {errors.product_stock && touched.product_stock ? (
                                   <p className="text-red-500 mt-2 capitalize">
                                        {errors.product_stock}
                                   </p>
                              ) : null}
                         </div>
                         <div className="w-1/2 ms-2">
                              <FormControl className="w-full border-2 border-blue-100">
                                   <InputLabel
                                        id="select-label"
                                        className="bg-slate-700 px-2 text-slate-300"
                                   >
                                        Select product rating here ...
                                   </InputLabel>
                                   <Select
                                        labelId="select-label"
                                        id="select"
                                        name="product_rating"
                                        value={values.product_rating}
                                        onChange={handleChange}
                                   >
                                        <MenuItem value="1 ">
                                             1 <GradeIcon />
                                        </MenuItem>
                                        <MenuItem value="2">
                                             2 <GradeIcon />
                                        </MenuItem>
                                        <MenuItem value="3">
                                             3 <GradeIcon />
                                        </MenuItem>
                                        <MenuItem value="4">
                                             4 <GradeIcon />
                                        </MenuItem>
                                        <MenuItem value="5">
                                             5 <GradeIcon />
                                        </MenuItem>
                                   </Select>
                              </FormControl>
                              {errors.product_rating && touched.product_rating ? (
                                   <p className="text-red-500 mt-2 capitalize">
                                        {errors.product_rating}
                                   </p>
                              ) : null}
                         </div>
                    </div>
                    <div className="mb-5">
                         <TextField
                              variant="filled"
                              label="Product description here..."
                              multiline
                              rows={7}
                              name="product_description"
                              value={values.product_description}
                              onChange={handleChange}
                              className="bg-slate-800 w-full"
                         />
                         {errors.product_description && touched.product_description ? (
                              <p className="text-red-500 mt-2 capitalize">
                                   {errors.product_description}
                              </p>
                         ) : null}
                    </div>
                    <Button
                         variant="contained"
                         type="submit"
                         className="w-full capitalize p-3 bg-blue-500"
                    >
                         Add product
                    </Button>
               </form>
          </div>
     );
}
