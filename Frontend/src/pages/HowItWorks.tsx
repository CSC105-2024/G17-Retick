import { Check, Shield, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: "Create a Verified Account",
      description:
        "Sign up with your email or phone for a secure, authenticated account that builds trust in our community.",
    },
    {
      icon: <Check className="h-12 w-12 text-primary" />,
      title: "List or Find Tickets",
      description:
        "Easily list tickets you need to sell or browse available tickets for events you want to attend.",
    },
    {
      icon: <MessageCircle className="h-12 w-12 text-primary" />,
      title: "Connect Securely",
      description:
        "Communicate directly with buyers or sellers through our platform's messaging system.",
    },
  ];

  const benefits = [
    {
      title: "Safe & Secure",
      description:
        "User verification ensures you're dealing with real people, not scammers.",
    },
    {
      title: "Easy to Use",
      description:
        "Simple interface for listing and finding tickets to your favorite events.",
    },
    {
      title: "Direct Contact",
      description: "Connect directly with buyers or sellers without middlemen.",
    },
    {
      title: "No Hidden Fees",
      description: "Transparent platform with no surprise charges.",
    },
  ];

  const problemSolutions = [
    {
      problem: "Missing out on official ticket sales",
      solution: "Find tickets from verified resellers on our platform",
    },
    {
      problem: "Need to sell tickets due to conflicts",
      solution: "Quickly list your tickets and connect with interested buyers",
    },
    {
      problem: "Unsafe in-person meetings with strangers",
      solution: "Verified user accounts and secure messaging create trust",
    },
    {
      problem: "Disorganized resale systems",
      solution: "Structured listings make finding the right tickets easy",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#1a1f2c] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            How ReTick Works
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            A secure platform connecting ticket buyers and sellers through
            verified accounts and direct communication.
          </p>
        </div>
      </section>

      {/* Step Process */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Three Simple Steps
        </h2>

        <div className="relative">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="bg-white rounded-full p-4 shadow-lg mb-4 relative">
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Problems We Solve
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {problemSolutions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-red-100 rounded-full p-2 mr-3">
                      <svg
                        className="w-5 h-5 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium">{item.problem}</h3>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700">{item.solution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose ReTick
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="pt-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4 mx-auto">
                    <span className="text-purple-600 text-xl font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {benefit.description}
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-700 to-purple-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join our community of verified users and start buying or selling
            tickets safely and easily.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#"
              className="px-8 py-3 bg-white text-purple-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Sign Up Now
            </a>
            <a
              href="#"
              className="px-8 py-3 bg-transparent border-2 border-white rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Browse Events
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HowItWorks;
