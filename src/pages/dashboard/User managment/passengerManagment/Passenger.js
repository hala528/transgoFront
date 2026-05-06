import { Button ,Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { GET_PASSENGER } from '../../../../api/api';
import { Axios } from '../../../../api/axios';
import { beasURL } from '../../../../api/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Passenger() {
    const [user, setUser] = useState([]);
      const [filters, setFilters] = useState({
      name: "",
      phone: "",
      account_status: ""
    });
    useEffect(() => {
      Axios.get(`${beasURL}/${GET_PASSENGER}`, {
        params: {
          name: filters.name,
          phone: filters.phone,
          account_status: filters.account_status
        }
      })
        .then((res) => setUser(res.data.data.data))
        .catch((err) => console.log(err));
    }, [filters]);
    function handleFilterChange(e) {
      setFilters({ ...filters, [e.target.name]: e.target.value });
    }

const userShow = user.map((u) => (
  <tr key={u.user_id}>
    <td>{u.user_id}</td>
    <td>{u.full_name}</td>
    <td>{u.phone}</td>
    <td>{u.email}</td>
    <td>{u.account_status === 1 ? "Active" : "Inactive"}</td>
      <td>
        <Link to={`/dashboard/passenger/${u.user_id}`}>
        <Button
          style={{
            background: 'linear-gradient(90deg, var(--primary-blue), var(--primary-purple))',
            width: '100px',
            border: 'none',
          }}
          size="sm"
        >
          view details
        </Button>
        </Link>
      
      </td>
    </tr>
  ));

  return (
    <div className="w-100 p-2">
      <h2 style={{ color: 'white', flex: 1, padding: 5 }}>
        Passenger Pages :
      </h2>

      <div className="card-driver d-flex justify-content-between align-items-center px-3">
        
        <div className="d-flex align-items-center gap-2 justify-content-center">
           
<Form.Select name="account_status" onChange={handleFilterChange} className='custom-select'>
  <option value="">All Statuses</option>
  <option value="1">Active</option>
  <option value="0">Inactive</option>
</Form.Select>
        <Form.Control
          type="text"
          placeholder="Search Passengers..."
          className="custom-input-driver"
            name="name"
          onChange={handleFilterChange}
          style={{
            width: '250px',
            borderRadius: '10px',
            color: 'white',
            background: 'rgba(255, 255, 255, 0.08)',
          }}
        />
         <Form.Control
          type="text"
          placeholder="Search phones..."
          className="custom-input-driver"
            name="phone"
          onChange={handleFilterChange}
          style={{
            width: '250px',
            borderRadius: '10px',
            color: 'white',
            background: 'rgba(255, 255, 255, 0.08)',
          }}
        />
        </div>
       
      </div>

      <Table className="custom-table" bordered hover striped>
        <thead>
          <tr>
            <th>ID</th>
    <th>Name</th>
    <th>Phone</th>
    <th>Email</th>
    <th>Status</th>
            <th>action</th>
          </tr>
        </thead>

        <tbody>{userShow}</tbody>
      </Table>
    </div>
  );
}

