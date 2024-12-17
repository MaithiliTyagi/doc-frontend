import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const HospitalDetails = () => {
  const { id } = useParams(); // Extract hospital or clinic ID from route parameters
  const [hospitalData, setHospitalData] = useState(null); // State for hospital data
  const [clinicData, setClinicData] = useState(null); // State for clinic data

  useEffect(() => {
    // Fetch doctor details from the JSON file
    fetch("/doctorsdetails.json")
      .then((response) => response.json())
      .then((data) => {
        // Check if the given ID belongs to a hospital or clinic
        if (data.hospitals[id]) {
          setHospitalData(data.hospitals[id]); // Set hospital data
        } else if (data.clinics[id]) {
          setClinicData(data.clinics[id]); // Set clinic data
        }
      });
  }, [id]); // Re-run effect when the ID changes

  if (!hospitalData && !clinicData) {
    // Show a loading animation while fetching data
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  // Card component for displaying doctor details
  const DoctorCard = ({ doctor, to }) => (
    <Link
      to={to} // Link to the payment page with doctor details
      className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] p-4 flex flex-col bg-custombg rounded-lg shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="space-y-2">
        {/* Display doctor name */}
        <h3 className="font-bold text-xl md:text-2xl truncate">{doctor.name}</h3>
        {/* Display specialty */}
        <p className="text-sm md:text-base">
          <span className="font-semibold">Specialty:</span> {doctor.specialty}
        </p>
        {/* Display charges */}
        <p className="text-sm md:text-base">
          <span className="font-semibold">Charges:</span> ${doctor.charges}
        </p>
        {/* Display timings */}
        <p className="text-sm md:text-base">
          <span className="font-semibold">Timings:</span> {doctor.timings}
        </p>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen text-white p-4 md:p-6">
      {hospitalData ? (
        // Display hospital details if data exists
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
            {hospitalData.name} {/* Hospital name */}
          </h2>
          <h3 className="text-xl md:text-2xl text-center font-semibold mt-6 mb-8">
            Doctors List
          </h3>
          {/* Map through the list of doctors */}
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
            {hospitalData.doctors.map((doctor, index) => (
              <DoctorCard
                key={index}
                doctor={doctor}
                to={`/payment/hospital/${id}/${doctor.name}`}
              />
            ))}
          </div>
        </div>
      ) : (
        // Display clinic details if hospital data is not present
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
            {clinicData.name} {/* Clinic name */}
          </h2>
          <h3 className="text-lg md:text-xl font-semibold mb-4">Doctor</h3>
          <div className="max-w-md">
            {/* Render single doctor card for the clinic */}
            <DoctorCard
              doctor={clinicData.doctor}
              to={`/payment/clinic/${id}/${clinicData.doctor.name}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalDetails;
