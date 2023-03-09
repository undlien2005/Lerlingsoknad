import React, { useState, useEffect } from 'react';
import './App.css';
import ApplicationList from './ApplicationList';
import Admin from './admin';

function App() {
  // Define state variables using the useState hook
  const [applications, setApplications] = useState([]); // State for apprenticeship applications
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [showAdmin, setShowAdmin] = useState(false); // State to track if the admin panel should be shown
  const [password, setPassword] = useState(''); // State for password

  // Use the useEffect hook to fetch apprenticeship applications from an API
  useEffect(() => {
    const fetchApplications = async () => {
      const response = await fetch('http://localhost:3000/applications');
      const data = await response.json();
      setApplications(data);
    };
    fetchApplications();
  }, []);

  // Filter the applications based on the search term
  const filteredApplications = applications.filter((application) =>
    application.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle showing the admin panel
  const handleShowAdmin = () => {
    if (password === 'Password') { // Check if the password is correct
      setShowAdmin(true); // Show the admin panel
    } else {
      alert('Incorrect password'); // Show an error message if the password is incorrect
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Lærlings-søknader</h1>
      </header>
      <main>
        <section id="applications-section">
          {/* Conditional rendering: show either the admin panel or the application list */}
          {showAdmin ? (
            <Admin applications={applications} setApplications={setApplications} />
          ) : (
            <ApplicationList applications={filteredApplications} />
          )}
        </section>
        <div id="Adminp">
          <br></br>
          {/* Button to show/hide the admin panel */}
          <button id="button1" onClick={handleShowAdmin}>Admin</button>
          <br></br>
          {/* Input field for the password */}
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{marginLeft: '10px'}} />
        </div>
      </main>
      <footer>
        {/* Footer content goes here */}
      </footer>
    </div>
  );
}

export default App;