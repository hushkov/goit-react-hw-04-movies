import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import moviesApi from 'Composables/useApi';
import CastList from 'Components/CastList';
import ReviewsList from 'Components/ReviewsList';
import routes from 'routes';

class MovieDetailsView extends Component {
  state = {
    movieDetails: {},

    error: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    try {
      const movieDetails = await moviesApi({ method: 'details', movieId });
      this.setState({ movieDetails });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  handleGoBack = () => {
    const { history, location } = this.props;
    history.push(location?.state?.from || routes.home);
  };

  render() {
    const { path, url } = this.props.match;
    const { cast, reviews } = routes;

    const {
      title,
      overview,
      genres,
      release_date: date,
      poster_path: poster,
      vote_average: votes,
    } = this.state.movieDetails;

    return (
      <>
        {title && (
          <div>
            <button type="button" onClick={this.handleGoBack}>
              Go Back
            </button>
            <h2>DetailesView</h2>
            <p>
              {title}
              {` (${date.substring(0, 4)})`}
            </p>
            <p>{`User Score: ${votes * 10}%`}</p>
            <img src={`https://image.tmdb.org/t/p/w500/${poster}`} alt={title} />
            <p>Overview</p>
            <p>{overview}</p>
            <p>Genres</p>
            <ul>
              {genres.map(({ name, id }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
            <ul>
              <li>
                <Link to={`${url}${cast}`}>Cast</Link>
              </li>
              <li>
                <Link to={`${url}${reviews}`}>Reviews</Link>
              </li>
            </ul>
            <Route path={`${path}${cast}`} component={CastList} />
            <Route path={`${path}${reviews}`} component={ReviewsList} />
          </div>
        )}
      </>
    );
  }
}

export default MovieDetailsView;
