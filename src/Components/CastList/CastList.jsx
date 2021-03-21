import React, { Component } from 'react';
import moviesApi from 'Composables/useApi';
import barto from './barto.png';

class CastList extends Component {
  state = {
    cast: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    try {
      const { cast } = await moviesApi({ method: 'cast', movieId });
      const minimizedCastList = cast.slice(0, 12);
      this.setState({ cast: minimizedCastList });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  render() {
    const { cast } = this.state;
    return (
      <>
        {cast && (
          <ul>
            {cast.map(({ profile_path: avatar, character, name, id }) => (
              <li key={id}>
                <img
                  src={avatar ? `https://image.tmdb.org/t/p/w500/${avatar}` : barto}
                  alt={name}
                />
                <p>{name}</p>
                <p>{`Character: ${character}`}</p>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default CastList;
