import React, { useState, useEffect } from 'react';
import './App.css';
import ApplicationList from './ApplicationList';
import Admin from './admin'; // Import the Admin component

function App() {
  const [applications, setApplications] = useState([]);
  const [searchTerm,] = useState('');
  const [showAdmin, setShowAdmin] = useState(false); // Add a state to track if the admin panel should be shown

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
    setShowAdmin(true);
  }

  return (
    <div className="App">
      <header>
        <h1>Lærlings-søknader</h1>
      </header>
      <main>
        <section id="applications-section">
          {showAdmin ? (
            <Admin />
          ) : (
            <ApplicationList applications={filteredApplications} />
          )}
        </section>
        <button onClick={handleShowAdmin}>Add søknad</button>
      </main>
      <footer>
        
      </footer>
    </div>
  );
}

export default App;
