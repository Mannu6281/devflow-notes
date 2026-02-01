import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    console.log(import.meta.env.VITE_API_URL);
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response)=> response,
    (error)=>{
        if(error.response && error.response.status ===401){
            localStorage.removeItem("token");
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);
export default api;
