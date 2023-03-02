import React, { useState } from 'react';
import './admin.css';
import Admin from './Admin';

function AdminPage(props) {
  const [password, setPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!password) {
      errors.password = 'Passord er påkrevd';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Legg til ditt eget passord her:
    const validPassword = "Password";

    if (password === validPassword) {
      setShowLoginForm(false);
      setShowAdminPanel(true);
    } else {
      setFormErrors({ password: 'Feil passord' });
    }
  };

  return (
    <div className="AdminPage">
      <h1>Administratorpanel</h1>
      {showLoginForm && (
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="password">Passord:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {formErrors.password && (
              <span className="error">{formErrors.password}</span>
            )}
          </div>
          <button type="submit">Logg inn</button>
        </form>
      )}
      {showAdminPanel && <Admin />}
    </div>
  );
}

export default AdminPage;
