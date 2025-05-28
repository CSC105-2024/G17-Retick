import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';

const Footer = () => {
  return (
    <footer className='bg-ticket-dark text-white'>
      <div className='container mx-auto px-20 py-12'>
        <div className='flex flex-col md:flex-row justify-between gap-8'>
          <div>
            <Link to='/' className='flex items-center gap-2 mb-4'>
              <div className='h-8 w-8 rounded-md ticket-gradient flex items-center justify-center'>
                <Ticket className='text-white h-5 w-5' />
              </div>
              <span className='text-xl font-bold text-white'>ReTick</span>
            </Link>
            <p className='text-gray-400 mb-4'>
              The safest way to buy and sell tickets for concerts, festivals,
              and more.
            </p>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  to='/tickets'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Browse Events
                </Link>
              </li>
              <li>
                <Link
                  to='/how-it-works'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  to='/sell'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Sell Tickets
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className='my-8 border-gray-800' />

        <div className='flex flex-col md:flex-row justify-between items-center'>
          <p className='text-gray-400 text-sm'>
            &copy; {new Date().getFullYear()} ReTick. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
