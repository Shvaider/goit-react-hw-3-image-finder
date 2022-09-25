import styles from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ onClick }) {
  return (
      <button className={styles.button} type="button" onClick={onClick}>
        Load More
      </button>

  );
}

Button.propTypes = {
  onClick: PropTypes.func,
};
