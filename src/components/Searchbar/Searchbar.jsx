import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaSistrix } from 'react-icons/fa';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    value: '',
  };

  handleChangeInput = event => {
    const { value } = event.target;
    this.setState({
      value,
    });
  };

  handleSubmitForm = event => {
    event.preventDefault();
    const { onSubmit } = this.props;
    const { value } = this.state;

    onSubmit(value);
  };

  render() {
    const { value } = this.state;
    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={this.handleSubmitForm}>
          <FaSistrix
            style={{ fill: 'black', cursor: 'pointer', padding: '2px', width: "30px" }}
            onClick={this.handleSubmitForm}
          />

          <input
            className={s.searchForm__input}
            value={value}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChangeInput}
          />
        </form>
      </header>
    );
  }
}
