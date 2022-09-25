import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {AiOutlineSearch} from 'react-icons/ai';
import { Notify } from 'notiflix';

import style from './SearchBar.module.css';

export default class SearchBar extends Component {
  state = {
    imageName: '',
  };

  handleChange = e => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.imageName.trim() === '') {
      return Notify.info('Enter image name');
    }
    this.props.onSubmit({ ...this.state });
    this.setState({ imageName: '' });
    e.currentTarget.reset();
  };

  render() {
    return (
      <header className={style.searchBar}>
        <form className={style.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={style.searchFormButton}>
            <AiOutlineSearch size="40" />
          </button>

          <input
            className={style.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {onSubmit: PropTypes.func,};


