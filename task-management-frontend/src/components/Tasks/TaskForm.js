import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const TaskForm = ({ task = {}, onSave }) => {
  const [title, setTitle] = useState(task.title || '');
  const [description, setDescription] = useState(task.description || '');
  const [dueDate, setDueDate] = useState(task.due_date || '');
  const [priority, setPriority] = useState(task.priority || '');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch task details if an ID is provided
      const fetchTask = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/tasks`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          
          // Ensure the response data structure matches your expectations
          if (response.data) {
            const task = response.data;
            setTitle(task.title || '');
            setDescription(task.description || '');
            setDueDate(task.due_date || '');
            setPriority(task.priority || '');
          } else {
            console.error('Unexpected response data:', response.data);
            setError('Unexpected response data');
          }
        } catch (err) {
          // Log the error response for debugging
          if (err.response) {
            console.error('API response error:', err.response.data);
            setError(`Failed to fetch task details: ${err.response.data.message || 'Unknown error'}`);
          } else if (err.request) {
            console.error('No response received:', err.request);
            setError('Failed to fetch task details: No response from server');
          } else {
            console.error('Error setting up request:', err.message);
            setError(`Failed to fetch task details: ${err.message}`);
          }
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskData = { title, description, due_date: dueDate, priority };
      if (id) {
        // Update existing task
        await axios.put(`http://127.0.0.1:8000/api/tasks/${id}`, taskData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        // Create new task
        await axios.post('http://127.0.0.1:8000/api/tasks', taskData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }
      navigate('/tasks');
    } catch (err) {
      console.error('Failed to save task', err);
      setError('Failed to save task');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formDueDate">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPriority">
        <Form.Label>Priority</Form.Label>
        <Form.Control
          as="select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="">Select priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Form.Control>
      </Form.Group>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" type="submit">
        {id ? 'Update Task' : 'Create Task'}
      </Button>
    </Form>
  );
};

export default TaskForm;
