import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

import Layout from 'Components/Layout';
import routes from 'routes';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

const HomeView = lazy(() =>
  import('Views/HomeView' /* webpackChunkName: "home-view" */),
);
const MoviesView = lazy(() =>
  import('Views/MoviesView' /* webpackChunkName: "movies-view" */),
);
const MovieDetailsView = lazy(() =>
  import('Views/MovieDetailsView' /* webpackChunkName: "movie-details-view" */),
);

function App() {
  const { home, movies, movieDetails } = routes;
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Suspense fallback={<LinearProgress />}>
          <Switch>
            <Route exact path={home} component={HomeView}></Route>
            <Route path={movieDetails} component={MovieDetailsView}></Route>
            <Route path={movies} component={MoviesView}></Route>
            <Redirect to={home} />
          </Switch>
        </Suspense>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
