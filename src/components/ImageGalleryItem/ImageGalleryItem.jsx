import Modal from 'components/Modal';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  static propTypes = {
    tags: PropTypes.string,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }

  state = {
    isModalShow: false,
  };

  handleToggleModal = () => {
    this.setState(({ isModalShow }) => ({
      isModalShow: !isModalShow,
    }));
  };

  render() {
    const { tags, webformatURL, largeImageURL } = this.props;
    const { isModalShow } = this.state;
    return (
      <>
        <li className={s.gallery__item}>
          <img
            className={s.gallery__image}
            src={webformatURL}
            alt={tags}
            onClick={this.handleToggleModal}
          />
        </li>
        {isModalShow && (
          <Modal onModalOpen={this.handleToggleModal}>
            <img
              className={s.gallery__largeImage}
              src={largeImageURL}
              alt={tags}
            />
          </Modal>
        )}
      </>
    );
  }
}
