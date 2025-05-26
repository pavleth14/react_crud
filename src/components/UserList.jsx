import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModalEditUser from "./ModalEditUser";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [clickedUserIme, setClickedUserIme] = useState('');
  const [clickedUserPrezime, setClickedUserPrezime] = useState('');
  const [userId, setUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // get users
    const fetchUsers = async () => {
      const response = await fetch("http://localhost/vezba/api/get_users.php");
      const data = await response.json();
      setUsers(data);
      console.log(data);
    };

    fetchUsers();
  }, []);

  const handleDeleteButton = async (userId) => {
    // sredjen interface pre slanja podataka backu
    const newList = users.filter(user => user.id !== userId);
    setUsers(newList);
    // slanje id-ja backendu da brise korisnika
    try {
        const response = await fetch("http://localhost/vezba/api/delete_user.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id: userId })
        });
    
        const result = await response.json();
        console.log(result.message);
      } catch (error) {
        console.error("Greška prilikom brisanja:", error);
      }
  }

  const handleEditButton = async(clickedId, userIme, userPrezime) => {
    setUserId(clickedId)
    setIsModalOpen(true);
    setClickedUserIme(userIme);
    setClickedUserPrezime(userPrezime);
  }

  useEffect(() => {
    console.log(users);
  }, [users])

  return (
    <div>
    { !isModalOpen && <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f2f2f2",
        padding: "20px"
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          width: "600px"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Lista korisnika
        </h2>

        {users.length > 0 ? (
          <ul style={{ paddingLeft: "20px" }}>
            {users.map((user, index) => (
              <li key={user.id} style={{ marginBottom: "10px", fontSize: "16px", border: '1px solid', padding: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>{user.ime} {user.prezime}</div>
                <div>
                <button className="btn btn-warning me-2" onClick={() => handleEditButton(user.id, user.ime, user.prezime)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDeleteButton(user.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ textAlign: "center", fontStyle: "italic" }}>Nema korisnika.</p>
        )}

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Link to="/" style={{ color: "#007BFF", textDecoration: "none" }}>
            Dodaj novog korisnika
          </Link> 
        </div>
      </div>
    </div> }
    {isModalOpen &&
     <ModalEditUser 
     userId={userId}
     userIme={clickedUserIme} 
     userPrezime={clickedUserPrezime}  
     setClickedUserIme = {setClickedUserIme}
     setClickedUserPrezime = {setClickedUserPrezime}
     setIsModalOpen={setIsModalOpen}
     />}
    </div>
  );
};

export default UserList;
