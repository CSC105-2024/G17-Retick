import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, LogIn, Menu, X, Search, Ticket } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/api/user';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });
  const user = profile?.user;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className='sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b'>
      <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
        <Link to='/' className='flex items-center gap-2'>
          <div className='h-8 w-8 rounded-md ticket-gradient flex items-center justify-center'>
            <Ticket className='text-white h-5 w-5' />
          </div>
          <span className='text-xl font-bold text-gray-900'>ReTick</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-1'>
          <Link
            to='/tickets'
            className='px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors'
          >
            Browse Tickets
          </Link>
          <Link
            to='/how-it-works'
            className='px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors'
          >
            How It Works
          </Link>
          <Link
            to='/sell'
            className='px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors'
          >
            Sell Tickets
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className='hidden md:flex items-center gap-3'>
          <Link to='/tickets'>
            <Button variant='outline' size='icon'>
              <Search className='h-5 w-5' />
            </Button>
          </Link>

          {user ? (
            <Link to='/profile'>
              <Button variant='outline' className='rounded-full'>
                <User />
              </Button>
            </Link>
          ) : (
            <>
              <Link to='/login'>
                <Button variant='outline'>
                  <LogIn className='h-4 w-4 mr-2' />
                  Log in
                </Button>
              </Link>
              <Link to='/signup'>
                <Button className='bg-purple-600 hover:bg-purple-700'>
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className='md:hidden' onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className='h-6 w-6 text-gray-700' />
          ) : (
            <Menu className='h-6 w-6 text-gray-700' />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-white border-b shadow-md'>
          <nav className='container mx-auto px-4 py-3 flex flex-col'>
            <Link
              to='/tickets'
              className='px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-md'
              onClick={toggleMenu}
            >
              Browse Tickets
            </Link>
            <Link
              to='/how-it-works'
              className='px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-md'
              onClick={toggleMenu}
            >
              How It Works
            </Link>
            <Link
              to='/sell'
              className='px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-md'
              onClick={toggleMenu}
            >
              Sell Tickets
            </Link>
            <hr className='my-2' />
            <Link
              to='/events'
              className='px-3 py-3 flex items-center text-gray-700 hover:bg-gray-50 rounded-md'
              onClick={toggleMenu}
            >
              <Search className='h-4 w-4 mr-2' />
              Search
            </Link>
            <Link
              to='/login'
              className='px-3 py-3 flex items-center text-gray-700 hover:bg-gray-50 rounded-md'
              onClick={toggleMenu}
            >
              <LogIn className='h-4 w-4 mr-2' />
              Log in
            </Link>
            <Link to='/signup' className='mt-2'>
              <Button
                className='w-full bg-purple-600 hover:bg-purple-700'
                onClick={toggleMenu}
              >
                Sign up
              </Button>
            </Link>
            <Link
              to='/profile'
              className='px-3 py-3 flex items-center text-gray-700 hover:bg-gray-50 rounded-md'
            >
              <User /> My Profile
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
