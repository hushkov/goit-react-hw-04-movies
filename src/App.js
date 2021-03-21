import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from 'Components/Navbar';
import routes from 'routes';
import './App.css';

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
    <div className="App">
      <Navbar />
      <Suspense fallback={<h1>Loading ...</h1>}>
        <Switch>
          <Route exact path={home} component={HomeView}></Route>
          <Route path={movieDetails} component={MovieDetailsView}></Route>
          <Route path={movies} component={MoviesView}></Route>
          <Redirect to={home} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
