// src/components/Profile/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Table } from 'react-bootstrap'; // Ensure Table is imported

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUsername(response.data.user.username);
        setEmail(response.data.user.email);
      } catch (err) {
        console.error('Failed to fetch profile', err);
        setError('Failed to fetch profile');
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://127.0.0.1:8000/api/profile', { username, email }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Profile updated successfully');
    } catch (err) {
      console.error('Failed to update profile', err);
      setError('Failed to update profile');
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{username}</td>
            <td>{email}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Profile;
