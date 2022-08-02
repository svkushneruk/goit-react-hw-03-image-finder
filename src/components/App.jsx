import { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  handleSearch = searchQuery => {
    console.log(searchQuery);
    this.setState({ searchQuery });
  };

  componentDidMount() {}

  render() {
    return (
      <div>
        {/* {this.state.loading && <BallTriangle />} */}
        <Searchbar onSubmit={this.handleSearch} />

        <ImageGallery searchQuery={this.state.searchQuery} />

        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}
