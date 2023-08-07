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

export default function ViewCategory() {
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

     const deleteCategory = (categoryId) => {
          fetch(`http://localhost:3001/categories/${categoryId}`, {
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
          toast.error("category deleted successfully");
     };

     return (
          <div className="flex justify-center items-start h-full w-full p-10">
               <TableContainer component={Paper} className="full shadow-md">
                    <Table>
                         <TableHead className="bg-slate-800">
                              <TableRow>
                                   <TableCell className="text-white w-1/3">ID</TableCell>
                                   <TableCell className="text-white w-1/3">Category name</TableCell>
                                   <TableCell className="text-white w-1/3">Actions</TableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {categories.map((category) => (
                                   <TableRow key={category.id} className="bg-slate-600">
                                        <TableCell className="text-white">{category.id}</TableCell>
                                        <TableCell className="text-white">
                                             {category.add_category}
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
