import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Clinics = () => {
  // State to store fetched clinic data
  const [data, setData] = useState([]);
  // State to handle loading status
  const [isLoading, setIsLoading] = useState(true);
  // Fetch clinic data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch clinic data from the JSON file
        const response = await fetch("/hospitals.json");
        if (!response.ok) {
          throw new Error("Failed to fetch clinic data");
        }
        const jsonData = await response.json();
        setData(jsonData); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error); // Log errors to the console
      } finally {
        setIsLoading(false); // Set loading status to false after data is fetched
      }
    };
    fetchData(); // Trigger the data fetch function
  }, []);
  // Show a loading message while fetching data
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="animate-pulse text-xl">Loading clinics...</div>
      </div>
    );
  }
  return (
    <div className='min-h-screen text-white p-4 md:p-6 overflow-auto'>
      {/* Page Title */}
      <h1 className='text-3xl md:text-4xl lg:text-5xl text-center font-semibold mb-6 md:mb-8'>
        Clinics
      </h1>
      {/* Clinic Listing Container */}
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Filter and map through clinic data to display clinics */}
          {data
            .filter((item) => item.type === "Clinic") // Filter out only clinic-type data
            .map((clinic, index) => (
              <Link
                to={`/hospital/${clinic.id}`} // Navigate to a specific clinic's page
                key={index} // Unique key for each clinic
                className="group flex flex-col sm:flex-row bg-custombg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Clinic Image */}
                <div className="w-full sm:w-1/3 h-48 sm:h-auto bg-gray-300">
                  <img
                    src={clinic.image} // Clinic image source
                    alt={clinic.name} // Alt text for the clinic image
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback to a placeholder image if the original fails to load
                      e.target.src = '/placeholder-clinic.jpg';
                      e.target.alt = 'Clinic placeholder';
                    }}
                  />
                </div>
                {/* Clinic Content Container */}
                <div className="w-full sm:w-2/3 p-4 flex flex-col justify-between relative">
                  <div>
                    {/* Clinic Name */}
                    <h2 className="font-bold text-lg md:text-xl mb-2 group-hover:text-gray-200 transition-colors">
                      {clinic.name}
                    </h2>
                    {/* Clinic Address */}
                    <p className="text-sm md:text-base mb-2 text-gray-100">
                      {clinic.address}
                    </p>
                    {/* Clinic Phone Number */}
                    <p className="text-sm md:text-base text-gray-100">
                      Ph. No.: {clinic.phone}
                    </p>
                  </div>
                  {/* Clinic Rating */}
                  <div className="absolute top-4 right-4 sm:bottom-4 sm:top-auto bg-black/30 px-3 py-1 rounded-full text-sm md:text-base flex items-center gap-1">
                    <span>{clinic.rating}</span>
                    <span className="text-white">★</span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Clinics;
