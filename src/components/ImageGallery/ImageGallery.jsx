import React from 'react';
import { Component } from 'react';
import css from 'components/ImageGallery/ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

export class ImageGallery extends Component {
  state = {
    data: [],
    page: 1,
    error: null,
    loader: false,
    showModal: false,
    modalInfo: null,
  };

  componentDidMount() {
    this.setState({
      data: [],
      page: 1,
      error: null,
      loader: false,
      showModal: false,
      modalInfo: null,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchQuery !== this.props.searchQuery ||
      prevState.page !== this.state.page
    ) {
      const query = this.props.searchQuery;
      this.setState({ loader: true });
      fetch(
        `https://pixabay.com/api/?q=${query}&page=${this.state.page}&key=28095599-4638dd4a9a44e9c8a84be8988&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('Error'));
        })
        .then(response =>
          this.setState(prevState => {
            return {
              data: [...prevState.data, ...response.hits],
            };
          })
        )
        .catch(error => this.setState({ error }))
        .finally(this.setState({ loader: false }));
    }
  }

  handleItemClick = id => {
    this.setState({
      showModal: true,
      modalInfo: this.state.data.find(item => item.id === id),
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  handleBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { error, data, loader, showModal, modalInfo } = this.state;
    return (
      <>
        {error && <p>{error.message}</p>}
        <ul className={css.ImageGallery}>
          {data &&
            data.map(item => (
              <ImageGalleryItem
                data={item}
                key={item.id}
                onClick={this.handleItemClick}
              />
            ))}
        </ul>
        {loader && <Loader />}
        {data.length > 0 && <Button onClick={this.handleBtnClick} />}
        {showModal && (
          <Modal showModal={modalInfo} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}
