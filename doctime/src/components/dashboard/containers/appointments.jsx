import React, { useState, useEffect } from 'react';
// Import React and necessary hooks (useState, useEffect)

import Navbar from './navbar';
// Import the Navbar component

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import FontAwesomeIcon for using icons

import { faTrash } from '@fortawesome/free-solid-svg-icons';
// Import specific FontAwesome icon for the delete functionality

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  // State to store the list of appointments, initialized as an empty array

  useEffect(() => {
    // Retrieve appointments from localStorage when the component mounts
    const savedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    // Parse saved appointments or initialize as an empty array if not found

    const validAppointments = savedAppointments.filter(appointment =>
      // Filter out invalid appointments (ensure all fields are present)
      appointment.name &&
      appointment.doctor &&
      appointment.specialty &&
      appointment.timings &&
      appointment.slot
    );

    setAppointments(validAppointments);
    // Set the filtered appointments to state
  }, []);
  // Dependency array is empty to run this effect only once on mount

  const handleDelete = (index) => {
    // Delete an appointment by its index
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    // Filter out the selected appointment from the list

    setAppointments(updatedAppointments);
    // Update the state with the new list of appointments

    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    // Update localStorage with the updated list
  };

  return (
    <div className="min-h-screen p-4 md:p-8 w-full">
      <Navbar />
      {/* Render the Navbar component */}
      <h2 className="text-white text-xl md:text-2xl text-center mt-4 md:mt-6 mb-4 md:mb-6">
        Scheduled Appointments
      </h2>
      {/* Section title */}
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Create a responsive grid layout for the appointments */}
          
          {appointments.length > 0 ? (
            // Render the appointments if the list is not empty
            appointments.map((appointment, index) => (
              <div
                key={index}
                className="p-4 bg-custombg rounded-lg shadow-md text-white flex justify-between items-start w-full"
              >
                {/* Card for each appointment */}
                
                <div className="flex-1 space-y-2">
                  {/* Container for appointment details */}
                  <p className="text-base md:text-lg break-words">
                    <span className="font-medium">Hospital/Clinic:</span> {appointment.name}
                  </p>
                  <p className="text-base md:text-lg break-words">
                    <span className="font-medium">Doctor:</span> {appointment.doctor}
                  </p>
                  <p className="text-base md:text-lg break-words">
                    <span className="font-medium">Specialty:</span> {appointment.specialty}
                  </p>
                  <p className="text-base md:text-lg">
                    <span className="font-medium">Timing:</span> {appointment.timings}
                  </p>
                  <p className="text-base md:text-lg">
                    <span className="font-medium">Slot Number:</span> {appointment.slot}
                  </p>
                </div>
                
                <button
                  onClick={() => handleDelete(index)}
                  className="ml-2 p-2 hover:bg-red-600/20 rounded-full transition-colors"
                  title="Delete Appointment"
                >
                  {/* Delete button */}
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 hover:text-red-700 text-lg md:text-xl"
                  />
                </button>
              </div>
            ))
          ) : (
            // Show a message if there are no appointments
            <div className="col-span-full text-center">
              <p className="text-white text-lg">No appointments scheduled.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
// Export the component for use in other parts of the application
