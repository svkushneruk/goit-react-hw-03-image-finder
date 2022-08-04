import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SearchForm } from 'components/SearchForm/SearchForm';
import css from 'components/Searchbar/Searchbar.module.css';

export class Searchbar extends Component {
  state = {};

  render() {
    return (
      <header className={css.searchbar}>
        <SearchForm onSubmit={this.props.onSubmit} />
      </header>
    );
  }
}

Searchbar.propTypes = {
  onsubmit: PropTypes.func,
};
