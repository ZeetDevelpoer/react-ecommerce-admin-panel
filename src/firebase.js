import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import additional Firebase SDKs if needed

const firebaseConfig = {
     // Your web app's Firebase configuration
     // ...
     apiKey: "AIzaSyCMA3T-y3gUiVmCHsA_k95FO5qXkHVHYkQ",
     authDomain: "react-ecommerce-admin-pannal.firebaseapp.com",
     projectId: "react-ecommerce-admin-pannal",
     storageBucket: "react-ecommerce-admin-pannal.appspot.com",
     messagingSenderId: "760585312330",
     appId: "1:760585312330:web:646cb10ddbf3b9b9986eb3",
     measurementId: "G-DPMKVPRMC0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
