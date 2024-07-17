import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.get('http://localhost:3000/api/users/', config);
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch users', err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      await axios.delete(`http://localhost:3000/api/users/${id}`, {
        ...config
      });
      // Atualiza a lista de usuários após a exclusão
      setUsers(users.filter(user => user.id !== id));
      alert('User deleted successfully');
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  const handleEditUser = async (id) => {
    navigate("http://localhost:3000/api/users/${id}")
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Usuários</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
              <td>
              <button onClick={() => handleEditUser(user.id)}>Editar user</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
