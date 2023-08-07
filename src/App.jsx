// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContextProvider, useStateContext } from "./contexts/ContextProvider";
import { Sidebar, Navbar } from "./components";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import {
     Dashboard,
     LoginUser,
     AddUser,
     ViewUser,
     AddCategory,
     ViewCategory,
     AddSubCategory,
     ViewSubCategory,
     AddProducts,
     ViewProduct,
} from "./pages";

export default function App() {
     return (
          <ContextProvider>
               <AppContent />
               <ToastContainer />
          </ContextProvider>
     );
}

function AppContent() {
     const { activeMenu } = useStateContext();

     return (
          <BrowserRouter>
               <div className="flex relative">
                    {activeMenu ? (
                         <div className="w-72 fixed sidebar dark:bg-slate-900 bg-white shadow-md ">
                              <Sidebar />
                         </div>
                    ) : (
                         <div className="w-0 dark:bg-slate-900 bg-white shadow-md ">
                              <Sidebar />
                         </div>
                    )}
                    <div
                         className={`dark:bg-slate-800 bg-white min-h-screen w-full flex-2 ${
                              activeMenu ? `md:ml-72` : `flex-2`
                         }`}
                    >
                         <div className="fixed md:static p-3 dark:bg-slate-900 bg-white navbar w-full ">
                              <Navbar />
                         </div>
                         <div
                              className="bg-slate-700 overflow-auto "
                              style={{
                                   height: `calc(100vh - 80px`,
                              }}
                         >
                              <Routes>
                                   {/* Dashboard */}
                                   <Route path="/" element={<LoginUser />} />
                                   <Route path="/dashboard" element={<Dashboard />} />

                                   {/* User */}
                                   <Route path="/addUser" element={<AddUser />} />
                                   <Route path="/viewUser" element={<ViewUser />} />

                                   {/* Category */}
                                   <Route path="/addCategory" element={<AddCategory />} />
                                   <Route path="/viewCategory" element={<ViewCategory />} />

                                   {/* Sub Category */}
                                   <Route path="/addSubCategory" element={<AddSubCategory />} />
                                   <Route path="/viewSubCategory" element={<ViewSubCategory />} />

                                   {/* Products */}
                                   <Route path="/addProducts" element={<AddProducts />} />
                                   <Route path="/viewProduct" element={<ViewProduct />} />
                              </Routes>
                         </div>
                    </div>
               </div>
          </BrowserRouter>
     );
}
