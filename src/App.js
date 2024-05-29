import { useState, useEffect } from "react";
import api from "./api";
import MovieHeader from "./components/MovieHeader";
import MovieList from "./components/MovieList";
import MovieSingleShow from "./components/MovieSingleShow";

function App() {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [singleMovie, setSingleMovie] = useState(null);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMovies = async (term) => {
    try {
      if (term.length < 3) {
        // Clear movies list and error message if the search term is too short
        setMovies([]);
        setError(null);
        return;
      }

      // Show loading message while waiting for the API response
      setError(null);
      setMovies(null); // Clear previous movie list

      const result = await api.getMoviesData(term);

      if (result && result.length > 0) {
        // If movies are found, update the movie list
        setMovies(result);
      } else {
        // If no movies are found, show an error message
        setError("⛔️ Movie not found");
      }
    } catch (error) {
      // If an error occurs, set the error message
      setError(error.message);
    }
  };

  const handleName = (val) => {
    setMovieName(val);
  };

  const handleTypingCheck = (typing) => {
    setHasStartedTyping(typing);
  };

  const handleSingleMovie = async (term) => {
    try {
      if (!term) {
        setSingleMovie(null);
        return;
      }

      setLoading(true); // Set loading state to true before making the API call

      // Make API call to fetch single movie data
      const result = await api.showSingleMovie(term);

      if (result && !result.Error) {
        setSingleMovie(result);
      } else {
        setSingleMovie(null);
      }
    } catch (error) {
      setSingleMovie(null);
    } finally {
      setLoading(false); // Set loading state to false after the API call is completed
    }
  };

  useEffect(() => {
    const title = singleMovie
      ? `Movie | ${singleMovie.Title}`
      : "usepopcorn by dani";
    document.title = title;
  }, [singleMovie]);

  return (
    <div>
      <MovieHeader
        handleMovies={handleMovies}
        handleName={handleName}
        movies={movies}
        handleTypingCheck={handleTypingCheck}
        movieName={movieName}
      />
      <main className="main">
        <MovieList
          movies={movies}
          handleSingleMovie={handleSingleMovie}
          hasStartedTyping={hasStartedTyping}
          error={error}
          movieName={movieName}
          singleMovie={singleMovie}
        />
        <MovieSingleShow
          singleMovie={singleMovie}
          loading={loading}
          setSingleMovie={setSingleMovie}
        />
      </main>
    </div>
  );
}

export default App;
