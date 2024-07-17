import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UserEdit() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      try {
        const response = await axios.get(`http://localhost:3000/api/users/${id}`, config);
        setUser(response.data);
        setName(response.data.username);
        setEmail(response.data.email);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch user', err);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const data = { name, email };
      await axios.put(`http://localhost:3000/api/users/${id}`, data, config);
      alert('User updated successfully');
    } catch (err) {
      console.error('Failed to update user', err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit User</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <br />
      <br />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <br />
      <br />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default UserEdit;
