import React, { useState, useContext, useEffect } from 'react';
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [value, setValue] = useState('Marvel');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [single, setSingle] = useState({});
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (singleID) => {
    setLoading(true);
    const searchVal = `&s=${value}`;
    const pageNum = `&page=${page}`;
    let url = `${API_ENDPOINT}${searchVal}${pageNum}`;
    if (singleID) {
      const imdbID = `&i=${singleID}`;
      url = `${API_ENDPOINT}${imdbID}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (singleID) {
        setSingle(data);
        setLoading(false);
        return;
      }

      if (data.Response === 'True') {
        setErr(null);
        setMovies(data);
      } else {
        setErr(data.Error);
      }
      setLoading(false);
    } catch (error) {
      console.log(
        `Whoops! the movies you are trying to reach are currently unavailable. Because: ${error}`
      );
      setLoading(false);
    }
  };
  useEffect(() => {
    //set page back to page one if value triggers a search
    setPage(1);
    // eslint-disable-next-line
  }, [value]);
  useEffect(() => {
    //go get new movies
    fetchData();
    console.log(movies);
    // eslint-disable-next-line
  }, [value, page]);

  return (
    <AppContext.Provider
      value={{
        value,
        setValue,
        loading,
        movies,
        setMovies,
        single,
        setSingle,
        err,
        fetchData,
        page,
        setPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
