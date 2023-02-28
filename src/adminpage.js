import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AdminPage = () => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <div>You must be logged in to access the admin page</div>;
  }

  return (
    <div>
      {/* Render the admin page components here */}
    </div>
  );
};

export default AdminPage;