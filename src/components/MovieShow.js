function MovieShow({ movie, handleSingleMovie, singleMovie }) {
  const handleId = (id) => {
    // handleSingleMovie(null);
    handleSingleMovie(id);
  };

  return (
    <li
      onClick={() =>
        handleId(
          singleMovie && singleMovie.imdbID === movie.imdbID
            ? null
            : movie.imdbID
        )
      }
    >
      <img src={movie.Poster} alt="Batman Begins poster" />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export default MovieShow;
