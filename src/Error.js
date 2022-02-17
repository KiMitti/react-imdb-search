import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <main>
      <section className='error-page'>
        <h2>Oops! How'd you get here?</h2>
        <p>You've gone astray at some point</p>
        <Link to='/' className='btn'>
          Go try that again
        </Link>
      </section>
    </main>
  );
};

export default Error;
