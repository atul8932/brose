import axios from "axios";

// Create an instance of axios with default options
const api = axios.create({
  baseURL: "http://192.168.1.6:5000", // Use environment variable if available, e.g., process.env.API_BASE_URL
  timeout: 5000, // Timeout after 5 seconds, adjust as needed
});

// Function to set the Authorization token (if needed)
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Function to fetch stocks
export const fetchStocks = async () => {
  try {
    const response = await api.get("/api/stocks"); // Ensure this matches your backend route
    return response.data;
  } catch (error) {
    console.error("Error fetching stocks:", error.message);
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Response error data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);

      // Customize error message based on status
      if (error.response.status === 404) {
        alert("Stocks data not found.");
      } else if (error.response.status === 500) {
        alert("Internal server error. Please try again later.");
      } else {
        alert("An error occurred. Please try again.");
      }
    } else if (error.request) {
      // No response received from the server
      console.error("No response received:", error.request);
      alert("No response from server. Please check your network connection.");
    } else {
      // Error setting up the request
      console.error("Error setting up request:", error.message);
      alert("Error setting up request. Please try again.");
    }
    throw error; // Re-throw the error for handling in calling function
  }
};

// You can add more API functions here as needed
export const fetchStockById = async (stockId) => {
  try {
    const response = await api.get(`/api/stocks/${stockId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stock by ID:", error.message);
    throw error;
  }
};

export const createStock = async (stockData) => {
  try {
    const response = await api.post("/api/stocks", stockData);
    return response.data;
  } catch (error) {
    console.error("Error creating stock:", error.message);
    throw error;
  }
};

export default api;
