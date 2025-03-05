// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_KEY = '253c4bf1';


// export const fetchMovie = createAsyncThunk('movie/fetchMovie', async (title) => {
//     const response = await axios.get(`https://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`);
//     return response.data;
// });

// const movieSlice = createSlice({
//     name: 'movie',
//     initialState: {
//         movie: null,
//         loading: false,
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchMovie.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchMovie.fulfilled, (state, action) => {
//                 state.loading = false;
//                 if (action.payload.Response === "True") {
//                     state.movie = action.payload;
//                 } else {
//                     state.error = "Movie not found";
//                     state.movie = null;
//                 }
//             })
//             .addCase(fetchMovie.rejected, (state) => {
//                 state.loading = false;
//                 state.error = "Failed to fetch movie details";
//             });
//     },
// });

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "253c4bf1";

export const fetchMovies = createAsyncThunk("movie/fetchMovies", async (title) => {
    const response = await axios.get(`http://www.omdbapi.com/?s=${title}&apikey=${API_KEY}`);
    return response.data.Search || [];
});

export const fetchMovie = createAsyncThunk("movie/fetchMovie", async (title) => {
    const response = await axios.get(`http://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`);
    return response.data;
});

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        movies: [],
        movie: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to fetch movies";
            })
            .addCase(fetchMovie.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.movie = action.payload;
            })
            .addCase(fetchMovie.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to fetch movie details";
            });
    },
});

export default movieSlice.reducer;
