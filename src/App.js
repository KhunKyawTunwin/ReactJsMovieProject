import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./App.css";
import SearchIcon from "./search.svg";

//  95dfdeb3

const API_URL = "https://www.omdbapi.com?apikey=95dfdeb3";

// const movie1 = {
//   Title: "Hope Springs Eternal: A Look Back at 'The Shawshank Redemption'",
//   Year: "2004",
//   imdbID: "tt0443041",
//   Type: "movie",
//   Poster: "N/A",
// };

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovie("The Shawshank Redemption");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            searchMovie(searchTerm);
          }}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;