import { Component } from 'react';
import css from 'components/ImageGallery/ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';

export class ImageGallery extends Component {
  state = {
    data: null,
    error: null,
    status: 'idle',
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      const q = this.props.searchQuery;
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?q=${q}&page=1&key=28095599-4638dd4a9a44e9c8a84be8988&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('Error'));
        })
        .then(response =>
          this.setState({ data: response.hits, status: 'resolved' })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { error, data, status } = this.state;

    if (status === 'idle') {
      return <p>No results</p>;
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return <p>{error.message}</p>;
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className={css.ImageGallery}>
            {data &&
              data.map(item => <ImageGalleryItem data={item} key={item.id} />)}
          </ul>
          {data && <Button />}
        </>
      );
    }
  }
}
