import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutUsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-800">
          About Us
        </h1>
        <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700">
            At [Your Company Name], we strive to revolutionize the way organizations approach hiring. We leverage artificial intelligence to streamline the recruitment process, making it more efficient, unbiased, and accessible. Our platform provides innovative tools for talent evaluation, fostering better hiring decisions and enhancing the candidate experience.
          </p>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Our Values</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li className="text-lg">
              <strong>Innovation:</strong> We are committed to continuously improving our technology to stay at the forefront of AI-driven recruitment.
            </li>
            <li className="text-lg">
              <strong>Integrity:</strong> We believe in creating fair, unbiased systems that prioritize merit over bias.
            </li>
            <li className="text-lg">
              <strong>Collaboration:</strong> Our team works together to create solutions that empower both employers and job seekers.
            </li>
            <li className="text-lg">
              <strong>Customer Success:</strong> We aim to provide our clients with the best experience, ensuring that their hiring needs are met effectively.
            </li>
          </ul>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">Sam Altman</h3>
              <p className="text-gray-600">CEO & Founder</p>
              <p className="text-gray-700 mt-2">
                Sam brings over 1.5 years of software development experience and a passion for creating innovative AI solutions. As the CEO, he leads the vision and direction of the company.
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
              <p className="text-gray-600">Frontend Developer</p>
              <p className="text-gray-700 mt-2">
                John is responsible for building the user-facing parts of our platform. His expertise in frontend development ensures our product is user-friendly and visually appealing.
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">Jane Smith</h3>
              <p className="text-gray-600">Backend Developer</p>
              <p className="text-gray-700 mt-2">
                Jane works on the backend infrastructure, ensuring our platform operates smoothly and can handle high levels of traffic and data securely.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
