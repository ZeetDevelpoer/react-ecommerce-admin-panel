import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

import {
     Table,
     TableBody,
     TableCell,
     TableContainer,
     TableHead,
     TableRow,
     Paper,
} from "@mui/material";

export default function ViewUser() {
     const navigate = useNavigate();
     const { isLogged } = useStateContext();
     const [userData, setUserData] = useState([]);

     useEffect(() => {
          if (isLogged === false) {
               navigate("/");
          } else {
               // Fetch user data from Firebase and update the state
               const fetchUserData = async () => {
                    try {
                         const response = await firebase.auth().listUsers();
                         const users = response.users.map((user) => ({
                              id: user.uid,
                              email: user.email,
                              password: user.password, // Note: You cannot retrieve the actual password from Firebase, so this might be an empty string or null
                         }));
                         setUserData(users);
                    } catch (error) {
                         console.log("Error fetching user data:", error);
                    }
               };

               fetchUserData();
          }
     }, [isLogged, navigate]);

     return (
          <div className="flex justify-center items-start h-full w-full p-10">
               <TableContainer component={Paper} className="full shadow-md">
                    <Table>
                         <TableHead className="bg-slate-800">
                              <TableRow>
                                   <TableCell className="text-white w-1/3">ID</TableCell>
                                   <TableCell className="text-white w-1/3">Email Address</TableCell>
                                   <TableCell className="text-white w-1/3">Password</TableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {userData.map((user) => (
                                   <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.password}</TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>
                    </Table>
               </TableContainer>
          </div>
     );
}
