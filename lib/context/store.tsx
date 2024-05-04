import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "@/lib/context/sidebarSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
  },
});
