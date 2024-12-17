import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hospitals = () => {
  const [data, setData] = useState([]); // State to store fetched hospital data
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/hospitals.json"); // Fetch hospital data from a JSON file
        if (!response.ok) {
          throw new Error("Failed to fetch hospital data"); // Handle non-OK response
        }
        const jsonData = await response.json(); // Parse JSON data
        setData(jsonData); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error); // Log error to console
      } finally {
        setIsLoading(false); // Set loading to false after fetch completes
      }
    };
    fetchData(); // Trigger data fetch on component mount
  }, []); // Run effect only once when the component mounts

  if (isLoading) {
    // Render a loading message while data is being fetched
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="animate-pulse text-xl">Loading hospitals...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen text-white p-4 md:p-6'>
      {/* Page Title */}
      <h1 className='text-3xl md:text-4xl lg:text-5xl text-center font-semibold mb-6 md:mb-8'>
        Hospitals
      </h1>

      {/* Container for hospital cards */}
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Filter and map only "Hospital" type items */}
          {data
            .filter((item) => item.type === "Hospital")
            .map((hospital, index) => (
              <Link
                to={`/hospital/${hospital.id}`} // Dynamic link to hospital details
                key={index} // Unique key for each hospital
                className="group flex flex-col sm:flex-row bg-custombg rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                {/* Image Container */}
                <div className="w-full sm:w-1/3 h-48 sm:h-auto bg-gray-300">
                  <img
                    src={hospital.image} // Hospital image
                    alt={hospital.name} // Alt text for image
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content Container */}
                <div className="w-full sm:w-2/3 p-4 sm:pt-4 flex flex-col justify-between relative">
                  <div>
                    <h2 className="font-bold text-lg md:text-xl mb-2">
                      {hospital.name} {/* Hospital name */}
                    </h2>
                    <p className="text-sm md:text-base mb-1">
                      {hospital.address} {/* Hospital address */}
                    </p>
                    <p className="text-sm md:text-base">
                      Ph. No.: {hospital.phone} {/* Contact number */}
                    </p>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 sm:bottom-4 sm:top-auto bg-black/30 px-3 py-1 rounded-full text-sm md:text-base">
                    {hospital.rating} ★ {/* Hospital rating */}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Hospitals;
