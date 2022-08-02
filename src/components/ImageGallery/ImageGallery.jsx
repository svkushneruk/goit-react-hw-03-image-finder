import { Component } from 'react';
import css from 'components/ImageGallery/ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { BallTriangle } from 'react-loader-spinner';

export class ImageGallery extends Component {
  state = {
    loading: false,
    data: [],
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      console.log(`prevProps.searchQuery`, prevProps.searchQuery);
      console.log(`this.props.searchQuery`, this.props.searchQuery);
      console.log('changed query');
      const q = this.props.searchQuery;
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${q}&page=1&key=28095599-4638dd4a9a44e9c8a84be8988&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => response.json())
        .then(response => this.setState({ data: response.hits }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    return (
      <ul className={css.ImageGallery}>
        {this.state.loading && <BallTriangle />}
        {/* <ImageGalleryItem data={this.state.data[0]} /> */}
      </ul>
    );
  }
}
