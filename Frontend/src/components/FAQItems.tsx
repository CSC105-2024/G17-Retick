import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='border-b border-gray-200 pb-4'>
      <button
        className='flex justify-between items-center w-full text-left py-3 focus:outline-none'
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className='font-medium text-gray-900'>{question}</h3>
        {isOpen ? (
          <ChevronUp className='h-5 w-5 text-gray-500' />
        ) : (
          <ChevronDown className='h-5 w-5 text-gray-500' />
        )}
      </button>

      {isOpen && (
        <div className='mt-2 text-gray-600'>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;
