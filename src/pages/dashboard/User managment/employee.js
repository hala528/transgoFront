import { Button ,Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';


export default function ManagmentEmployee(){



  return ( 
   <div className='w-100 p-2' >
    <h2 style={{color:'white', flex:1 ,padding:5}}>Employees Pages :</h2>
   <div className='card-driver d-flex justify-content-between align-items-center px-3'>
  <Link to={'employee.id'}>
  <Button
  
    style={{
      background: 'linear-gradient(90deg, var(--primary-blue), var(--primary-purple))',
      width: '180px',
      border:'none'
    }}
    variant="primary"
    size="sm"
  >
    + Add Employee
  </Button>
  </Link>

  <Form.Control
    type="text"
    placeholder="Search Drivers..."
    className="custom-input-driver"
    style={{
      width: '250px',
      borderRadius: '10px',
    
      color: 'white',
      background:'rgba(255, 255, 255, 0.08)'
     
    }}
  />

</div>
    <Table className='custom-table' bordered hover striped>
      
      <thead>
        <tr>
          <th>id</th>
          <th>Username</th>
          <th>munber </th>
          <th>addres</th>
          <th>state</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>active</td>
          <td><Button
    style={{
      
      background: 'linear-gradient(90deg, var(--primary-blue), var(--primary-purple))',
      width: '100px',
      border:'none'
    }}
    variant="primary"
    size="sm"
  >
    view details
  </Button></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
           <td>active</td>
          <td><Button
    style={{
      
      background: 'linear-gradient(90deg, var(--primary-blue), var(--primary-purple))',
      width: '100px',
      border:'none'
    }}
    variant="primary"
    size="sm"
  >
    view details
  </Button></td>
        </tr>
        <tr>
          <td>3</td>
          <td >Larry the Bird</td>
          <td>@twitter</td>
          <td>Mark</td>
           <td>active</td>
          <td><Button
    style={{
      
      background: 'linear-gradient(90deg, var(--primary-blue), var(--primary-purple))',
      width: '100px',
      border:'none'
    }}
    variant="primary"
    size="sm"
  >
    view details
  </Button></td>
        </tr>
        <tr>
          <td>4</td>
          <td >Larry the Bird</td>
          <td>@twitter</td>
          <td>Mark</td>
           <td>active</td>
          <td><Button
    style={{
      
      background: 'linear-gradient(90deg, var(--primary-blue), var(--primary-purple))',
      width: '100px',
      border:'none'
    }}
    variant="primary"
    size="sm"
  >
    view details
  </Button></td>
        </tr>
      </tbody>
    </Table>
    </div>
  );
}


