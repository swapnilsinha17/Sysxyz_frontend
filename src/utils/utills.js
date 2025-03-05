

export const apis = {
  baseUrl: import.meta.env.VITE_REACT_APP_BASE_API, // Correct access to Vite environment variable
};

export const AccessToken = sessionStorage.getItem("auth_token");
