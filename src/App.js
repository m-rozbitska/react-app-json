import './App.css';  
import React, { useEffect, useState } from 'react';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchData();
  }, []);

  const handleUserButtonClick = async (userId, type) => {
    setSelectedUserId(userId);

    if (type === 'todos') {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
      const data = await response.json();
      setTodos(data);
    } else if (type === 'posts') {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
      const data = await response.json();
      setPosts(data);
    } else if (type === 'albums') {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
      const data = await response.json();
      setAlbums(data);
    }
  };

  const handleAlbumButtonClick = async (albumId) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
    const data = await response.json();
    setPhotos(data);
  };

  return (
    <div>
      <table id="userTable" width="100%">
        <thead>
          <tr>
            <th colSpan="9">Users</th>
          </tr>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>User name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.address.city}</td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
              <td>{user.company.name}</td>
              <td>
                <button
                  data-user-id={user.id}
                  className="todo-btn button"
                  onClick={() => handleUserButtonClick(user.id, 'todos')}
                >
                  Todos
                </button>
                <button
                  data-user-id={user.id}
                  className="post-btn button"
                  onClick={() => handleUserButtonClick(user.id, 'posts')}
                >
                  Posts
                </button>
                <button
                  data-user-id={user.id}
                  className="album-btn button"
                  onClick={() => handleUserButtonClick(user.id, 'albums')}
                >
                  Albums
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render other tables based on the state variables (todos, posts, etc.) */}
    </div>
  );
};

export default UserTable;
