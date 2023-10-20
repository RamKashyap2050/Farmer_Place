import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaCamera } from "react-icons/fa";

const NoPosts = () => {
  return (
    <div style={{ marginBottom: "6rem" }}>
      <Container>
        <Row style={{ margin: "auto", textAlign: "center" }}>
          <Col xs="auto" style={{ margin: "auto" }}>
            <div
              style={{
                border: "1px solid black",
                borderRadius: "50%"
              }}
            >
              <FaCamera
                size={120}
                color="#000"
    
              />
            </div>

            <h1 style={{ marginBottom: "6px" }}>No Posts yet</h1>
            <p style={{ fontWeight: "bold" }}>
              User hasn't posted anything yet in a while!
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NoPosts;
