import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchMovie } from "../features/movieSlice";
import LoadingScreen from "./LoadingScreen";

const MovieDetails = () => {
    const { title } = useParams();
    const dispatch = useDispatch();
    const { movie, loading, error } = useSelector((state) => state.movie);

    useEffect(() => {
        dispatch(fetchMovie(title));
    }, [dispatch, title]);

    if (loading) return <LoadingScreen />;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!movie) return null;

    const rottenTomatoesRating = movie.Ratings?.find(r => r.Source === "Rotten Tomatoes")?.Value || "N/A";

    return (
        <div className="movie-details-container">
            <Link to="/movie" className="back-button">
                ← Back to Search
            </Link>
            
            <div className="grid-layout">
                <img 
                    src={movie.Poster} 
                    alt={movie.Title} 
                    className="movie-poster-large" 
                />
                
                <div className="movie-info">
                    <h1 className="movie-title">{movie.Title} <span className="movie-year">({movie.Year})</span></h1>
                    
                    <div className="movie-metadata">
                        <div className="rating-badge">
                            ⭐ {movie.imdbRating} <span className="rating-label">IMDb</span>
                        </div>
                        <div className="rating-badge tomato">
                            🍅 {rottenTomatoesRating}
                        </div>
                        <div className="metadata-badge">
                            🕒 {movie.Runtime}
                        </div>
                        <div className="metadata-badge">
                            {movie.Rated}
                        </div>
                    </div>

                    <div className="movie-details">
                        <div className="detail-item">
                            <strong>Genre:</strong> {movie.Genre}
                        </div>
                        <div className="detail-item">
                            <strong>Director:</strong> {movie.Director}
                        </div>
                        <div className="detail-item">
                            <strong>Cast:</strong> {movie.Actors}
                        </div>
                        <div className="detail-item">
                            <strong>Plot:</strong> {movie.Plot}
                        </div>
                        {movie.BoxOffice && (
                            <div className="detail-item">
                                <strong>Box Office:</strong> {movie.BoxOffice}
                            </div>
                        )}
                        <div className="detail-item">
                            <strong>Awards:</strong> {movie.Awards}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;