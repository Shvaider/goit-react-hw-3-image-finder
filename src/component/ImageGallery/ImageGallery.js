import React from 'react';
import ImageGalleryItem from 'component/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';

export default function ImageGallery({ items }) {
  return (
    <ul className={styles.gallery}>
      {items.map(item => {
        return <ImageGalleryItem key={item.id} {...item} />;
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
};