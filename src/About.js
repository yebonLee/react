import React from "react";
import { Card } from "react-bootstrap";

const About = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>About</Card.Title>
        <Card.Text>
          All about me <br />
          - This semester is the last semester.
          <br /> - Clone coding with prospective developers.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default About;
