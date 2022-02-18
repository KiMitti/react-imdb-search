import React, { useEffect } from 'react';
import { useGlobalContext } from './context';

const Paginate = () => {
  const { page, setPage, movies, err, loading } = useGlobalContext();

  const findPages = () => {
    let number = 1;
    if (movies.totalResults > 10) {
      number = Math.ceil(movies.totalResults / 10);
      if (number > 10) number = 10;
    }
    const numberArray = [];
    for (let i = 1; i <= number; i++) {
      numberArray.push(i);
    }
    return numberArray;
  };
  const totalPages = findPages();

  useEffect(() => {
    findPages();
    // eslint-disable-next-line
  }, [movies]);

  return (
    <section className='pagination'>
      {totalPages &&
        totalPages.length > 1 &&
        !err &&
        !loading &&
        totalPages.map((pageNum, index) => {
          return (
            <button
              key={index}
              className={page === pageNum ? 'btn active-page' : 'btn'}
              onClick={() => {
                setPage(pageNum);
                console.log(page);
              }}
            >
              {pageNum}
            </button>
          );
        })}
      {/* hi there!Page total = {totalPages.length} */}
    </section>
  );
};

export default Paginate;
