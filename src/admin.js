import React, { useState } from 'react';
import './admin.css';

function Admin() {
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [link, setlink] = useState('');
  const [formErrors, setFormErrors] = useState({});

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

  const handleSubmit = async (e) => {
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

  return (
    <div className="Admin">
      <h1>Legg til en ny søknad</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="company-name">Bedriftens navn</label>
          <input
            type="text"
            id="company-name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          {formErrors.companyName && (
            <span className="error">{formErrors.companyName}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="link-name">Link</label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={(e) => setlink(e.target.value)}
          />
          {formErrors.link && (
            <span className="error">{formErrors.link}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="job-title">Stillingstittel</label>
          <input
            type="text"
            id="job-title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          {formErrors.jobTitle && (
            <span className="error">{formErrors.jobTitle}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="application-deadline">Søknadsfrist</label>
          <input
            type="date"
            id="application-deadline"
            value={applicationDeadline}
            onChange={(e) => setApplicationDeadline(e.target.value)}
          />
          {formErrors.applicationDeadline && (
            <span className="error">{formErrors.applicationDeadline}</span>
          )}
        </div>
        <button type="submit">Legg til</button>
      </form>
    </div>
  );
}

export default Admin;
