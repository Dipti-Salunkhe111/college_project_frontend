import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-blue-50 to-white py-8 px-4 md:py-12">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
              Contact Us
            </h1>
            <p className="text-base md:text-xl text-gray-600 leading-relaxed tracking-wide px-4">
              We would love to hear from you! Feel free to reach out with any questions or feedback.
            </p>
          </div>

          {/* Contact Form */}
          <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">We'd Love to Hear From You</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-lg font-semibold text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-semibold text-gray-700 mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-semibold text-gray-700 mb-2" htmlFor="message">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full p-3 bg-blue-600 text-white rounded-lg font-semibold ${isSubmitting ? "opacity-50" : ""}`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
              {statusMessage && (
                <div className={`text-center ${statusMessage.includes("Thank you") ? "text-green-600" : "text-red-600"}`}>
                  {statusMessage}
                </div>
              )}
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;