import React, { useState, useEffect } from 'react';

function ApplicationList() {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchApplications() {
      const response = await fetch('http://localhost:3000/applications');
      const data = await response.json();
      setApplications(data);
    }

    fetchApplications();
  }, []);

  const isExpired = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return today > deadlineDate;
  };

  const applicationStyle = (application) => {
    if (isExpired(application.applicationDeadline)) {
      return {
        backgroundColor: 'red',
        padding: '1em',
        marginBottom: '1em',
      };
    } else {
      return {
        backgroundColor: '#f2f2f2',
        padding: '1em',
        marginBottom: '1em',
      };
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/applications/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      const newApplications = applications.filter(
        (application) => application.id !== id
      );
      setApplications(newApplications);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredApplications = applications.filter((application) =>
    application.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("applications:", applications);
  console.log("filteredApplications:", filteredApplications);
  console.log("Applications with missing links:", applications.filter(application => !application.link));

  return (
    <div>
      
      <div>
        <input type="text" placeholder="Søk etter bedrift" value={searchTerm} onChange={handleSearch} />
      </div>
      <ul>
        {filteredApplications.map((application) => {
          console.log("application:", application);
          return (
            <li key={application.id} style={applicationStyle(application)}>
              <p>
                <strong>Navn:</strong> {application.companyName}
              </p>
              <p>
              <strong>Link:</strong> {application.Link && <a href={application.Link}>{application.Link}</a>}
              </p>
              <p>
                <strong>Stilling:</strong> {application.jobTitle}
              </p>
              <p>
                <strong>Søknadsfrist:</strong> {new Date(application.applicationDeadline).toLocaleDateString()}
              </p>
              <button onClick={() => handleDelete(application.id)}>Slett</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ApplicationList;
