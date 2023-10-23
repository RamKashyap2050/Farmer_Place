import React from "react";
import { BsStopBtn } from "react-icons/bs";
import { Container, Row, Col } from "react-bootstrap";
import HeaderforUser from "../components/HeaderforUser";
import Footer from "../components/Footer";

const WorkInProgress = () => {
  return (
    <div>
      <HeaderforUser />

      <Container style={{marginBottom:"6rem", marginTop:"6rem"}}>
        <Row>
          <Col md={12} className="text-center">
            <BsStopBtn size={100} color="#FF5733" />
          </Col>
          <Col md={12} className="text-center">
            <h1>Work in Progress</h1>
          </Col>
          <Col md={12} className="text-center">
            <p>
              Working on this right now will be bringing this alive in front of
              your eyes soon.
            </p>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default WorkInProgress;
