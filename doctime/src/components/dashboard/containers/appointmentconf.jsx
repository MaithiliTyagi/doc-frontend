import React, { useEffect, useState } from 'react'; 
// Import React and necessary hooks (useEffect, useState)

import { useNavigate } from 'react-router-dom'; 
// Import the useNavigate hook for programmatic navigation

const AppointmentConfirmation = () => {
  const [appointmentInfo, setAppointmentInfo] = useState(null); 
  // State to store appointment information, initialized to null

  const navigate = useNavigate(); 
  // Hook to handle navigation between routes

  useEffect(() => {
    // Retrieve appointment information from localStorage when the component mounts
    const savedAppointmentInfo = JSON.parse(localStorage.getItem('appointment-info'));
    // Parse the saved JSON string into a JavaScript object
    setAppointmentInfo(savedAppointmentInfo); 
    // Update the state with the retrieved information
  }, []); 
  // Dependency array is empty to run the effect only once on mount

  // Show a loading message if appointment information hasn't been loaded yet
  if (!appointmentInfo) {
    return <div className="h-screen">Loading...</div>;
  }

  // Render the confirmation details once the information is available
  return (
    <div className="h-screen flex flex-wrap justify-center items-center text-white p-6">
      {/* Main container with styling for centering and layout */}
      <div className='h-[450px] w-[500px] bg-custombg rounded-xl flex flex-col justify-center items-center'>
        {/* Card-like container for the appointment details */}
        <h2 className="text-2xl font-bold">Appointment Confirmed!</h2>
        {/* Title for the confirmation message */}
        
        <p className="text-xl mt-4">Hospital/Clinic: {appointmentInfo.name}</p>
        {/* Display the name of the hospital or clinic */}
        
        <p className="text-xl mt-2">Doctor: {appointmentInfo.doctor}</p>
        {/* Display the doctor's name */}
        
        <p className="text-xl mt-2">Specialty: {appointmentInfo.specialty}</p>
        {/* Display the doctor's specialty */}
        
        <p className="text-xl mt-2">Appointment Timing: {appointmentInfo.timings}</p>
        {/* Display the appointment timing */}
        
        <p className="text-xl mt-2">Your Slot Number: {appointmentInfo.slot}</p>
        {/* Display the appointment slot number */}
        
        <button onClick={() => navigate('/appointments')} className="mt-4 bg-white text-custombg p-2 rounded-lg">
          {/* Button to navigate to the appointments page */}
          View Appointments
        </button>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;
// Export the component for use in other parts of the application




