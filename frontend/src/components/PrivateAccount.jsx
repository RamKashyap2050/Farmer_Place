import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import classnames from "classnames";
import { BsFillLockFill } from "react-icons/bs";

const PrivateAccount = () => {
  return (
    <Container>
      <Row style={{margin:"auto", textAlign:"center"}}>
        <Col xs="auto" style={{margin:"auto"}}>
          <BsFillLockFill size={120} color="#000" style={{marginBottom:"16px"}} />

          <h1 style={{marginBottom:"6px"}}>Account is Private</h1>
          <p style={{ fontWeight: "bold" }}>
            Content is private. Follow to view the content.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivateAccount;
