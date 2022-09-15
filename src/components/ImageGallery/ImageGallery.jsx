import ImageGalleryItem from 'components/ImageGalleryItem';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        tags: PropTypes.string,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      })
    )
  }

  render() {
    const {items, onModalOpen} = this.props;
    return (
      <ul className={s.gallery}>
        {items.map(({id, webformatURL, largeImageURL, tags}) =>(
          <ImageGalleryItem key={id}
          tags = {tags}
          webformatURL = {webformatURL}
          largeImageURL = {largeImageURL}
          onModalOpen = {onModalOpen}

          />
        ))}

      </ul>
    )
  }
}
