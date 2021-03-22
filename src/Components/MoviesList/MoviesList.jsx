import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import defaultPoster from 'assets/defaultPoster.jpg';
import routes from 'routes';

const useStyles = makeStyles({
  gridPadding: {
    padding: 20,
  },

  cardContent: {
    padding: 0,
    paddingBottom: 0,
    maxWidth: 300,
    maxHeight: 500,
    '&:last-child': {
      padding: 0,
    },
    '&:hover': {
      backgroundColor: '#c51162',
      color: '#fefefe',
    },
  },
  link: {
    textDecoration: 'none',
    textAlign: 'center',
  },
});

const MoviesList = ({ moviesList, location }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} justify="center" className={classes.gridPadding}>
      {moviesList.map(({ id, title, poster_path: poster }) => (
        <Grid item key={id}>
          <Link
            to={{
              pathname: `${routes.movies}/${id}`,
              state: { from: location },
            }}
            className={classes.link}
          >
            <Card elevation={2}>
              <CardContent className={classes.cardContent}>
                <img
                  src={
                    poster
                      ? `https://image.tmdb.org/t/p/w300/${poster}`
                      : defaultPoster
                  }
                  alt={title}
                  width={300}
                />
                <Typography variant="h6" component="h3" noWrap>
                  {title}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

MoviesList.propTypes = {
  moviesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default withRouter(MoviesList);
