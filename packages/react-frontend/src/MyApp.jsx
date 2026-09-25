// src/MyApp.jsx
import React, { useEffect, useState } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);
    function fetchUsers() {
    return fetch("http://localhost:8000/users");
  }

  useEffect(() => {
    fetchUsers()
      .then((response) => response.json())
      .then((json) => setCharacters(json.users_list))
      .catch((error) => console.log(error));
  }, []);
    function deleteUser(id) {
    return fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE"
    });
  }

  function removeOneCharacter(id) {
    deleteUser(id)
      .then((response) => {
        if (response.status !== 204) {
          throw new Error("User was not deleted.");
        }

        const updated = characters.filter((character) => {
          return character._id !== id;
        });

        setCharacters(updated);
      })
      .catch((error) => {
        console.log(error);
      });
  }
    function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(person)
    });
  }
    function updateList(person) {
    postUser(person)
      .then((response) => {
        if (response.status !== 201) {
          throw new Error("User was not created.");
        }

        return response.json();
      })
      .then((newUser) => {
        setCharacters([...characters, newUser]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
  <div className="container">
    <Table
      characterData={characters}
      removeCharacter={removeOneCharacter}
    />
    <Form handleSubmit={updateList} />
  </div>
);
}
export default MyApp;