function MovieHeader({
  handleMovies,
  movies,
  handleTypingCheck,
  handleName,
  movieName,
}) {
  const handleMovieName = (event) => {
    const value = event.target.value;
    handleName(value);

    if (value.length >= 3) {
      handleTypingCheck(true); // User has started typing
      handleMovies(value); // Call API to search for movies
    } else if (value.length < 3) {
      handleTypingCheck(false); // User cleared the input
      handleMovies(""); // Clear movie list
    }
  };

  const resultsCount = movies ? movies?.length : 0;

  return (
    <div>
      <nav className="nav-bar">
        <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
        <input
          className="search"
          type="text"
          placeholder="Search movies..."
          onChange={handleMovieName}
          value={movieName}
        />
        <p className="num-results">
          Found <strong>{resultsCount}</strong> results
        </p>
      </nav>
    </div>
  );
}

export default MovieHeader;
