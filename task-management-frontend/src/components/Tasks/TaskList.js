import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/tasks', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.data && Array.isArray(response.data.data)) {
          setTasks(response.data.data);
        } else {
          console.error('Expected an array, but got:', response.data);
        }
      } catch (err) {
        console.error('Failed to fetch tasks', err);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  const handlePatch = async (id, status) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/tasks/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      setTasks(tasks.map(task => (task.id === id ? { ...task, status } : task)));
    } catch (err) {
      console.error('Failed to update task status', err);
    }
  };

  return (
    <>
      <Button href='/profile'>Profile</Button>
      <div>
        <Link to="/tasks/new">
          <Button variant="primary">Add New Task</Button>
        </Link>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.due_date}</td>
                  <td>{task.priority}</td>
                  <td>
                    <select
                      value={task.status}
                      onChange={(e) => handlePatch(task.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td>
                    <Link to={`/tasks/edit/${task.id}`}>
                      <Button variant="warning">Edit</Button>
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No tasks available.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default TaskList;
