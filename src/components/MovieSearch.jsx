import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../features/movieSlice";
import { useNavigate } from "react-router-dom";

const MovieSearch = () => {
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearch = () => {
        if (title.trim()) {
            dispatch(fetchMovies(title)); 
            navigate("/movies"); 
        } else {
            alert("Please enter a movie title.");
        }
    };

    return (
        <div className="movie-search-container">
            <h1>🎬 Movie Search App</h1>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter movie title..."
                className="search-input-group"
            />
            <button onClick={handleSearch} className="search-button">Search</button>
        </div>
    );
};

export default MovieSearch;
