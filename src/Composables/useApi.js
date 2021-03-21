import axios from 'axios';

const KEY_API = '5c34acfe39a6372a620da68979c929b1';

const METHODS_LIST = {
  search: 'search',
  details: 'details',
  cast: 'cast',
  reviews: 'reviews',
};

function moviesApi({ method = null, movieId = null, query = null } = {}) {
  const { search, details, cast, reviews } = METHODS_LIST;
  let urlAPI = null;

  switch (method) {
    case search:
      urlAPI = `https://api.themoviedb.org/3/search/movie?api_key=${KEY_API}&language=en-US&query=${query}&page=1&include_adult=false`;
      break;
    case details:
      urlAPI = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY_API}&language=en-US`;
      break;
    case cast:
      urlAPI = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${KEY_API}&language=en-US`;
      break;
    case reviews:
      urlAPI = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${KEY_API}&language=en-US&page=1`;
      break;

    default:
      urlAPI = `https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY_API}&page=1`;
      break;
  }

  return axios.get(urlAPI).then(({ data }) => data);
}

export default moviesApi;
