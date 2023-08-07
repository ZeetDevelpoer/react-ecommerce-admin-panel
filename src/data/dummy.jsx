import React from "react";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import StreetviewIcon from "@mui/icons-material/Streetview";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PreviewSharpIcon from "@mui/icons-material/PreviewSharp";

export const links = [
     {
          title: "Dashboard",
          links: [
               {
                    title: "Dashboard",
                    name: "dashboard",
                    icon: <SpaceDashboardIcon />,
               },
          ],
     },

     {
          title: "User Registration",
          links: [
               {
                    title: "Add user",
                    name: "addUser",
                    icon: <PersonAddIcon />,
               },
               {
                    title: "View user",
                    name: "viewUser",
                    icon: <PersonIcon />,
               },
          ],
     },
     {
          title: "Product Category",
          links: [
               {
                    title: "Add category",
                    name: "addCategory",
                    icon: <CategoryIcon />,
               },
               {
                    title: "View category",
                    name: "viewCategory",
                    icon: <CalendarViewDayIcon />,
               },
          ],
     },
     {
          title: "Product Sub Category",
          links: [
               {
                    title: "Add sub category",
                    name: "addSubCategory",
                    icon: <StreetviewIcon />,
               },
               {
                    title: "View sub category",
                    name: "viewSubCategory",
                    icon: <ViewColumnIcon />,
               },
          ],
     },
     {
          title: "Products",
          links: [
               {
                    title: "Add products",
                    name: "addProducts",
                    icon: <Inventory2Icon />,
               },
               {
                    title: "View products",
                    name: "viewProduct",
                    icon: <PreviewSharpIcon />,
               },
          ],
     },
];

// log in Form

export const loginFormData = [
     {
          label: "Email address here ... ",
          name: "email",
          type: "email",
     },
     {
          label: "Password here ... ",
          name: "password",
          type: "password",
     },
];

export const RegistrationUser = [
     {
          label: "Username here ... ",
          name: "username",
          type: "text",
     },
     {
          label: "Email address Here ... ",
          name: "email",
          type: "email",
     },
     {
          label: "Password Here ... ",
          name: "password",
          type: "password",
     },
     {
          label: "Confirm password here ... ",
          name: "coPassword",
          type: "password",
     },
];

export const addCategoryData = [
     {
          label: "Add category here ... ",
          name: "add_category",
          type: "text",
     },
];

export const addSubCategoryData = [
     {
          label: "Add sub category here ... ",
          name: "add_sub_category",
          type: "text",
     },
];
