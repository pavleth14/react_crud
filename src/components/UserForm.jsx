import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserForm = () => {
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost/vezba/api/insert_user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ime,
        prezime,
      }),
    });

    const data = await response.text();
    console.log(data); 
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
      <div style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)", width: "600px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Unos korisnika</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label>
              Ime:
              <input
                type="text"
                value={ime}
                onChange={(e) => setIme(e.target.value)}
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing: "border-box" }}
              />
            </label>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>
              Prezime:
              <input
                type="text"
                value={prezime}
                onChange={(e) => setPrezime(e.target.value)}
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing: "border-box" }}
              />
            </label>
          </div>
          <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px" }}>
            Pošaljite podatke
          </button>
        </form>

        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <Link to="/users">Vidi sve korisnike</Link>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
