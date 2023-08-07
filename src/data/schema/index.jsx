import * as Yup from "yup";

export const RegistrationFormValidation = Yup.object({
     username: Yup.string().min(2).max(20).required("Please enter a username"),
     email: Yup.string().email().required("Please enter a email address"),
     password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .matches(
               /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
               "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
          )
          .required("please enter a password"),
     coPassword: Yup.string().oneOf([Yup.ref("password"), null], "Password dose't match"),
});

export const LoginFormValidation = Yup.object({
     email: Yup.string().email().required("Please enter a email address"),
     password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .matches(
               /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
               "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
          )
          .required("please enter a password"),
});

export const AddCategoryValidation = Yup.object({
     add_category: Yup.string().min(2).required("Please enter a category"),
});

export const AddSubCategoryValidation = Yup.object({
     add_sub_category: Yup.string().min(2).required("Please enter a sub category"),
     select_category: Yup.string().required("Please select a category"),
});

export const AddProductValidation = Yup.object({
     product_name: Yup.string().min(2).required("Please enter a product name"),
     product_image: Yup.string().required("Please enter a product image url"),
     product_new_price: Yup.string().min(2).required("please enter product new price"),
     product_old_price: Yup.string().min(2).required("please enter product old price"),
     product_category: Yup.string().required("please select product category"),
     product_sub_category: Yup.string().required("please select product sub category"),
     product_stock: Yup.number().required("please enter product stock details"),
     product_rating: Yup.string().required("please select product rating"),
     product_description: Yup.string().min(10).required("Please enter product description"),
});
