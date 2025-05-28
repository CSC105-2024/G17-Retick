import Hero from "@/components/Hero";
import FeaturedEvents from "@/components/FeaturedTickets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  CreditCard,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

// TestimonialCard component (can be moved to separate file if preferred)
const TestimonialCard = ({ name, role, rating, content, avatar }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4 flex items-center justify-center">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xl font-medium">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>

      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>

      <p className="text-gray-600">"{content}"</p>
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Hero />
        <FeaturedEvents />

        {/* How It Works Section (existing code remains the same) */}

        {/* Testimonials Section
        <section className='py-12 md:py-16 bg-gray-50'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-12'>
              <h2 className='text-2xl md:text-3xl font-bold mb-4'>
                Why Fans Choose ReTick
              </h2>
              <p className='text-gray-600 max-w-2xl mx-auto'>
                Hear from our community of buyers and sellers
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              <TestimonialCard
                name='Sarah J.'
                role='Concert Goer'
                rating={5}
                content='I got last-minute Taylor Swift tickets at face value when everywhere else was charging triple. Lifesaver!'
                avatar=''
              />
              <TestimonialCard
                name='Michael T.'
                role='Sports Fan'
                rating={4}
                content='Sold my extra Lakers tickets quickly to a real fan. The process was so much easier than other sites.'
                avatar=''
              />
              <TestimonialCard
                name='Priya K.'
                role='Theater Lover'
                rating={5}
                content='The seller sent me playbill photos to prove they had real Hamilton tickets. So transparent!'
                avatar=''
              />
            </div>
          </div>
        </section> */}

        {/* CTA Section (existing code remains the same) */}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
