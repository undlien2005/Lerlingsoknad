import React, { useState } from 'react';
import './admin.css';

function Admin({ applications, setApplications }) {
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [link, setlink] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);

  const validateForm = () => {
    let errors = {};

    if (!companyName) {
      errors.companyName = 'Bedriftens navn er påkrevd';
    }

    if (!link) {
      errors.Link = 'Link er påkrevd';
    }

    if (!jobTitle) {
      errors.jobTitle = 'Stillingstittel er påkrevd';
    }

    if (!applicationDeadline) {
      errors.applicationDeadline = 'Søknadsfrist er påkrevd';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const response = await fetch('http://localhost:3000/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companyName,
        link,
        jobTitle,
        applicationDeadline,
      }),
    });

    if (response.ok) {
      setCompanyName('');
      setlink('');
      setJobTitle('');
      setApplicationDeadline('');
    }
  };

  const handleDeleteSubmit = async (id) => {
    const response = await fetch(`http://localhost:3000/applications/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const updatedApplications = applications.filter(application => application.id !== id);
      setApplications(updatedApplications);
    }
  };

  return (
    <div className="Admin">
      <h1>Admin</h1>
      {showAddForm ? (
        <div>
          <h2>Legg til en ny søknad</h2>
          <form onSubmit={handleAddSubmit}>
            <div className="form-group">
              <label htmlFor="companyName">Bedriftens navn:</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              {formErrors.companyName && (
                <div className="error">{formErrors.companyName}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="link">Link:</label>
              <input
                type="text"
                id="link"
                name="link"
                value={link}
                onChange={(e) => setlink(e.target.value)}
              />
              {formErrors.Link && (
                <div className="error">{formErrors.Link}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="jobTitle">Stillingstittel:</label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
              {formErrors.jobTitle && (
                <div className="error">{formErrors.jobTitle}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="applicationDeadline">Søknadsfrist:</label>
              <input
                type="date"
                id="applicationDeadline"
                name="applicationDeadline"
                value={applicationDeadline}
                onChange={(e) => setApplicationDeadline(e.target.value)}
              />
              {formErrors.applicationDeadline && (
                <div className="error">{formErrors.applicationDeadline}</div>
              )}
            </div>
            <button type="submit">Legg til</button>
            <br></br>
            <button onClick={() => setShowAddForm(false)}>Avbryt</button>
          </form>
        </div>
      ) : (
        <button onClick={() => setShowAddForm(true)}>Legg til ny søknad</button>
      )}
      <h2>Registrerte søknader</h2>
      {applications.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Bedrift</th>
              <th>Stillingstittel</th>
              <th>Søknadsfrist</th>
              <th>Link</th>
              <th>Slett</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td>{application.companyName}</td>
                <td>{application.jobTitle}</td>
                <td>{application.applicationDeadline}</td>
                <td>
                  <a href={application.link} target="_blank" rel="noreferrer">
                    {application.link}
                  </a>
                </td>
                <td>
                  <button id="buttoncolor" onClick={() => handleDeleteSubmit(application.id)}>Slett</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Ingen søknader registrert</p>
      )}
    </div>
  );
}
export default Admin;



