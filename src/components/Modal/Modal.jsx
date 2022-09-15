import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  static propTypes = {
    onModalOpen: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  }

  componentDidMount(){
    window.addEventListener('keydown', this.onKeydownPress)
  }

  onKeydownPress = (event) =>{
    const {onModalOpen} = this.props;
    if(event.code === 'Escape'){
      onModalOpen();
    }
  }

  componentWillUnmount(){
    window.removeEventListener('keydown', this.onKeydownPress);
  }

  handleBackdropClick = (event) => {
    const {onModalOpen} = this.props;
    if(event.target === event.currentTarget){
      onModalOpen();
    }
  }

  render() {
    const {onModalOpen, children} = this.props;
    return createPortal((
      <div className={s.overlay} onClick={this.handleBackdropClick}>
        <div className={s.modal}>
          <button className={s.closeBtn} onClick={onModalOpen}>&#10006;</button>
          {children}
        </div>
      </div>
    ), modalRoot);
  }
}
