import { Col, Form, Row } from "react-bootstrap";

export default function AddDriver(){
    return(
        <div className="w-100 p-2">
             <h3 style={{color:'white', flex:1 ,padding:5}}>Add Driver :</h3>
              <h3 className="subtitle-driver-bold">enter informtion of driver :</h3>
              <Form style={{
      marginBottom:'10px',
      borderRadius: '3px',
      color: 'white',
    }}>
      <Row>
        <Col xs={5}>
          <Form.Control 
          placeholder="enter name"
          className="custom-input-driver"
    style={{
      borderRadius: '3px',
      color: 'white',
      background:'rgba(255, 255, 255, 0.15)'
    }}
          />
        </Col>
        <Col>
          <Form.Control placeholder="enter number"
           className="custom-input-driver"
    style={{
     
      borderRadius: '3px',
    
      color: 'white',
      background:'rgba(255, 255, 255, 0.15)'
     
    }}
          />
        </Col>
        <Col>
          <Form.Control placeholder="enter addres"
           className="custom-input-driver"
    style={{
      borderRadius: '3px',
      color: 'white',
      background:'rgba(255, 255, 255, 0.15)' }}
          />
        </Col>
      </Row>
    </Form>
       <p className="subtitle-driver">enter a photo of personal Id :</p>
    <Form.Group   controlId="formFileMultiple" className="mb-3" >
    <Form.Control  type="file" multiple  className="custom-input-driver"
    style={{
      borderRadius: '3px',
      color: 'white',
      background:'rgba(255, 255, 255, 0.15)'
    }} />
      </Form.Group>
       <p className="subtitle-driver">enter a copy of the driving cerifiticate :</p>
    <Form.Group   controlId="formFileMultiple" className="mb-3" >
    <Form.Control  type="file" multiple  className="custom-input-driver"
    style={{
      borderRadius: '3px',
      color: 'white',
      background:'rgba(255, 255, 255, 0.15)'
    }} />
      </Form.Group>
       <p className="subtitle-driver">enter a personal photo :</p>
    <Form.Group   controlId="formFileMultiple" className="mb-3" >
    <Form.Control  type="file" multiple  className="custom-input-driver"
    style={{
      borderRadius: '3px',
      color: 'white',
      background:'rgba(255, 255, 255, 0.15)'
    }} />
      </Form.Group>
       <Form style={{
      marginBottom:'10px',
      borderRadius: '10px',
      color: 'white',
    }}>

          <h3 className="subtitle-driver-bold">enter vehicle information :</h3>
     <Row>
        <Col xs={4}>
          <Form.Control 
          placeholder="enter type car"
          className="custom-input-driver"
    style={{
      borderRadius: '3px',
      color: 'white',
      background:'rgba(255, 255, 255, 0.15)'
    }}
          />
        </Col>
        <Col>
          <Form.Control placeholder="car mechanics"
           className="custom-input-driver"
    style={{
     
      borderRadius: '3px',
    
      color: 'white',
      background:'rgba(255, 255, 255, 0.15)'
     
    }}
          />
        </Col>
        
      </Row>
    </Form>
     <p className="subtitle-driver">enter a four photo for car :</p>
    <Form.Group   controlId="formFileMultiple" className="mb-3" >
    <Form.Control  type="file" multiple  className="custom-input-driver"
    style={{
      borderRadius: '3px',
      color: 'white',
      background:'rgba(255, 255, 255, 0.15)'
    }} />
      </Form.Group>
       <button className="btn-login">Add driver </button>
        </div>
    )
}