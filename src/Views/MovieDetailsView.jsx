import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

import { Button, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Grid from '@material-ui/core/Grid';

import moviesApi from 'Composables/useApi';
import CastList from 'Components/CastList';
import ReviewsList from 'Components/ReviewsList';
import styles from './MovieDetailsView.module.css';
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
    const { location } = this.props;
    const { cast, reviews } = routes;

    const {
      title,
      overview,
      genres,
      release_date: date,
      poster_path: poster,
      vote_average: votes,
    } = this.state.movieDetails;

    const titleAndDate = date && `${title} (${date.substring(0, 4)})`;
    const userScore = votes && `User Score: ${votes * 10}%`;

    return (
      <>
        {title && (
          <div className="detailsRoot">
            <Button
              type="button"
              onClick={this.handleGoBack}
              color="secondary"
              variant="contained"
              startIcon={<ArrowBackIosIcon />}
            >
              <span>Go Back</span>
            </Button>
            <Grid container direction="row">
              <Grid item lg={6}>
                <Typography variant="h5" component="h3">
                  {titleAndDate}
                </Typography>

                <Typography variant="h6" component="h4">
                  {userScore}
                </Typography>

                <img
                  src={`https://image.tmdb.org/t/p/w500/${poster}`}
                  alt={title}
                  width={500}
                />
              </Grid>

              <Grid item lg={6}>
                <Typography variant="h6" component="h4">
                  Overview
                </Typography>
                <Typography>{overview}</Typography>
                <Typography variant="h6" component="h4">
                  Genres
                </Typography>
                <ul>
                  {genres.map(({ name, id }) => (
                    <li key={id}>{name}</li>
                  ))}
                </ul>
                <ul>
                  <li>
                    <NavLink
                      to={{
                        pathname: `${url}${cast}`,
                        state: { from: location?.state?.from || location },
                      }}
                      className={styles.link}
                      activeClassName={styles.activeLink}
                    >
                      Cast
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={{
                        pathname: `${url}${reviews}`,
                        state: { from: location?.state?.from || location },
                      }}
                      className={styles.link}
                      activeClassName={styles.activeLink}
                    >
                      Reviews
                    </NavLink>
                  </li>
                </ul>
              </Grid>
            </Grid>
            <Route path={`${path}${cast}`} component={CastList} />
            <Route path={`${path}${reviews}`} component={ReviewsList} />
          </div>
        )}
      </>
    );
  }
}

export default MovieDetailsView;
