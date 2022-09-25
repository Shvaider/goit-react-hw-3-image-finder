import { Component } from 'react';
import { Notify } from 'notiflix';
import './App.module.css';
import SearchBar from 'component/SearchBar/Searchbar';
import Preloader from './component/Preloader/Preloader';
import ImageGallery from './component/ImageGallery/ImageGallery';
import Button from './component/Button';

import {fetchDataApi} from './services/fetchDataApi';

export default class App extends Component {
  state = {
    images: [],
    imageName: '',
    page: 1,
    loading: false,
    totalPages: null,
  };

  componentDidUpdate(_, prevState) {
    const { page, imageName } = this.state;
    if (
      (imageName && prevState.imageName !== imageName) ||
      page > prevState.page
    ) {
      this.fetchPosts(imageName, page);
    }
  }

  async fetchPosts() {
    const { page, imageName } = this.state;
    this.setState({
      loading: true,
    });

    try {
      const data = await fetchDataApi(imageName, page);
      if (data.totalHits === 0) {
        return Notify.failure('No such pictures');
      }
      this.setState(({ images }) => {
        return {
          images: [...images, ...data.hits],
        };
      });
      const totalPages = Math.ceil(data.totalHits / 12);
      this.setState({
        totalPages,
      });
      if (page >= totalPages) {
        Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  handleSubmitForm = ({ imageName }) => {
    this.setState({ imageName, images: [] });
  };

  loadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    const { images, loading, totalPages, page } = this.state;
    const { handleSubmitForm, loadMore } = this;
    const endList = page < totalPages;
    const isImages = images.length !== 0;

    return (
      <>
        <SearchBar onSubmit={handleSubmitForm} />
        <ImageGallery items={images} />

        {loading ? (
          <Preloader />
        ) : (
          endList && isImages && <Button onClick={loadMore} />
        )}
      </>
    );
  }
}