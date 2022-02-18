import React from 'react';
import Form from './SearchForm';
import Movies from './Movies';
import Paginate from './Paginate';
const Home = () => {
  return (
    <main>
      <Form />
      <Movies />
      <Paginate />
    </main>
  );
};

export default Home;
