import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const rootModal = document.querySelector('#rootModal');

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    if (e.code === 'Escape') {
      return
    }
    this.props.toggle();
  };

  handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.toggle();
    }
  };

  render() {
    const { image, tags } = this.props;
    const { handleOverlayClick } = this;
    return createPortal(
      <div className={styles.overlayModal} onClick={handleOverlayClick}>
        <div className={styles.modal}> 
          <img src={image} alt={tags} />
        </div>
      </div>,
      rootModal
    );
  }
}

Modal.propTypes = {
  toggle: PropTypes.func,
  image: PropTypes.string,
  tags: PropTypes.string,
};

