import React, { Component } from 'react';
import queryString from 'query-string';
import moviesApi from 'Composables/useApi';
import MovieList from 'Components/MoviesList';
import Searchbar from 'Components/Searchbar';

class MovieView extends Component {
  state = {
    searchQuery: '',
    queryResult: null,
    error: null,
  };

  async componentDidMount() {
    const { location } = this.props;

    if (location.search) {
      const { query } = await queryString.parse(location.search);

      try {
        const { results } = await moviesApi({ method: 'search', query });
        this.setState({ queryResult: results });
      } catch (err) {
        this.setState({ error: err.message });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;
    const { history } = this.props;

    if (prevState.searchQuery !== searchQuery) {
      try {
        const { results } = await moviesApi({
          method: 'search',
          query: searchQuery,
        });

        this.setState({ queryResult: results });
      } catch (err) {
        this.setState({ error: err.message });
      } finally {
        history.push({ search: `?query=${searchQuery}` });
      }
    }
  }

  onChangeQuery = newQuery => {
    this.setState({ searchQuery: newQuery });
  };

  render() {
    const { queryResult } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.onChangeQuery} />
        {queryResult && <MovieList moviesList={queryResult} />}
      </div>
    );
  }
}

export default MovieView;
