import { Axios } from '../../axiosInstance';

export const getProfile = async () => {
  // if (!document.cookie.includes('accessToken')) {
  //   return {
  //     success: false,
  //     message: 'User not authenticated',
  //     user: null,
  //   };
  // }
  // Fetch the current user's profile
  const response = await Axios.get('/users/current', { withCredentials: true });
  return response.data;
};

export const registerUser = async (data: any) => {
  const response = await Axios.post('/users/signup', data);
  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await Axios.post('/users/login', data, {
    headers: {
      'Content-Type': 'application/json',
    },
    // withCredentials: true, // Uncomment if you need credentials
  });
  return response.data;
};

export const signupUser = async ({
  email,
  password,
  name,
  phone,
}: {
  email: string;
  password: string;
  name: string;
  phone?: string;
}) => {
  const response = await Axios.post('/users/signup', {
    email,
    password,
    name,
    phone,
  });
  return response.data;
};

export const updateProfile = async (data: {
  name?: string;
  phone?: string;
}) => {
  const response = await Axios.put('/users/update-profile', data);
  return response.data;
};

export const logoutUser = async () => {
  await Axios.post('/users/logout');
};
