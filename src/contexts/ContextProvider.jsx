// ContextProvider.jsx
import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
     const [activeMenu, setActiveMenu] = useState(true);
     const [isLogged, setIsLogged] = useState(false);
     const [islogout, setIsLogout] = useState(true);

     return (
          <StateContext.Provider
               value={{ activeMenu, setActiveMenu, isLogged, setIsLogged, islogout, setIsLogout }}
          >
               {children}
          </StateContext.Provider>
     );
};

export const useStateContext = () => useContext(StateContext);
