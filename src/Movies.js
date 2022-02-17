import React from 'react';
import { useGlobalContext } from './context';
import { Link } from 'react-router-dom';
const url =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png';

const Movies = () => {
  const { movies, loading } = useGlobalContext();
  const movieData = movies.Search;

  if (loading) {
    return <div className='loading'></div>;
  }
  return (
    <section className='movies'>
      {movieData &&
        movieData.map((movie) => {
          const {
            Title: title,
            Year: year,
            imdbID: id,
            Poster: poster,
          } = movie;
          return (
            <Link className='movie' to={`/movie/${id}`} key={id}>
              <article>
                <img src={poster === 'N/A' ? url : poster} alt={title} />
                <div className='movie-info'>
                  <h4 className='title'>{title}</h4>
                  <p>{year}</p>
                </div>
              </article>
            </Link>
          );
        })}
    </section>
  );
};

export default Movies;
