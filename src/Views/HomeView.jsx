import React, { Component } from 'react';
import MoviesList from 'Components/MoviesList';
import moviesApi from 'Composables/useApi';

class HomeView extends Component {
  state = {
    moviesList: null,
    error: null,
  };

  async componentDidMount() {
    try {
      const { results } = await moviesApi();
      this.setState({ moviesList: results });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  render() {
    const { moviesList } = this.state;
    return (
      <div>
        <h1>Trending Today</h1>
        {moviesList && <MoviesList moviesList={moviesList} />}
      </div>
    );
  }
}

export default HomeView;
