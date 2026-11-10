const defaultApiUrl =
  process.env.NODE_ENV === "production"
    ? "https://clinic-management-backend-lpki.onrender.com"
    : "http://localhost:5000";

export const API_URL: string =
  process.env.REACT_APP_API_URL || defaultApiUrl;

