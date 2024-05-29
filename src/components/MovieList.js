import MovieShow from "./MovieShow";

function MovieList({
  movies,
  handleSingleMovie,
  hasStartedTyping,
  error,
  movieName,
  singleMovie,
}) {
  // Determine if data is loading
  const isLoading =
    hasStartedTyping &&
    movieName &&
    movieName.length >= 3 &&
    !error &&
    (!movies || movies.length === 0);

  // Determine if there are any movies
  const hasMovies = movies && Array.isArray(movies) && movies.length > 0;

  let renderedMovies = null;

  if (isLoading) {
    // If isLoading is true, set renderedMovies to the loading message
    renderedMovies = <p className="loader">Loading...</p>;
  } else if (hasMovies) {
    // If there are movies, render the movie list
    renderedMovies = (
      <ul className="list list-movies">
        {movies.map((movie) => (
          <MovieShow
            key={movie.imdbID}
            movie={movie}
            handleSingleMovie={handleSingleMovie}
            singleMovie={singleMovie}
          />
        ))}
      </ul>
    );
  } else if (error) {
    // If there is an error, render the error message
    renderedMovies = <p className="error">{error}</p>;
  } else {
    // If there are no movies and the user has started typing, show "No movies found" message
    renderedMovies = null;
  }

  return (
    <div className="box">
      <button className="btn-toggle">-</button>
      {renderedMovies}
    </div>
  );
}

export default MovieList;
