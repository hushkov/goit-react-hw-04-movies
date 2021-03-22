import PropTypes from 'prop-types';
import { TextField, Button, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
});

const Searchbar = ({ onSubmit }) => {
  const handleSubmit = eve => {
    eve.preventDefault();
    const query = eve.currentTarget.query.value;

    onSubmit(query);
    eve.currentTarget.query.value = '';
  };

  const classes = useStyles();

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        className={classes.field}
        name="query"
        label="Search Movie"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <Button
        type="submit"
        color="secondary"
        variant="contained"
        endIcon={<SearchIcon />}
      >
        <span>Search</span>
      </Button>
    </form>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
