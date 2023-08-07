import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
     Table,
     TableBody,
     TableCell,
     TableContainer,
     TableHead,
     TableRow,
     Paper,
     Button,
} from "@mui/material";

export default function ViewProduct() {
     const navigate = useNavigate();
     const { isLogged, setIsLogged } = useStateContext();
     const [categories, setCategories] = useState([]);
     useEffect(() => {
          if (isLogged === false) {
               navigate("/");
          }
     }, []);

     useEffect(() => {
          fetch("http://localhost:3001/product-details")
               .then((response) => response.json())
               .then((data) => setCategories(data))
               .catch((error) => console.error("Error fetching categories:", error));
     }, []);

     const deleteCategory = (categoryId) => {
          fetch(`http://localhost:3001/product-details/${categoryId}`, {
               method: "DELETE",
          })
               .then((response) => response.json())
               .then((data) => {
                    // Remove the deleted category from the state
                    setCategories((prevCategories) =>
                         prevCategories.filter((category) => category.id !== categoryId)
                    );
               })
               .catch((error) => console.error("Error deleting category:", error));
          toast.error("Product Deleted Successfully");
     };

     return (
          <div className="flex justify-center items-start h-full w-full p-10">
               <TableContainer component={Paper} className="full shadow-md">
                    <Table>
                         <TableHead className="bg-slate-800">
                              <TableRow>
                                   <TableCell className="text-white w-1/12">ID</TableCell>
                                   <TableCell className="text-white w-1/12">Name</TableCell>
                                   <TableCell className="text-white w-1/12">Image</TableCell>
                                   <TableCell className="text-white w-1/12">Category</TableCell>
                                   <TableCell className="text-white w-1/12">Sub category</TableCell>
                                   <TableCell className="text-white w-1/12">New price</TableCell>
                                   <TableCell className="text-white w-1/12">Old price</TableCell>
                                   <TableCell className="text-white w-1/12">Stock</TableCell>
                                   <TableCell className="text-white w-1/12">Rating</TableCell>
                                   <TableCell className="text-white w-2/12">Description</TableCell>
                                   <TableCell className="text-white w-2/12">Action</TableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {categories.map((category) => (
                                   <TableRow key={category.id} className="bg-slate-600">
                                        <TableCell className="text-white">{category.id}</TableCell>
                                        <TableCell className="text-white">
                                             {category.product_name}
                                        </TableCell>
                                        <TableCell className="text-white">
                                             <img
                                                  src={category.product_image}
                                                  alt={category.product_name}
                                                  className=" h-14 w-14 object-cover"
                                             />
                                        </TableCell>
                                        <TableCell className="text-white">
                                             {category.product_category}
                                        </TableCell>
                                        <TableCell className="text-white">
                                             {category.product_sub_category}
                                        </TableCell>
                                        <TableCell className="text-white">
                                             {category.product_new_price}
                                        </TableCell>
                                        <TableCell className="text-white">
                                             {category.product_old_price}
                                        </TableCell>
                                        <TableCell className="text-white">
                                             {category.product_stock}
                                        </TableCell>
                                        <TableCell className="text-white">
                                             {category.product_rating}
                                        </TableCell>
                                        <TableCell className="text-white">
                                             {category.product_description}
                                        </TableCell>
                                        <TableCell className="text-white">
                                             <Button
                                                  variant="contained"
                                                  color="error"
                                                  onClick={() => deleteCategory(category.id)}
                                             >
                                                  Delete
                                             </Button>
                                        </TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>
                    </Table>
               </TableContainer>
          </div>
     );
}
