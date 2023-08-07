import React from "react";
import { Link, NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { links } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";

export default function Sidebar() {
     const { activeMenu, setActiveMenu } = useStateContext();

     const activeLink = `flex shadow-md items-center gap-5 pl-4 pt-3 pb-2.5 text-[15px]  rounded-lg bg-blue-500 text-white dark:text-white text-md m-2`;
     const normalLink = `flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-[15px] text-gray-700 dark:text-gray-400 dark:hover:text-white dark:hover:bg-slate-800/40  hover:bg-gray-100/70 m-2 text-md `;

     return (
          <section aria-label="side-bar" className="h-screen p-5 scrollable-div">
               {activeMenu && (
                    <div>
                         <div className="flex justify-between items-center">
                              <Link
                                   to="/"
                                   onClick={() => {}}
                                   className="text-xl flex items-center dark:text-white text-slate-900 font-medium"
                              >
                                   <DashboardIcon /> <span className="ml-2 ">Dashboard</span>
                              </Link>
                              <IconButton
                                   aria-label="sidebar-close-button"
                                   onClick={() => setActiveMenu(false)}
                              >
                                   <CloseIcon className="text-slate-900 dark:text-white" />
                              </IconButton>
                         </div>
                         <div className="mt-7 ">
                              {links.map((item, index) => (
                                   <div key={index}>
                                        <div className="my-3 p-2 capitalize  dark:text-white text-slate-900">
                                             {item.title}
                                        </div>
                                        {item.links.map((link, index) => (
                                             <NavLink
                                                  key={index}
                                                  to={`/${link.name}`}
                                                  className={({ isActive }) =>
                                                       isActive ? activeLink : normalLink
                                                  }
                                             >
                                                  {link.icon}
                                                  {link.title}
                                             </NavLink>
                                        ))}
                                   </div>
                              ))}
                         </div>
                    </div>
               )}
          </section>
     );
}
