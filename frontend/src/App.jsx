import { Outlet, Link } from "react-router-dom";
import Contexte from "./components/Contexte";
import { useState, useEffect, useCallback } from 'react';
const API_URL = 'http://localhost:3000/api';
import logo from './img/jira-logo.png';

function App() {
  const [loguejat, setLoguejat] = useState(null)
  const logout = useCallback(() => {
    // Clear the authentication token cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Set the expiration date to a past date
    setLoguejat(null)
    window.location.href = "/"; // Redirect to the login page
  }, [setLoguejat]);


  const dades = { loguejat, setLoguejat, logout, API_URL }


  useEffect(() => {
    // si tenim una cookie, intentem validar-la
    if (document.cookie.includes('token')) {
      fetch(API_URL + '/refresh', { credentials: "include" })
        .then(e => e.json())
        .then(data => {
          if (data.error) {
            // api rebutja la cookie local, l'esborrem
            logout();
          } else {
            // api accepta la cookie, simulem login
            setLoguejat(data)
          }
        })
    }

  }, [logout])

  return (
    <>
      <Contexte.Provider value={dades}>

        <div>

          <div className="flex justify-around p-4 shadow-lg mb-10 items-center bg-white px-16" >
            <div className="flex-1 flex justify-start"><img src={logo} alt="logo" width="30px" height="30px" /> <div className="text-black font-mono text-2xl px-2">Regira</div></div>
            {loguejat && <div className="flex-1 flex justify-center"><Link className="border px-4 py-2 bg-blue-200 hover:bg-blue-300 text-black rounded-full" to="/projects">Projects</Link></div>}
            {loguejat && <div className="flex-1 flex justify-end"><button className="border px-4 py-2 bg-blue-200 hover:bg-blue-300 text-black rounded-full" onClick={logout}>Logout {loguejat.name}</button></div>}
          </div>

          <div >
            <Outlet />
          </div>

        </div>
      </Contexte.Provider>
    </>
  )
}

export default App
