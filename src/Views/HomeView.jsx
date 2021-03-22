import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import MoviesList from 'Components/MoviesList';
import moviesApi from 'Composables/useApi';

import Container from '@material-ui/core/Container';

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
      <Container>
        <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
          Trending Today
        </Typography>
        {moviesList && <MoviesList moviesList={moviesList} />}
      </Container>
    );
  }
}

export default HomeView;
