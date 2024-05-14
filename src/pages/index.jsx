import React from 'react';

function MainPage({ userData }) {
  return (
    <div>
      <h2>Main Page</h2>
      <p>Welcome, {userData}!</p>
    </div>
  );
}

export default MainPage;