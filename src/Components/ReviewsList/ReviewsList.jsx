import React, { Component } from 'react';
import moviesApi from 'Composables/useApi';

class ReviewsList extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    try {
      const { results: reviews } = await moviesApi({ method: 'reviews', movieId });
      const minimizedReviewsList = reviews.slice(0, 12);
      this.setState({ reviews: minimizedReviewsList });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  render() {
    const { reviews } = this.state;
    return (
      <>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map(({ author, content, id }) => (
              <li key={id}>
                <p>{`Author: ${author}`}</p>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>We don`t have any reviews for this movie.</p>
        )}
      </>
    );
  }
}

export default ReviewsList;
