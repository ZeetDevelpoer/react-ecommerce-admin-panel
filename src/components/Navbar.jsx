import React, { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Button from "@mui/material/Button";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NavButton = (props) => {
     return (
          <>
               <IconButton
                    aria-label={props.title}
                    onClick={props.customFunction}
                    className={props.classnames}
               >
                    {props.icon}
               </IconButton>
          </>
     );
};

const Navbar = () => {
     const auth = getAuth();
     const { setActiveMenu } = useStateContext();

     const navigate = useNavigate();
     const handleLogOut = () => {
          signOut(auth)
               .then(() => {
                    // Sign-out successful.
                    toast.success("Successfully logged out");
                    navigate("/");
               })
               .catch((error) => {
                    // An error happened.
                    toast.error(error.message);
               });
     };

     return (
          <div className="flex justify-between items-center md:mx-2 p-2  relative">
               <NavButton
                    title="nav-slider-toggle-menu"
                    customFunction={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
                    icon={<MenuIcon />}
                    classnames="text-blue-500"
               />
               <div className="flex">
                    <NavButton
                         title="navbar-shopping-cart"
                         toggleFunction={() => handleClick("cart")}
                         icon={<ShoppingCartIcon />}
                         classnames="text-blue-500 mx-1"
                    />
                    <NavButton
                         title="navbar-chat-section"
                         toggleFunction={() => handleClick("chat")}
                         icon={<ChatIcon />}
                         classnames="text-blue-500 mx-1"
                    />
                    <NavButton
                         title="navbar-notification-section"
                         toggleFunction={() => handleClick("notification")}
                         icon={<NotificationsActiveIcon />}
                         classnames="text-blue-500 mx-1"
                    />
                    <div>
                         <Button
                              variant="contained"
                              className="bg-blue-500 py-2 capitalize ms-2"
                              onClickCapture={handleLogOut}
                         >
                              Log Out
                         </Button>
                    </div>
               </div>
          </div>
     );
};

export default Navbar;
