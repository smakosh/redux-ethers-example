import { configureStore } from "@reduxjs/toolkit";
import userReducer from "features/auth/redux/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { openseaApi } from "utils/openseaApi";

export const store = configureStore({
	reducer: {
		user: userReducer,
		[openseaApi.reducerPath]: openseaApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(openseaApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
