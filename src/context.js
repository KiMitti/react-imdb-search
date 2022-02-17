import React, { useState, useContext, useEffect } from 'react';
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [value, setValue] = useState('Cats');
  const [movies, setMovies] = useState([]);
  const [single, setSingle] = useState(null);
  const [page, setPage] = useState(1);
  const [err, setErr] = useState(null);

  const fetchMovies = async () => {
    const searchVal = `&s=${value}`;
    const pageNum = `&page=${page}`;
    let url = `${API_ENDPOINT}${searchVal}${pageNum}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.Response === 'True') {
        console.log('True!', data);
        setErr(null);
        setMovies(data);
      } else {
        setErr(data.Error);
      }
    } catch (error) {
      console.log(
        `Whoops! the movies you are trying to reach are currently unavailable. Because: ${error}`
      );
    }
  };

  useEffect(() => {
    //go get new movies
    console.log('getting new movies!');
    fetchMovies();
    console.log(err);
  }, [value]);
  return (
    <AppContext.Provider
      value={{
        test: 'hello!',
        value,
        setValue,
        movies,
        setMovies,
        single,
        setSingle,
        err,
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
