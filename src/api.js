import axios from "axios";

const getMoviesData = async (movieName) => {
  const options = {
    params: {
      s: movieName,
      apikey: "448d96d0",
    },
    headers: {
      accept: "application/json",
    },
  };

  try {
    const response = await axios.get("http://www.omdbapi.com/", options);

    if (!response.data.Search) {
      // Throw custom error if no movies found
      throw new Error("⛔️ Movie not found");
    }

    return response.data.Search;
  } catch (error) {
    throw error; // Re-throw the error to propagate it to the caller
  }
};

const showSingleMovie = async (movieId) => {
  const options = {
    params: {
      i: movieId,
      apikey: "448d96d0",
    },
    headers: {
      accept: "application/json",
    },
  };

  try {
    const response = await axios.get("http://www.omdbapi.com/", options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// fetch(
//   `https://api.open-meteo.com/v1/forecast?latitude=31.558&longitude=74.3507&daily=weathercode,temperature_2m_max,temperature_2m_min`
// )
//   .then((res) => res.json())
//   .then((data) => console.log(data));

const api = { getMoviesData, showSingleMovie };

export default api;
