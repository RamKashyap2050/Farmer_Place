import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BsFillLockFill } from "react-icons/bs";

const PrivateAccount = () => {
  return (
    <Container style={{ marginBottom: "6rem" }}>
      <Row style={{ margin: "auto", textAlign: "center" }}>
        <Col xs="auto" style={{ margin: "auto" }}>
          <div
            style={{
              border: "1px solid black",
              borderRadius: "50%",
              padding: "20px",
            }}
          >
            <BsFillLockFill
              size={120}
              color="#000"
            />
          </div>

          <h1 style={{ marginBottom: "6px" }}>Account is Private</h1>
          <p style={{ fontWeight: "bold" }}>
            Content is private. Follow to view the content.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivateAccount;
