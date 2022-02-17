import React from 'react';
import { useGlobalContext } from './context';
const SearchForm = () => {
  const { value, setValue, err } = useGlobalContext();
  return (
    <form
      className='search-form'
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h2>Name a Movie!</h2>
      <input
        type='text'
        className='form-input'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {err && <div className='error'>{err}</div>}
    </form>
  );
};

export default SearchForm;
