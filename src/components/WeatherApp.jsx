import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities, fetchTodayWeather, fetchForecast } from '../features/weatherSlice';
import LoadingScreen from './LoadingScreen';

const getWeatherEmoji = (condition) => {
    const emojis = {
        Clear: '☀️',
        Clouds: '☁️',
        Rain: '🌧️',
        Drizzle: '🌦️',
        Thunderstorm: '⛈️',
        Snow: '❄️',
        Mist: '🌫️',
        Fog: '🌫️',
        Smoke: '💨',
        Haze: '🌫️',
        Dust: '🌪️',
        Sand: '🌪️',
        Squall: '💨',
        Tornado: '🌪️',
    };
    return emojis[condition] || '❓';
};

const WeatherApp = () => {
    const dispatch = useDispatch();
    const { cities, todayWeather, forecast, loading, error } = useSelector((state) => state.weather);
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        dispatch(fetchCities());
    }, [dispatch]);

    const handleWeatherFetch = () => {
        if (selectedCity) {
            dispatch(fetchTodayWeather(selectedCity));
            dispatch(fetchForecast(selectedCity));
        } else {
            alert('Please select a city.');
        }
    };

    return (
        <div className="weather-container">
            <h1 className="gradient-text">Weather App</h1>

            <select onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity}>
                <option value="">Select a city</option>
                {Array.isArray(cities) &&
                    cities.map((city) => (
                        <option key={city.name} value={city.name}>
                            {city.name}, {city.country}
                        </option>
                    ))}
            </select>

            <button onClick={handleWeatherFetch} disabled={loading}>
                {loading ? <LoadingScreen /> : 'Get Weather'}
            </button>

            {error && <p>Error: {error}</p>}

            {todayWeather && (
                <div>
                    <h2>{todayWeather.name}</h2>
                    <h3>
                        {getWeatherEmoji(todayWeather.weather[0].main)} {todayWeather.main.temp}°C
                    </h3>
                    <p>Humidity: {todayWeather.main.humidity}%</p>
                    <p>Wind: {todayWeather.wind.speed} km/h</p>
                    <p>{todayWeather.weather[0].description}</p>
                </div>
            )}

            {forecast && (
                <div className="forecast-grid">
                    {Object.keys(forecast).map((date) => {
                        const dayData = forecast[date];
                        const avgTemp = dayData.reduce((sum, item) => sum + item.main.temp, 0) / dayData.length;
                        return (
                            <div key={date}>
                                <p>{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                                <h3>
                                    {getWeatherEmoji(dayData[0].weather[0].main)} {Math.round(avgTemp)}°C
                                </h3>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
