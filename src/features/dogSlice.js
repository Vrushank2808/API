import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBreeds = createAsyncThunk('dog/fetchBreeds', async () => {
    const response = await axios.get('https://dog.ceo/api/breeds/list/all');
    return response.data.message;
});

export const fetchSubBreeds = createAsyncThunk('dog/fetchSubBreeds', async (breed) => {
    const response = await axios.get(`https://dog.ceo/api/breed/${breed}/list`);
    return response.data.message;
});

export const fetchBreedImage = createAsyncThunk('dog/fetchBreedImage', async (breed) => {
    const response = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
    return response.data.message;
});

export const fetchSubBreedImage = createAsyncThunk('dog/fetchSubBreedImage', async ({ breed, subBreed }) => {
    const response = await axios.get(`https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`);
    return response.data.message;
});

const dogSlice = createSlice({
    name: 'dog',
    initialState: {
        breeds: [],
        subBreeds: [],
        breedImage: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBreeds.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBreeds.fulfilled, (state, action) => {
                state.loading = false;
                state.breeds = Object.keys(action.payload);
            })
            .addCase(fetchBreeds.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchSubBreeds.fulfilled, (state, action) => {
                state.subBreeds = action.payload;
            })
            .addCase(fetchBreedImage.fulfilled, (state, action) => {
                state.breedImage = action.payload;
            })
            .addCase(fetchSubBreedImage.fulfilled, (state, action) => {
                state.breedImage = action.payload;
            });
    },
});

export default dogSlice.reducer;
