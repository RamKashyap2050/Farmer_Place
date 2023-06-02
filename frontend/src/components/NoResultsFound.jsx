import React from "react";
import { Container } from "react-bootstrap";
import "../styles/Noresults.css";

const NoResultsFound = () => {
  return (
    <Container className="no-results-found">
      <h2>No Results Found</h2>
      <p>Sorry, we could not find any results for your search.</p>
    </Container>
  );
};

export default NoResultsFound;
