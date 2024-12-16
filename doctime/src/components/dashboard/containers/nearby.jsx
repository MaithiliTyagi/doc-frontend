import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Reusable Card Component
const Card = ({ item, type }) => (
  <Link
    to={`/${type.toLowerCase()}/${item.id}`}
    className="relative flex h-40 bg-custombg rounded-lg w-full sm:w-[48%] lg:w-[48%]"
  >
    <div className="w-1/3 bg-gray-300 rounded-lg">
      <img
        src={item.image}
        alt={item.name || `${type} image`}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
    <div className="w-2/3 pt-8 pl-4 text-white relative">
      <h3 className="font-bold text-xl">{item.name}</h3>
      <p className="text-lg">{item.address}</p>
      <p className="text-lg">Ph. No.: {item.phone}</p>
      <div className="absolute bottom-2 right-2 text-lg text-white">
        {item.rating} ★
      </div>
    </div>
  </Link>
);

const HospitalClinicList = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/hospitals.json");
        if (!response.ok) {
          throw new Error("Failed to fetch hospital data");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Unable to load data at this time. Please try again later.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-center text-red-500 text-lg">{error}</div>;
  }

  if (data.length === 0) {
    return <div className="text-center text-white text-lg">Loading nearby locations...</div>;
  }

  return (
    <div className="p-6">
      {/* Hospitals Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">Hospitals Nearby</h2>
        <div className="flex flex-wrap gap-4">
          {data
            .filter((item) => item.type === "Hospital")
            .map((hospital) => (
              <Card key={hospital.id} item={hospital} type="Hospital" />
            ))}
        </div>
      </div>

      {/* Clinics Section */}
      <div className="mb-6">
        <h2 className="text-2xl text-white font-bold mb-4">Clinics Nearby</h2>
        <div className="flex flex-wrap gap-4">
          {data
            .filter((item) => item.type === "Clinic")
            .map((clinic) => (
              <Card key={clinic.id} item={clinic} type="Clinic" />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalClinicList;
