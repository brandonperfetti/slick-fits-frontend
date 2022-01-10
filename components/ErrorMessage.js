import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <div className="p-4 bg-red-200 opacity-60 rounded-xl my-4" key={i}>
        <p data-testid="graphql-error">
          <strong>Shoot!</strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </div>
    ));
  }
  return (
    <div className="p-4 bg-red-200 opacity-60 rounded-xl my-4">
      <p data-testid="graphql-error">
        <span>Shoot! </span>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </div>
  );
};

DisplayError.defaultProps = {
  error: {},
};

DisplayError.propTypes = {
  error: PropTypes.object,
};

export default DisplayError;
