import React, { Component } from 'react'
import PropTypes from 'prop-types';
import s from './Button.module.css';

export default class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  }

  handleButtonClick = () =>{
    const {onClick} = this.props;
    onClick();
  }

  render() {

    return (
      <button className={s.button} type='button' onClick={this.handleButtonClick}>
        Load more
      </button>
    )
  }
}
