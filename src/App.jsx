import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import NavBar from "./components/NavBar";
import WeatherApp from "./components/WeatherApp";
import DogApp from "./components/DogApp";
import MovieSearch from "./components/MovieSearch";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import "./main.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<WeatherApp />} />
            <Route path="/dog" element={<DogApp />} />
            <Route path="/movie" element={<MovieSearch />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/movie/:title" element={<MovieDetails />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;