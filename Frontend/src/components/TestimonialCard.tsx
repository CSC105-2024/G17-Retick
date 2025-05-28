import { Star } from 'lucide-react';

const TestimonialCard = ({ name, role, rating, content, avatar }) => {
  return (
    <div className='bg-white p-6 rounded-xl shadow-sm border'>
      <div className='flex items-center mb-4'>
        <div className='w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4'>
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className='w-full h-full object-cover'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center text-gray-500'>
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className='font-medium'>{name}</h4>
          <p className='text-sm text-gray-500'>{role}</p>
        </div>
      </div>

      <div className='flex mb-3'>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>

      <p className='text-gray-600'>"{content}"</p>
    </div>
  );
};

export default TestimonialCard;
