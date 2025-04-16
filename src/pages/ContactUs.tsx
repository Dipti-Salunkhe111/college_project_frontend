import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      setTimeout(() => {
        setIsSubmitting(false);
        setFormData({ name: "", email: "", message: "" });
        setStatusMessage("Thank you for reaching out! We'll get back to you soon.");
      }, 2000);
    } catch (error) {
      setIsSubmitting(false);
      setStatusMessage("Sorry, something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f0]">
      <Header />
      <main className="flex-grow py-16 px-6">
        <div className="container mx-auto max-w-screen-xl">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl font-medium text-[#333] mb-4">
              Contact Us
            </h1>
            <p className="text-base md:text-lg text-[#555] leading-relaxed max-w-2xl mx-auto">
              We would love to hear from you! Feel free to reach out with any questions or feedback.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.section
            className="bg-[#f8f8f5] p-8 border border-[#eaeae5] shadow-md max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl font-medium text-[#333] mb-4">We'd Love to Hear From You</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#333] mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-[#eaeae5] rounded-none bg-[#f0f0e8] focus:outline-none focus:ring-2 focus:ring-[#90a870]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#333] mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-[#eaeae5] rounded-none bg-[#f0f0e8] focus:outline-none focus:ring-2 focus:ring-[#90a870]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#333] mb-2" htmlFor="message">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full p-3 border border-[#eaeae5] rounded-none bg-[#f0f0e8] focus:outline-none focus:ring-2 focus:ring-[#90a870]"
                />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full p-3 bg-[#90a870] text-white rounded-none font-medium hover:bg-[#7d9460] transition-colors duration-300 ${isSubmitting ? "opacity-50" : ""}`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
              {statusMessage && (
                <div className={`text-center ${statusMessage.includes("Thank you") ? "text-[#90a870]" : "text-red-600"}`}>
                  {statusMessage}
                </div>
              )}
            </form>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;