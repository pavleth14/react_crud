// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div style={{width: '100vw'}}>
        <h1 style={{textAlign: 'center'}}>Welcome to User Management</h1>
        <Routes>
          {/* Ruta za unos korisnika */}
          <Route path="/" element={<UserForm />} />
          
          {/* Ruta za prikaz svih korisnika */}
          <Route path="/users" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
