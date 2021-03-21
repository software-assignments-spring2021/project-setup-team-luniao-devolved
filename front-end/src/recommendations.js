// import logo from 'logo2.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './App.css';
import { useState } from 'react';
import axios from "axios";


import { Alert, Form, Button, Card, Modal, Container, Row, Col} from 'react-bootstrap';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Recommendations
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container>

          {props.recs.map(e => (
            <Row className="rec-row">
              <Card className="rec-card">
                <Card.Body>
                  <Card.Title>{e["date"]}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{e["from_country"]} to {e["to_country"]} </Card.Subtitle>
                  <Card.Text>
                    ${e["cost"]}
                  </Card.Text>
                  <Card.Link href={e["url"]}>More info</Card.Link>
                </Card.Body>
              </Card>
          </Row>
          ))}

        </Container>
      </Modal.Body>
      
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


function App(props) {

  const [topic, setTopic] = useState(0);
  const [budget, setBudget] = useState(0);
  const [date, setDate] = useState("");
  const [show, setShow] = useState(false);
  const [showFlightVar, setFlight] = useState(true);
  const [showOtherVar, setOther] = useState(false);
  
  const [recsReceived, setRecsReceived] = useState([]);
  const [modalShow, setModalShow] = useState(false);


  const handleSubmit= (e) => {
    console.log("Form values saved.");
    setShow(true);
    e.preventDefault();

    setModalShow(true)
    // submit values, and return recommendations from back-end
    // creating test data with Mockaroo API - no function to generate airport names so I generate country codes instead

    async function fetchData() {
      // axios is a 3rd-party module for fetching data from servers
      const result = await axios(
        // retrieving some mock data about animals for sale
        "https://my.api.mockaroo.com/recs.json?key=8f9d78c0"
      );
      // set the state variable
      // this will cause a re-render of this component
      //setData(result.data);
      setRecsReceived(result.data);
    }
    fetchData();


  }

  let showFunc = null;
  if (show === true) {
    showFunc = <Alert variant="success" onClose={() => setShow(false)} dismissible> Form submitted.</Alert>;
  }

  let showFlightForm = null;
  if (showFlightVar) {
    showFlightForm = (
      <div>
        <Form.Group controlId="validationCustom05">
          <Form.Label>Budget (in $)</Form.Label>
          <Form.Control type="number" placeholder="100" required value={budget} onChange={e => setBudget(e.target.value)}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid number.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="validationCustom05">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" placeholder="100" required value={date} onChange={e => setDate(e.target.value)}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid date.
          </Form.Control.Feedback>
        </Form.Group>
      </div>)
  }

  let showOtherForm = null;
  if (showOtherVar) {
    showOtherForm = (
      <div>
        <p>Other form</p>
      </div>
    )
  }

  // let showRecs = null;
  // if (typeof recsReceived !== 'undefined' && recsReceived.length > 0) {
  //   showRecs = (
  //     <div>
       
  //     </div>
  //   )
  // }

  return (
    <div className="App">
      <header className="App-header">
        <img src="logo2.png" className="logo" alt="logo" />
        {<h2 className="App-title">Recommendations</h2>}
      </header>

      {showFunc} 

      <body className="App-body">
          <Form className="App-form" onSubmit={e => { handleSubmit(e) }}>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Topic</Form.Label>
              <Form.Control as="select" value={topic} onChange={e => {
                setTopic(e.target.value)
                if (e.target.value === "0") {
                  setFlight(true);
                  setOther(false);
                } else if (e.target.value === "-1") {
                  setFlight(false);
                  setOther(true);
                }
                }}>
                <option value="0">Flight</option>
                <option value="-1">Other</option>
              </Form.Control>
            </Form.Group>
            
            {showFlightForm} {showOtherForm}

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>

         {/* {showRecs} */}

          <MyVerticallyCenteredModal
            recs={recsReceived}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />

      </body>


    </div>
  );
}

export default App;
