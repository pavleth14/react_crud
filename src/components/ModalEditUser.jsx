import { useEffect } from "react"

const ModalEditUser = ({userId, userIme, userPrezime, setClickedUserIme, setClickedUserPrezime, setIsModalOpen}) => {

    const handleChangeName = (e) => {
        setClickedUserIme(e.target.value)
    }

    const handleChangeLastname = (e) => {
        setClickedUserPrezime(e.target.value)
    }

    useEffect(() => {
        console.log(userId)
        console.log(userIme)
        console.log(userPrezime)
    }, [userIme, userPrezime])

    const handleSaveButton = async () => {
        console.log('userId: ' + userId + ', ime: ' + userIme + ', prezime: ' + userPrezime)
        try {
            const response = await fetch("http://localhost/vezba/api/edit_user.php", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ id: userId, ime: userIme, prezime: userPrezime })
            });
        
            const result = await response.json();
            console.log(result.message);
          } catch (error) {
            console.error("Greška prilikom brisanja:", error);
          }
          setTimeout(() => {
            setIsModalOpen(false);
          }, 1000);
    }

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f2f2f2",
            padding: "20px",
            width: '100%'
        }}>
            <div style={{
                backgroundColor: "#fff",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                width: "600px",
                display: 'flex',
                justifyContent: 'center'
            }}>
                <input onChange={(e) => handleChangeName(e)} type="text" value={userIme} placeholder="Change name..." />
                <input onChange={(e) => handleChangeLastname(e)} type="text" value={userPrezime} placeholder="Change lastname..." />
                <span><button onClick={handleSaveButton}>Save</button></span>
                <span><button onClick={() => setIsModalOpen(false)}>Cancel</button></span>
                
            </div>
        </div>
    );
}

export default ModalEditUser;