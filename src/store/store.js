import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weatherSlice";
import dogReducer from "../features/dogSlice";
import movieReducer from "../features/movieSlice";

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        dog: dogReducer,
        movie: movieReducer,
    },
}); 