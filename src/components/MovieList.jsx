import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

const MovieList = () => {
    const { movies, loading, error } = useSelector((state) => state.movie);

    if (loading) return <LoadingScreen />;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="movie-grid">
            {movies?.map((movie) => (
                <div key={movie.imdbID} className="movie-card">
                    <Link to={`/movie/${movie.Title}`}>
                        <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="movie-poster"
                        />
                    </Link>
                    <p>{movie.Title} ({movie.Year})</p>
                </div>
            ))}
        </div>
    );
};

export default MovieList;
