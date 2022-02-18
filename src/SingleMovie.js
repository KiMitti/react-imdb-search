import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGlobalContext } from './context';
const url =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png';

const SingleMovie = () => {
  const { fetchData, single, loading } = useGlobalContext();
  const { id } = useParams();
  useEffect(() => {
    fetchData(id);
    // eslint-disable-next-line
  }, []);

  const {
    Title: title,
    Poster: image,
    Plot: desc,
    imdbRating,
    Year: year,
  } = single;

  const colorizeRating = () => {
    const number = parseFloat(imdbRating);
    if (number >= 7) return 'var(--clr-green-light)';
    if (number <= 4) return 'var(--clr-red-light)';
    return 'var(--clr-yellow-light)';
  };

  if (loading) {
    return <div className='loading'></div>;
  }
  if (single.Response === 'False') {
    return (
      <section className='error-page'>
        <h2>Invalid Movie Selection</h2>
        <p>You've gone astray at some point</p>
        <Link to='/' className='btn'>
          Go try that again
        </Link>
      </section>
    );
  }

  return (
    <section className='single-movie'>
      <img src={image !== 'N/A' ? image : url} alt={title} />
      <div className='single-movie-info'>
        <h2>{title}</h2>
        <p>{desc}</p>
        <h4>{year}</h4>
        <h4 className='rating' style={{ color: colorizeRating() }}>
          {imdbRating !== 'N/A' && `${imdbRating}/10 on IMBD`}
        </h4>
        <Link className='btn' to='/'>
          Back to Movies
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
