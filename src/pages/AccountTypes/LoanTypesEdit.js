import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { db } from "../../firebase";

const FormGroup = ({ label, placeholder, name, value, onChange }) => {
  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={3}>
        {label}
      </Form.Label>
      <Col sm={9}>
        <Form.Control
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      </Col>
    </Form.Group>
  );
};

const LoanTypesEdit = () => {
  const history = useHistory();
  const { id } = useParams();
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [details, setDetails] = useState({
    accType: "",
    accName: "",
    maxVal: "",
    loanRate: "",
    period: "",
    remarks: "",
  });

  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));

  const handleUpdate = async () => {
    setShowSuccessMsg(false);
    try {
      await setDoc(doc(db, "accounttypes", id), details);
    } catch (e) {
      console.error(e);
    }
    setShowSuccessMsg(true);
    setTimeout(() => {
      history.push(`/accType/${"second"}`);
    }, 2000);
  };

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "accounttypes", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDetails(docSnap.data());
      } else {
        history.push(`/accType/${"second"}`);
      }
    })();
  }, []);

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card style={{ width: "60%" }} border="success">
          <Card.Header as="h5" style={{ color: "darkolivegreen" }}>
            Update Loan Account Type
          </Card.Header>
          <Card.Body>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Account Type ID
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  placeholder="Account Type ID"
                  name="accTypeId"
                  value={id}
                  disabled={true}
                />
              </Col>
            </Form.Group>
            <Form>
              <FormGroup
                label="Type"
                placeholder="Type"
                name="accType"
                value={details.accType}
                onChange={setValue}
              />

              <FormGroup
                label="Name"
                placeholder="Name"
                name="accName"
                value={details.accName}
                onChange={setValue}
              />

              <FormGroup
                label="Max Value (Rs.)"
                placeholder="Max Value (Rs.)"
                name="maxVal"
                value={details.maxVal}
                onChange={setValue}
              />

              <FormGroup
                label="Loan Rate (%)"
                placeholder="Loan Rate (%)"
                name="loanRate"
                value={details.loanRate}
                onChange={setValue}
              />

              <FormGroup
                label="Period (years)"
                placeholder="Period (years)"
                name="period"
                value={details.period}
                onChange={setValue}
              />

              <FormGroup
                label="Remarks"
                placeholder="Remarks"
                name="remarks"
                value={details.remarks}
                onChange={setValue}
              />

              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button variant="success" onClick={handleUpdate}>
                    Update Details
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => history.push(`/accType/${"second"}`)}
                    style={{ marginLeft: 48 }}
                  >
                    <i className="bi bi-arrow-left"></i>&nbsp; Go Back
                  </Button>
                </Col>
              </Form.Group>
              {showSuccessMsg && (
                <Alert variant="success">
                  Loan Account Type successfully updated !
                </Alert>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default LoanTypesEdit;
