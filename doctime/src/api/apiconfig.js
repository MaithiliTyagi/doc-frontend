  // Importing the Axios library for making HTTP requests
import axios from 'axios';

// Base URL for the API, typically points to the backend server
const BASE_URL = 'http://localhost:8001/api';

// Creating an Axios instance with pre-configured settings
export const api = axios.create({
  baseURL: BASE_URL, // Setting the base URL for all requests made using this instance
  headers: { 'Content-Type': 'application/json' }, // Default headers for requests, specifying JSON format
});
