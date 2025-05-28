import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import popToast from '@/lib/popToast';
import { ToastContainer } from 'react-toastify';
import { loginUser, signupUser } from '@/api/user';
import { useSignup } from '../hooks/use-users';
import { useQueryClient } from '@tanstack/react-query';

const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const defaultTab = location.pathname === '/signup' ? 'signup' : 'login';
  const {
    mutateAsync: signup,
    isLoading: isSignupLoading,
    error,
  } = useSignup();

  if (isLoading || isSignupLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;
  // if (!user) return <div>No user data</div>;

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };
  const validatePhone = (phoneNumber) => {
    return phoneNumber.toString().length === 10;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      popToast('Invalid email address', 'warning');
      return;
    }

    if (!validatePassword(password)) {
      popToast('Password must be at least 8 characters', 'warning');
      return;
    }

    setIsLoading(true);

    try {
      await loginUser({ email, password });
      // Invalidate profile query so it refetches with new cookie
      queryClient.invalidateQueries(['profile']);
      popToast('Logged in successfully', 'success');
      navigate('/profile');
    } catch (error) {
      popToast('Login failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      popToast('Please enter your name', 'warning');
      return;
    }

    if (!validateEmail(email)) {
      popToast('Invalid email address', 'warning');
      return;
    }

    if (!validatePassword(password)) {
      popToast('Password must be at least 8 characters', 'warning');
      return;
    }

    if (!validatePhone(phoneNumber)) {
      popToast('Invalid Phone Number', 'warning');
      return;
    }

    setIsLoading(true);

    try {
      await signup({
        email,
        password,
        name,
        phone: phoneNumber,
      });
      popToast('Account created successfully', 'success');
      navigate('/login');
    } catch (error: any) {
      popToast(
        error?.response?.data?.msg || 'Signup failed. Please try again.',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />

      <main className='flex-grow flex items-center justify-center py-12 bg-gray-50 dark:bg-gray-900'>
        <div className='w-full max-w-md px-4'>
          <Card className='border-0 shadow-lg'>
            <Tabs defaultValue={defaultTab} className='w-full'>
              <TabsList className='grid w-full grid-cols-2 mb-4'>
                <TabsTrigger value='login'>Login</TabsTrigger>
                <TabsTrigger value='signup'>Sign up</TabsTrigger>
              </TabsList>

              {/* LOGIN  */}
              <TabsContent value='login'>
                <CardHeader>
                  <CardTitle className='text-center text-2xl font-bold text-gray-900 dark:text-white'>
                    Welcome back
                  </CardTitle>
                  <CardDescription className='text-center text-gray-600 dark:text-gray-300'>
                    Enter your details to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className='space-y-4'>
                    <div className='space-y-2'>
                      <Label
                        htmlFor='email'
                        className='text-gray-700 dark:text-gray-200'
                      >
                        Email
                      </Label>
                      <Input
                        id='email'
                        type='email'
                        placeholder='you@example.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                      />
                    </div>

                    <div className='space-y-2'>
                      <div className='flex items-center justify-between'>
                        <Label
                          htmlFor='password'
                          className='text-gray-700 dark:text-gray-200'
                        >
                          Password
                        </Label>
                      </div>
                      <Input
                        id='password'
                        type='password'
                        placeholder='••••••••'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                      />
                    </div>

                    <Button
                      type='submit'
                      className='w-full bg-purple-600 hover:bg-purple-700 text-white'
                      disabled={isLoading}
                    >
                      {isLoading ? 'Logging in...' : 'Log in'}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>

              {/* SIGNUP */}
              <TabsContent value='signup'>
                <CardHeader>
                  <CardTitle className='text-center text-2xl font-bold text-gray-900 dark:text-white'>
                    Create an account
                  </CardTitle>
                  <CardDescription className='text-center text-gray-600 dark:text-gray-300'>
                    Enter your details to get started
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className='space-y-4'>
                    <div className='space-y-2'>
                      <Label
                        htmlFor='signup-name'
                        className='text-gray-700 dark:text-gray-200'
                      >
                        Name
                      </Label>
                      <Input
                        id='signup-name'
                        placeholder='Your Name'
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label
                        htmlFor='signup-phone'
                        className='text-gray-700 dark:text-gray-200'
                      >
                        Phone Number
                      </Label>
                      <Input
                        id='signup-phone'
                        type='text'
                        placeholder='000-000-0000'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        className='bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label
                        htmlFor='signup-email'
                        className='text-gray-700 dark:text-gray-200'
                      >
                        Email
                      </Label>
                      <Input
                        id='signup-email'
                        type='email'
                        placeholder='you@example.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label
                        htmlFor='signup-password'
                        className='text-gray-700 dark:text-gray-200'
                      >
                        Password
                      </Label>
                      <Input
                        id='signup-password'
                        type='password'
                        placeholder='••••••••'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                      />
                    </div>

                    <Button
                      type='submit'
                      className='w-full bg-purple-600 hover:bg-purple-700 text-white'
                      disabled={isLoading}
                    >
                      {isLoading ? 'Creating account...' : 'Sign up'}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className='flex flex-col gap-4 border-t pt-4'>
                  <div className='relative w-full'>
                    <div className='absolute inset-0 flex items-center'>
                      <span className='w-full border-t' />
                    </div>
                  </div>
                </CardFooter>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Login;
