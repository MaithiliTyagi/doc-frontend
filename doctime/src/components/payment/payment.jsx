import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Payment = () => {
  const { id, doctorname } = useParams(); // Extract hospital/clinic ID and doctor name from URL parameters
  const [appointmentDetails, setAppointmentDetails] = useState(null); // Stores the appointment details
  const [appointmentSlot, setAppointmentSlot] = useState(null); // Stores the current appointment slot
  const [isPaymentDone, setIsPaymentDone] = useState(false); // Tracks whether payment is completed
  const [loading, setLoading] = useState(true); // Indicates loading state during data fetching
  const navigate = useNavigate(); // Hook for programmatically navigating to other pages

  // Fetch appointment details on component mount
  useEffect(() => {
    setLoading(true); // Start loading
    fetch("/doctorsdetails.json") // Fetch doctor and hospital/clinic details
      .then((response) => response.json())
      .then((data) => {
        let selectedDoctor = null; // Variable to store the selected doctor details
        let appointmentData = null; // Variable to store the appointment details
        
        // Check if the given ID matches a hospital
        const hospital = data.hospitals[id];
        if (hospital) {
          // Find doctor in the hospital's doctor list
          selectedDoctor = hospital.doctors.find(doctor => doctor.name === doctorname);
          appointmentData = { name: hospital.name, doctor: selectedDoctor };
        } else {
          // Check if the given ID matches a clinic
          const clinic = data.clinics[id];
          if (clinic) {
            if (Array.isArray(clinic.doctors)) {
              // If doctors is an array, find the matching doctor
              selectedDoctor = clinic.doctors.find(doctor => doctor.name === doctorname);
            } else {
              // If doctors is not an array, use the single doctor object
              selectedDoctor = clinic.doctor;
            }

            // Prepare appointment details for the clinic
            if (selectedDoctor) {
              appointmentData = { name: clinic.name, doctor: selectedDoctor };
            } else {
              console.error("Doctor not found in clinic data");
            }
          } else {
            console.error("Clinic not found");
          }
        }

        // If doctor details are found, set the appointment details
        if (appointmentData && selectedDoctor) {
          setAppointmentDetails(appointmentData);

          // Get the current appointment slot for the doctor from localStorage and increment it
          const currentSlot = localStorage.getItem(`${doctorname}-appointments`) || 0;
          setAppointmentSlot(Number(currentSlot) + 1);
        } else {
          console.error("Appointment data is missing or invalid");
        }

        setLoading(false); // Stop loading
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setLoading(false); // Stop loading on error
      });
  }, [id, doctorname]);

  // Handles payment confirmation
  const handlePayment = () => {
    setIsPaymentDone(true); // Mark payment as done

    // Save the updated appointment slot to localStorage
    localStorage.setItem(`${doctorname}-appointments`, appointmentSlot);

    // Retrieve existing appointments or initialize an empty list
    const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];

    // Prepare the new appointment data
    const savedAppointment = {
      name: appointmentDetails.name,
      doctor: appointmentDetails.doctor.name,
      specialty: appointmentDetails.doctor.specialty,
      charges: appointmentDetails.doctor.charges,
      timings: appointmentDetails.doctor.timings,
      slot: appointmentSlot,
    };

    // Save the new appointment data to localStorage
    existingAppointments.push(savedAppointment);
    localStorage.setItem('appointment-info', JSON.stringify(savedAppointment)); // Save the latest appointment info
    localStorage.setItem('appointments', JSON.stringify(existingAppointments)); // Update the appointments list

    // Navigate to the confirmation page after a short delay
    setTimeout(() => {
      navigate(`/appointment/confirmation`);
    }, 1300);
  };

  return (
    <div className="h-screen flex justify-center items-center text-white p-6">
      {loading ? (
        // Show a loading spinner while fetching data
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      ) : appointmentDetails ? (
        // Display appointment details and payment button
        <div className="h-[450px] w-[500px] bg-custombg rounded-xl flex flex-col justify-center items-center p-6">
          <h2 className="text-2xl font-semibold">Payment for {appointmentDetails.name}</h2>
          <div className="mt-4 text-xl space-y-2">
            <h3>Doctor: {appointmentDetails.doctor.name}</h3>
            <p>Specialty: {appointmentDetails.doctor.specialty}</p>
            <p>Charges: ${appointmentDetails.doctor.charges}</p>
            <p>Timing: {appointmentDetails.doctor.timings}</p>
            <p>Appointment Slot: {appointmentSlot}</p>
          </div>

          {/* Display Confirm Payment button if payment is not done */}
          {!isPaymentDone ? (
            <button 
              onClick={handlePayment} 
              className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-all duration-300"
            >
              Confirm Payment
            </button>
          ) : (
            // Display success message if payment is completed
            <p className="mt-6 bg-green-100 text-green-800 px-6 py-2 rounded-lg">
              Payment Successful!
            </p>
          )}
        </div>
      ) : (
        // Display error if appointment details are not found
        <p>Error loading appointment details.</p>
      )}
    </div>
  );
};

export default Payment;
