import React from 'react';
// Import React to create the component

import Navbar from './navbar';
// Import the Navbar component to display the navigation bar

import HeroSection from './herosection';
// Import the HeroSection component for the main banner or introductory section

import HospitalClinicList from './nearby';
// Import the HospitalClinicList component to show a list of nearby hospitals and clinics

function Dashboard() {
  return (
    <div className=''>
      {/* Main container for the dashboard */}
      <section className=''>
        {/* Section to organize the main parts of the dashboard */}
        <Navbar />
        {/* Render the Navbar component */}
        <HeroSection />
        {/* Render the HeroSection component */}
        <HospitalClinicList />
        {/* Render the HospitalClinicList component */}
      </section>
    </div>
  );
}

export default Dashboard;
// Export the Dashboard component for use in other parts of the application
