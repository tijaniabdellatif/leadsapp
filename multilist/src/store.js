import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import profileSlice from "./features/profile/profileSlice";

export const store = configureStore({

    reducer:{

        user:userSlice,
        profile:profileSlice
        
    }
})