import { useState, useEffect } from "react";
import RatingsComponent from "./RatingsComponent";

function MovieSingleShow({ singleMovie, loading, setSingleMovie }) {
  const [hoverValue, setHoverValue] = useState(0);
  const [selectedValue, setSelectedValue] = useState(0);
  const [userRatings, setUserRatings] = useState([]);

  useEffect(() => {
    // Retrieve movies from localStorage and set userRatings state
    const moviesFromStorage = JSON.parse(localStorage.getItem("movies")) || [];
    setUserRatings(moviesFromStorage);
    setSelectedValue(0); // Reset selectedValue when singleMovie changes
  }, [singleMovie]);

  const handleHover = (value) => {
    setHoverValue(value);
  };

  const handleClick = (value) => {
    setSelectedValue(value);
  };

  const handleAddToList = () => {
    // Update singleMovie object with userRating property
    const updatedSingleMovie = { ...singleMovie, userRating: selectedValue };
    // Get movies from localStorage
    const moviesFromStorage = JSON.parse(localStorage.getItem("movies")) || [];
    // Check if the movie already exists in localStorage
    const isMovieAlreadyAdded = moviesFromStorage.some(
      (movie) => movie.imdbID === updatedSingleMovie.imdbID
    );
    if (isMovieAlreadyAdded) {
      // Movie already exists, show a message or handle the scenario
      return;
    }
    // Add updated singleMovie to movies array
    const updatedMovies = [...moviesFromStorage, updatedSingleMovie];
    // Update movies array in localStorage
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
    setUserRatings(updatedMovies); // Update userRatings state
    setSingleMovie(null);
  };

  const getRatingForMovie = () => {
    // Retrieve the movies array from localStorage
    const movies = JSON.parse(localStorage.getItem("movies")) || [];

    // Check if the movie is in the localStorage array
    const movieIndex = movies.findIndex(
      (movie) => movie.imdbID === singleMovie.imdbID
    );

    // If the movie is found, return its userRating
    if (movieIndex !== -1) {
      return movies[movieIndex].userRating;
    } else {
      return null;
    }
  };

  const deleteListById = (imdbID) => {
    // Retrieve movies from localStorage
    const moviesFromStorage = JSON.parse(localStorage.getItem("movies")) || [];

    // Filter out the movie with the given imdbID
    const updatedLists = moviesFromStorage.filter(
      (movie) => movie.imdbID !== imdbID
    );

    // Update the localStorage with the updated array
    localStorage.setItem("movies", JSON.stringify(updatedLists));

    // Update userRatings state
    setUserRatings(updatedLists);
  };

  if (!singleMovie) {
    return (
      <div className="box">
        <button className="btn-toggle">–</button>
        <div className="summary">
          <h2>Movies you watched</h2>
          <div>
            <p>
              <span>#️⃣</span>
              <span>{userRatings?.length} movies</span>
            </p>
            <p>
              <span>⭐️</span>
              <span>0.00</span>
            </p>
            <p>
              <span>🌟</span>
              <span>0.00</span>
            </p>
            <p>
              <span>⏳</span>
              <span>0 min</span>
            </p>
          </div>
        </div>
        <ul className="list">
          {userRatings.map((rat) => {
            return (
              <li key={rat.imdbID}>
                <img src={rat.Poster} alt={rat.Title} />
                <h3>{rat.Title}</h3>
                <div>
                  <p>
                    <span>⭐️</span>
                    <span>{rat.imdbRating}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{rat.userRating}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{rat.Runtime}</span>
                  </p>
                  <button
                    className="btn-delete"
                    onClick={() => deleteListById(rat.imdbID)}
                  >
                    X
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        {loading && <p className="loader">Loading...</p>}
      </div>
    );
  }

  return (
    singleMovie && (
      <div className="box">
        <button className="btn-toggle">–</button>
        <div className="details">
          <header>
            <button className="btn-back">←</button>
            <img src={singleMovie.Poster} alt="Poster of movie" />
            <div className="details-overview">
              <h2>{singleMovie.Title}</h2>
              <p>
                {singleMovie.Released} • {singleMovie.Runtime}
              </p>
              <p>{singleMovie.Genre}</p>
              <p>
                <span>⭐️</span>
                {singleMovie.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            {getRatingForMovie() !== null ? (
              <div className="rating">
                <p>
                  You rated this movie with {getRatingForMovie()}
                  <span role="img" aria-label="star">
                    ⭐️
                  </span>
                </p>
              </div>
            ) : (
              <div className="rating">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <RatingsComponent
                      hoverValue={hoverValue}
                      selectedValue={selectedValue}
                      onHover={handleHover}
                      onClick={handleClick}
                    />
                  </div>
                </div>
                <p
                  style={{
                    lineHeight: "1",
                    margin: "0px",
                    color: "#fcc419",
                    fontSize: "16px",
                  }}
                >
                  {selectedValue > 0 && selectedValue}
                </p>
                {selectedValue > 0 && (
                  <button className="btn-add" onClick={handleAddToList}>
                    + Add to list
                  </button>
                )}
              </div>
            )}
            <p>
              <em>{singleMovie.Plot}</em>
            </p>
            <p>Starring {singleMovie.Actors}</p>
            <p>Directed by {singleMovie.Director} </p>
          </section>
        </div>
      </div>
    )
  );
}

export default MovieSingleShow;
