// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
// import axios from 'axios'

// // Wearther API
// // `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
// // KEY : ccd0af738ca3c1cbd35a366c56130660

// // Dog API
// // https://dog.ceo/api/breeds/list/all
// // `https://dog.ceo/api/breed/${selectedBreed}/images/random`
// // `https://dog.ceo/api/breed/${selectedBreed}/list`
// // Sub-breed : `https://dog.ceo/api/breed/${selectedBreed}/${selectedSubBreed}/images/random`

// // Movie API
// // http://www.omdbapi.com/?i=tt3896198&apikey=${253c4bf1}

// const apiKey = 'ccd0af738ca3c1cbd35a366c56130660';

// export const fetchCities = createAsyncThunk('weather/fetchCities', async () => {
//     const response = await axios.get('/cities.json');
//     return response.data;
// });

// export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city) => {
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//     const response = await axios.get(url);
//     return response.data;
// });

// const weatherSlice = createSlice({
//     name: 'weather',
//     initialState: {
//         cities: [],
//         weather: null,
//         loading: false,
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchCities.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(fetchCities.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.cities = action.payload || [];
//             })
//             .addCase(fetchCities.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             })
//             .addCase(fetchWeather.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(fetchWeather.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.weather = action.payload;
//             })
//             .addCase(fetchWeather.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             });
//     },
// });

// export default weatherSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = 'ccd0af738ca3c1cbd35a366c56130660';

export const fetchCities = createAsyncThunk('weather/fetchCities', async () => {
    const response = await axios.get('/cities.json');
    return response.data;
});

export const fetchTodayWeather = createAsyncThunk('weather/fetchTodayWeather', async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    return response.data;
});

export const fetchForecast = createAsyncThunk('weather/fetchForecast', async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    return response.data;
});

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        cities: [],
        todayWeather: null,
        forecast: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCities.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCities.fulfilled, (state, action) => {
                state.loading = false;
                state.cities = action.payload || [];
            })
            .addCase(fetchCities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchTodayWeather.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTodayWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.todayWeather = action.payload;
            })
            .addCase(fetchTodayWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchForecast.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchForecast.fulfilled, (state, action) => {
                state.loading = false;

                const groupedForecast = action.payload.list.reduce((acc, item) => {
                    const date = item.dt_txt.split(' ')[0];
                    if (!acc[date]) acc[date] = [];
                    acc[date].push(item);
                    return acc;
                }, {});

                const today = new Date().toISOString().split('T')[0];

                delete groupedForecast[today];

                state.forecast = Object.entries(groupedForecast)
                    .slice(0, 6) 
                    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
            })
            .addCase(fetchForecast.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default weatherSlice.reducer;
