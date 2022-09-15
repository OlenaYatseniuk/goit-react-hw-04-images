import { useState } from 'react';

import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
import Modal from 'components/Modal';

function ImageGalleryItem({ tags, webformatURL, largeImageURL }) {
  const [isModalShow, setIsModalShow] = useState(false);

  const handleToggleModal = () => {
    setIsModalShow(prev => !prev);
  };

  return (
    <>
      <li className={s.gallery__item}>
        <img
          className={s.gallery__image}
          src={webformatURL}
          alt={tags}
          onClick={handleToggleModal}
        />
      </li>
      {isModalShow && (
        <Modal onModalOpen={handleToggleModal}>
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

ImageGalleryItem.propTypes = {
  tags: PropTypes.string,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
