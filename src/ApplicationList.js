import React, { useState, useEffect } from 'react';
import './ApplicationList.css';

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
        backgroundColor: 'gray',
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

  const activeApplications = filteredApplications.filter(
    (application) => !isExpired(application.applicationDeadline)
  );

  const expiredApplications = filteredApplications.filter(
    (application) => isExpired(application.applicationDeadline)
  );

  const [expandedApplicationId, setExpandedApplicationId] = useState(null);

  const handleExpand = (id) => {
    if (id === expandedApplicationId) {
      // if the clicked application box is already expanded, collapse it
      setExpandedApplicationId(null);
    } else {
      // if a different application box is expanded, collapse it first and then expand the clicked application box
      setExpandedApplicationId(id);
    }
  };
  const handleCollapse = () => {
    setExpandedApplicationId(null);
  };

  const [showExpired, setShowExpired] = useState(false);

  const handleToggleExpired = () => {
    setShowExpired(!showExpired);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Søk etter bedrift"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {activeApplications.length > 0 && (
        <div>
          <h2>Aktive søknader</h2>
          <ul>
            {activeApplications.map((application) => (
              <li key={application.id} style={applicationStyle(application)}>
                <div
                  className="application-box"
                  onClick={() => handleExpand(application.id)}
                >
                  <p className="company-name">{application.companyName}</p>
                  <p className="job-title">{application.jobTitle}</p>
                </div>
                {expandedApplicationId === application.id && (
                  <div className="expanded-application-box">
                    <p>
                      <strong>Navn:</strong> {application.companyName}
                    </p>
                    <p>
  <strong>Link:</strong>
  {application.Link && (
    <a href={application.Link} target="_blank" rel="noopener noreferrer">{application.Link}</a>
  )}
</p>
                    <p>
                      <strong>Stilling:</strong> {application.jobTitle}
                    </p>
                    <p>
                      <strong>Søknadsfrist:</strong>{' '}
{new Date(application.applicationDeadline).toLocaleDateString(
'nb-NO'
)}
</p>


</div>
)}
</li>
))}
</ul>
</div>
)}
{showExpired && expiredApplications.length > 0 && (
<div>
<h2>Utløpte søknader</h2>
<ul>
{expiredApplications.map((application) => (
<li key={application.id} style={applicationStyle(application)}>
<div
className="application-box"
onClick={() => handleExpand(application.id)}
>
<p className="company-name">{application.companyName}</p>
<p className="job-title">{application.jobTitle}</p>
</div>
{expandedApplicationId === application.id && (
<div className="expanded-application-box">
<p>
<strong>Navn:</strong> {application.companyName}
</p>
<p>
  <strong>Link:</strong>
  {application.Link && (
    <a href={application.Link} target="_blank" rel="noopener noreferrer">{application.Link}</a>
  )}
</p>

<p>
<strong>Stilling:</strong> {application.jobTitle}
</p>
<p>
<strong>Søknadsfrist:</strong>{' '}
{new Date(application.applicationDeadline).toLocaleDateString(
'nb-NO'
)}
</p>


</div>
)}
</li>
))}
</ul>
</div>
)}
<button className="expired-button" onClick={handleToggleExpired}>
  {showExpired ? 'Skjul utløpte' : 'Vis utløpte'}
</button>

<br></br>
</div>
);
}
export default ApplicationList;