import React, { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
     const navigate = useNavigate();
     const { isLogged, islogout } = useStateContext();
     useEffect(() => {
          if (isLogged === false) {
               navigate("/");
          }
          console.log(islogout);
     }, []);

     console.log("Dashboard" + " " + islogout);

     return (
          <div className="flex justify-center items-center h-full w-full text-white text-[100px]">
               Dashboard
          </div>
     );
}
