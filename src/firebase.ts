import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

        const firebaseConfig = {
            apiKey: "AIzaSyBw8iBdHymDuqlIBfE-U963EOefICgtBm4",
            authDomain: "market-app-7877b.firebaseapp.com",
            projectId: "market-app-7877b",
            storageBucket: "market-app-7877b.appspot.com",
            messagingSenderId: "366094043092",
            appId: "1:366094043092:web:c71e35418b587d3820b841"
}
        const app = initializeApp(firebaseConfig);
    export const storage = getStorage(app);