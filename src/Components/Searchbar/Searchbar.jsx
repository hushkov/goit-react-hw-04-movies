import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const handleSubmit = eve => {
    eve.preventDefault();
    const query = eve.currentTarget.query.value;

    onSubmit(query);
    eve.currentTarget.query.value = '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        name="query"
      />
      <button type="submit">
        <span>Search</span>
      </button>
    </form>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
