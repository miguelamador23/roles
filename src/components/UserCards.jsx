import React, { useEffect, useState } from 'react';
import './UserCards.css';
import SearchBar from './SearchBar';

function UserCards() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch('users.json');
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    getUsers();
  }, []);

  const handleSearch = (searchTerm) => {
    const filteredData = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredData);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="card-container">
        {filteredUsers.map((user) => (
          <div key={user.id} className="card">
            {user.avatar ? (
              <img src={user.avatar} alt="" className="card-img" />
            ) : (
              <div className="placeholder-img"></div>
            )}
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.role}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default UserCards;