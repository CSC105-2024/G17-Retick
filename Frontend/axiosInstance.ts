import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:3000', // Adjust if your backend runs elsewhere
  withCredentials: true,
});

// Axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       try {
//         await Axios.post('/users/refresh-token');
//         return Axios(originalRequest);
//       } catch (refreshError) {
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export { Axios };
