import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { Axios } from '../../../../api/axios';
import { beasURL, EMPLOYEE } from '../../../../api/api';

export default function ManagmentEmployee() {
  const [user, setUser] = useState([]);
  const [filters, setFilters] = useState({
  search: "",
  role: "",
  account_status: ""
});

 useEffect(() => {
  Axios.get(`${beasURL}/${EMPLOYEE}`, {
    params: {
      search: filters.search,
      role: filters.role,
      account_status: filters.account_status
    }
  })
    .then((res) => setUser(res.data.data.data))
    .catch((err) => console.log(err));
}, [filters]);
function handleFilterChange(e) {
  setFilters({ ...filters, [e.target.name]: e.target.value });
}

  const userShow = user.map((u, key) => (
    <tr key={key}>
      <td>{u.user_id}</td>
      <td>{u.full_name}</td>
      <td>{u.phone}</td>
      <td>{u.email}</td>
      <td>{u.roles[0]?.name}</td>
      <td>
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
      </td>
    </tr>
  ));

  return (
    <div className="w-100 p-2">
      <h2 style={{ color: 'white', flex: 1, padding: 5 }}>
        Employees Pages :
      </h2>

      <div className="card-driver d-flex justify-content-between align-items-center px-3">
        <Link to={'employee.id'}>
          <Button
            style={{
              background: 'linear-gradient(90deg, var(--primary-blue), var(--primary-purple))',
              width: '180px',
              border: 'none',
            }}
            size="sm"
          >
            + Add Employee
          </Button>
        </Link>
        <div className="d-flex align-items-center gap-2">
            <Form.Select name="role" onChange={handleFilterChange} className='custom-select'>
  <option value="">All Roles</option>
  <option value="admin">Admin</option>
  <option value="employee">Employee</option>
</Form.Select>
<Form.Select name="account_status" onChange={handleFilterChange} className='custom-select'>
  <option value="">All Statuses</option>
  <option value="1">Active</option>
  <option value="0">Inactive</option>
</Form.Select>
        <Form.Control
          type="text"
          placeholder="Search Drivers..."
          className="custom-input-driver"
            name="search"
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
            <th>id</th>
            <th>Username</th>
            <th>phone</th>
            <th>email</th>
            <th>role</th>
            <th>action</th>
          </tr>
        </thead>

        <tbody>{userShow}</tbody>
      </Table>
    </div>
  );
}