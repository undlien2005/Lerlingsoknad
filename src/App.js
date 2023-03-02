import React, { useState, useEffect } from 'react';
import './App.css';
import ApplicationList from './ApplicationList';
import Admin from './admin';

function App() {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdmin, setShowAdmin] = useState(false); // Add a state to track if the admin panel should be shown
  const [password, setPassword] = useState(''); // Add state for password

  useEffect(() => {
    // Function to fetch apprenticeship applications from an API
    const fetchApplications = async () => {
      const response = await fetch('http://localhost:3000/applications');
      const data = await response.json();
      setApplications(data);
    };
    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((application) =>
    application.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowAdmin = () => {
    if (password === 'Password') { // Check if password is correct
      setShowAdmin(true);
    } else {
      alert('Incorrect password'); // Show an error message if password is incorrect
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Lærlings-søknader</h1>
      </header>
      <main>
        <section id="applications-section">
          {showAdmin ? (
            <Admin applications={applications} setApplications={setApplications} />
          ) : (
            <ApplicationList applications={filteredApplications} />
          )}
        </section>
        <div id="Adminp">
        <br></br>
        <button id="button1" onClick={handleShowAdmin}>Admin</button>
        <br></br>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{marginLeft: '10px'}} /> {/* Add an input field for the password */}
        </div>
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
