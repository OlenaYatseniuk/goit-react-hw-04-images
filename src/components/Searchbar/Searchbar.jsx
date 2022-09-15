import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSistrix } from 'react-icons/fa';
import s from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleChangeInput = event => {
    const { value } = event.target;
    setValue(value);
  };

  const handleSubmitForm = event => {
    event.preventDefault();
    onSubmit(value);
  };

  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={handleSubmitForm}>
        <FaSistrix
          style={{
            fill: 'black',
            cursor: 'pointer',
            padding: '2px',
            width: '30px',
          }}
          onClick={handleSubmitForm}
        />

        <input
          className={s.searchForm__input}
          value={value}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChangeInput}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
